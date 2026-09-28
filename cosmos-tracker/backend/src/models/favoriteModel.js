import supabase from '../config/supabase.js';

export const FavoriteModel = {
  async findByUserId(userId) {
    return await supabase.from('favorites').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  },

  async findSpecific(userId, itemType, itemId) {
    return await supabase.from('favorites').select('*').eq('user_id', userId).eq('item_type', itemType).eq('item_id', itemId).single();
  },

  async create(data) {
    return await supabase.from('favorites').insert(data).select().single();
  },

  async delete(id, userId) {
    return await supabase.from('favorites').delete().eq('id', id).eq('user_id', userId).select().single();
  },

  async deleteByItem(userId, itemType, itemId) {
    return await supabase.from('favorites').delete().eq('user_id', userId).eq('item_type', itemType).eq('item_id', itemId).select().single();
  }
};

export const BookmarkModel = FavoriteModel;
