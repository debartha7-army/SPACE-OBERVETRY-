import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { initialData } from './initialData.js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

// Check if valid remote Supabase credentials are provided
const isRealSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('sample-project') &&
  !supabaseUrl.includes('your-project') &&
  !supabaseKey.includes('placeholder')
);

let supabaseClient;

if (isRealSupabaseConfigured) {
  console.log('⚡ [Supabase] Connected to live Supabase project:', supabaseUrl);
  supabaseClient = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
  });
} else {
  console.log('🌌 [Cosmos Tracker] Using internal Supabase query engine with pre-seeded astronomical catalog.');

  // Deep clone initial seed data into in-memory store
  const store = {
    users: JSON.parse(JSON.stringify(initialData.users)),
    celestial_events: JSON.parse(JSON.stringify(initialData.celestial_events)),
    stars_constellations: JSON.parse(JSON.stringify(initialData.stars_constellations)),
    planets_solar_system: JSON.parse(JSON.stringify(initialData.planets_solar_system)),
    galaxies: JSON.parse(JSON.stringify(initialData.galaxies)),
    novae_variables: JSON.parse(JSON.stringify(initialData.novae_variables)),
    black_holes: JSON.parse(JSON.stringify(initialData.black_holes)),
    theories: JSON.parse(JSON.stringify(initialData.theories)),
    articles: JSON.parse(JSON.stringify(initialData.articles)),
    favorites: JSON.parse(JSON.stringify(initialData.favorites)),
    event_reminders: JSON.parse(JSON.stringify(initialData.event_reminders))
  };

  class MemoryQueryBuilder {
    constructor(tableName) {
      this.tableName = tableName;
      if (!store[tableName]) {
        store[tableName] = [];
      }
      this.data = store[tableName];
      this.action = 'select'; // 'select' | 'insert' | 'update' | 'delete'
      this.insertPayload = null;
      this.updatePayload = null;
      this.filters = [];
      this.sortCol = null;
      this.ascending = true;
      this.limitCount = null;
      this.offsetCount = 0;
      this.isSingle = false;
    }

    select(columns = '*') {
      this.columns = columns;
      return this;
    }

    insert(payload) {
      this.action = 'insert';
      this.insertPayload = payload;
      return this;
    }

    update(payload) {
      this.action = 'update';
      this.updatePayload = payload;
      return this;
    }

    delete() {
      this.action = 'delete';
      return this;
    }

    eq(column, value) {
      this.filters.push(item => String(item[column]) === String(value));
      return this;
    }

    neq(column, value) {
      this.filters.push(item => String(item[column]) !== String(value));
      return this;
    }

    ilike(column, pattern) {
      const regexStr = pattern.replace(/%/g, '.*');
      const regex = new RegExp(regexStr, 'i');
      this.filters.push(item => item[column] && regex.test(String(item[column])));
      return this;
    }

    order(column, { ascending = true } = {}) {
      this.sortCol = column;
      this.ascending = ascending;
      return this;
    }

    range(from, to) {
      this.offsetCount = from;
      this.limitCount = to - from + 1;
      return this;
    }

    limit(count) {
      this.limitCount = count;
      return this;
    }

    single() {
      this.isSingle = true;
      return this;
    }

    async then(resolve, reject) {
      try {
        const result = await this.execute();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    }

    async execute() {
      try {
        let tableList = store[this.tableName];

        if (this.action === 'insert') {
          const itemsToInsert = Array.isArray(this.insertPayload) ? this.insertPayload : [this.insertPayload];
          const createdItems = itemsToInsert.map(item => {
            const newItem = {
              id: item.id || `${this.tableName.slice(0, 3)}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              created_at: new Date().toISOString(),
              ...item
            };
            tableList.push(newItem);
            return newItem;
          });

          const resData = this.isSingle ? createdItems[0] : (Array.isArray(this.insertPayload) ? createdItems : createdItems[0]);
          return { data: resData, error: null };
        }

        if (this.action === 'update') {
          const matched = tableList.filter(item => this.filters.every(f => f(item)));
          matched.forEach(item => {
            Object.assign(item, this.updatePayload, { updated_at: new Date().toISOString() });
          });
          const resData = this.isSingle ? matched[0] || null : matched;
          return { data: resData, error: null };
        }

        if (this.action === 'delete') {
          const toKeep = tableList.filter(item => !this.filters.every(f => f(item)));
          const deleted = tableList.filter(item => this.filters.every(f => f(item)));
          store[this.tableName] = toKeep;
          const resData = this.isSingle ? deleted[0] || null : deleted;
          return { data: resData, error: null };
        }

        // Action is 'select'
        let result = tableList.filter(item => this.filters.every(f => f(item)));
        const totalMatching = result.length;

        if (this.sortCol) {
          result.sort((a, b) => {
            const valA = a[this.sortCol] ?? '';
            const valB = b[this.sortCol] ?? '';
            if (valA < valB) return this.ascending ? -1 : 1;
            if (valA > valB) return this.ascending ? 1 : -1;
            return 0;
          });
        }

        if (this.offsetCount > 0 || this.limitCount !== null) {
          const from = this.offsetCount || 0;
          const to = this.limitCount !== null ? from + this.limitCount : result.length;
          result = result.slice(from, to);
        }

        if (this.isSingle) {
          const singleItem = result.length > 0 ? result[0] : null;
          return { data: singleItem, error: singleItem ? null : { message: 'Row not found', code: 'PGRST116' }, count: totalMatching };
        }

        return { data: result, error: null, count: totalMatching };
      } catch (err) {
        return { data: null, error: { message: err.message } };
      }
    }
  }

  supabaseClient = {
    from: (tableName) => new MemoryQueryBuilder(tableName)
  };
}

export { supabaseClient as supabase };
export default supabaseClient;
