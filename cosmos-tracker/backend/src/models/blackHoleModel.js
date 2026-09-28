import supabase from '../config/supabase.js';

export const BlackHoleModel = {
  async findAll({ page = 1, limit = 50 } = {}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    return await supabase.from('black_holes').select('*').order('name', { ascending: true }).range(from, to);
  },

  async findById(id) {
    return await supabase.from('black_holes').select('*').eq('id', id).single();
  },

  async create(data) {
    return await supabase.from('black_holes').insert(data).select().single();
  },

  async update(id, data) {
    return await supabase.from('black_holes').update(data).eq('id', id).select().single();
  },

  async delete(id) {
    return await supabase.from('black_holes').delete().eq('id', id).select().single();
  }
};
