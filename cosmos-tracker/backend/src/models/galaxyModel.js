import supabase from '../config/supabase.js';

export const GalaxyModel = {
  async findAll({ page = 1, limit = 50 } = {}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    return await supabase.from('galaxies').select('*').order('name', { ascending: true }).range(from, to);
  },

  async findById(id) {
    return await supabase.from('galaxies').select('*').eq('id', id).single();
  },

  async create(data) {
    return await supabase.from('galaxies').insert(data).select().single();
  },

  async update(id, data) {
    return await supabase.from('galaxies').update(data).eq('id', id).select().single();
  },

  async delete(id) {
    return await supabase.from('galaxies').delete().eq('id', id).select().single();
  }
};
