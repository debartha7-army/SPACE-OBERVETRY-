import supabase from '../config/supabase.js';

export const ArticleModel = {
  async findAll({ page = 1, limit = 50 } = {}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    return await supabase.from('articles').select('*').order('published_at', { ascending: false }).range(from, to);
  },

  async findById(id) {
    return await supabase.from('articles').select('*').eq('id', id).single();
  },

  async create(data) {
    return await supabase.from('articles').insert(data).select().single();
  },

  async update(id, data) {
    return await supabase.from('articles').update(data).eq('id', id).select().single();
  },

  async delete(id) {
    return await supabase.from('articles').delete().eq('id', id).select().single();
  }
};
