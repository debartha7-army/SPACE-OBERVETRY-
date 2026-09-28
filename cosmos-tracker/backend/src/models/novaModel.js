import supabase from '../config/supabase.js';

export const NovaModel = {
  async findAll({ page = 1, limit = 50 } = {}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    return await supabase.from('novae_variables').select('*').order('name', { ascending: true }).range(from, to);
  },

  async findById(id) {
    return await supabase.from('novae_variables').select('*').eq('id', id).single();
  },

  async create(data) {
    return await supabase.from('novae_variables').insert(data).select().single();
  },

  async update(id, data) {
    return await supabase.from('novae_variables').update(data).eq('id', id).select().single();
  },

  async delete(id) {
    return await supabase.from('novae_variables').delete().eq('id', id).select().single();
  }
};
