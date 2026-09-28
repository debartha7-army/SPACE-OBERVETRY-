import supabase from '../config/supabase.js';

export const PlanetModel = {
  async findAll({ page = 1, limit = 50 } = {}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    return await supabase.from('planets_solar_system').select('*').range(from, to);
  },

  async findById(id) {
    return await supabase.from('planets_solar_system').select('*').eq('id', id).single();
  },

  async create(data) {
    return await supabase.from('planets_solar_system').insert(data).select().single();
  },

  async update(id, data) {
    return await supabase.from('planets_solar_system').update(data).eq('id', id).select().single();
  },

  async delete(id) {
    return await supabase.from('planets_solar_system').delete().eq('id', id).select().single();
  }
};
