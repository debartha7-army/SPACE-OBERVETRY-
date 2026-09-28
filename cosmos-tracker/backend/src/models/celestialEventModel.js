import supabase from '../config/supabase.js';

export const CelestialEventModel = {
  async findAll({ page = 1, limit = 50 } = {}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    return await supabase.from('celestial_events').select('*').order('event_date', { ascending: true }).range(from, to);
  },

  async findById(id) {
    return await supabase.from('celestial_events').select('*').eq('id', id).single();
  },

  async create(data) {
    return await supabase.from('celestial_events').insert(data).select().single();
  },

  async update(id, data) {
    return await supabase.from('celestial_events').update(data).eq('id', id).select().single();
  },

  async delete(id) {
    return await supabase.from('celestial_events').delete().eq('id', id).select().single();
  }
};

export const EventModel = CelestialEventModel;
