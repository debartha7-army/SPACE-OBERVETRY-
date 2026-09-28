import { FavoriteModel } from '../models/favoriteModel.js';

export const FavoriteController = {
  async getUserFavorites(req, res, next) {
    try {
      const { data, error } = await FavoriteModel.findByUserId(req.user.id);
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        data: data || []
      });
    } catch (err) {
      next(err);
    }
  },

  async toggleFavorite(req, res, next) {
    try {
      const { item_type, item_id, item_title } = req.body;

      if (!item_type || !item_id) {
        return res.status(400).json({
          success: false,
          message: 'item_type and item_id are required to toggle favorite.'
        });
      }

      const { data: existing } = await FavoriteModel.findSpecific(req.user.id, item_type, item_id);

      if (existing) {
        await FavoriteModel.deleteByItem(req.user.id, item_type, item_id);
        return res.status(200).json({
          success: true,
          favorited: false,
          bookmarked: false,
          message: 'Removed from watchlist.'
        });
      }

      const payload = {
        user_id: req.user.id,
        item_type,
        item_id,
        item_title: item_title || 'Celestial Object'
      };

      const { data, error } = await FavoriteModel.create(payload);
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(201).json({
        success: true,
        favorited: true,
        bookmarked: true,
        message: 'Pinned to watchlist!',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { error } = await FavoriteModel.delete(id, req.user.id);

      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        message: 'Removed from watchlist.'
      });
    } catch (err) {
      next(err);
    }
  }
};

export const BookmarkController = FavoriteController;
