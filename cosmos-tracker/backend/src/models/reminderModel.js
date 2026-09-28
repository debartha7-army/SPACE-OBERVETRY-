import supabase from '../config/supabase.js';

export const ReminderModel = {
  async findByUserId(userId) {
    return await supabase.from('event_reminders').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  },

  async findByUserAndEvent(userId, eventId) {
    return await supabase.from('event_reminders').select('*').eq('user_id', userId).eq('event_id', eventId).single();
  },

  async create(data) {
    return await supabase.from('event_reminders').insert(data).select().single();
  },

  async delete(userId, eventId) {
    return await supabase.from('event_reminders').delete().eq('user_id', userId).eq('event_id', eventId).select().single();
  }
};
