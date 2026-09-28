import supabase from '../config/supabase.js';

export const UserModel = {
  async create(userData) {
    return await supabase.from('users').insert(userData).select().single();
  },

  async findByEmail(email) {
    return await supabase.from('users').select('*').eq('email', email).single();
  },

  async findById(id) {
    return await supabase.from('users').select('id, name, email, role, created_at').eq('id', id).single();
  },

  async findAll() {
    return await supabase.from('users').select('id, name, email, role, created_at');
  },

  async update(id, updates) {
    return await supabase.from('users').update(updates).eq('id', id).select().single();
  }
};
