import { BookmarkModel } from '../models/bookmarkModel.js';

export const BookmarkController = {
  async getUserBookmarks(req, res, next) {
    try {
      const { data, error } = await BookmarkModel.findByUserId(req.user.id);
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        bookmarks: data || []
      });
    } catch (err) {
      next(err);
    }
  },

  async toggleBookmark(req, res, next) {
    try {
      const { item_type, item_id, item_title } = req.body;

      if (!item_type || !item_id) {
        return res.status(400).json({
          success: false,
          message: 'item_type and item_id are required to toggle bookmark.'
        });
      }

      const { data: existing } = await BookmarkModel.findSpecific(req.user.id, item_type, item_id);

      if (existing) {
        await BookmarkModel.deleteByItem(req.user.id, item_type, item_id);
        return res.status(200).json({
          success: true,
          bookmarked: false,
          message: 'Cosmic object removed from watchlist.'
        });
      }

      const payload = {
        user_id: req.user.id,
        item_type,
        item_id,
        item_title: item_title || 'Celestial Object'
      };

      const { data, error } = await BookmarkModel.create(payload);
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(201).json({
        success: true,
        bookmarked: true,
        message: 'Cosmic object pinned to watchlist!',
        bookmark: data
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { error } = await BookmarkModel.delete(id, req.user.id);

      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        message: 'Bookmark removed.'
      });
    } catch (err) {
      next(err);
    }
  }
};
