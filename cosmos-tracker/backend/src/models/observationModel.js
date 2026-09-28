import supabase from '../config/supabase.js';

export const ObservationModel = {
  async findByUserId(userId) {
    return await supabase.from('observations').select('*').eq('user_id', userId).order('observation_date', { ascending: false });
  },

  async findById(id) {
    return await supabase.from('observations').select('*').eq('id', id).single();
  },

  async create(data) {
    return await supabase.from('observations').insert(data).select().single();
  },

  async delete(id, userId) {
    return await supabase.from('observations').delete().eq('id', id).eq('user_id', userId).select().single();
  }
};
