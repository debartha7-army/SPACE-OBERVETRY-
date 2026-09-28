import { CelestialEventModel } from '../models/celestialEventModel.js';
import { ReminderModel } from '../models/reminderModel.js';

export const EventController = {
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { type, search } = req.query;

      const { data, count, error } = await CelestialEventModel.findAll({ page: 1, limit: 1000 });
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      let events = data || [];

      if (type && type !== 'all') {
        events = events.filter(e => e.type?.toLowerCase().includes(type.toLowerCase()));
      }

      if (search) {
        const q = search.toLowerCase();
        events = events.filter(e =>
          e.title?.toLowerCase().includes(q) ||
          e.description?.toLowerCase().includes(q) ||
          e.visibility_region?.toLowerCase().includes(q)
        );
      }

      const total = events.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const paginated = events.slice((page - 1) * limit, page * limit);

      return res.status(200).json({
        success: true,
        data: paginated,
        pagination: {
          total,
          page,
          limit,
          totalPages
        }
      });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const { data, error } = await CelestialEventModel.findById(id);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Celestial event not found.' });
      }

      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { data, error } = await CelestialEventModel.create(req.body);
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(201).json({
        success: true,
        message: 'Celestial event logged successfully.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { data, error } = await CelestialEventModel.update(id, req.body);

      if (error || !data) {
        return res.status(404).json({ success: false, message: 'Event not found or update failed.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Celestial event updated.',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { error } = await CelestialEventModel.delete(id);

      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        message: 'Celestial event deleted.'
      });
    } catch (err) {
      next(err);
    }
  },

  // In-app Event Reminder Toggle
  async toggleReminder(req, res, next) {
    try {
      const { eventId } = req.body;
      const userId = req.user.id;

      const { data: existing } = await ReminderModel.findByUserAndEvent(userId, eventId);

      if (existing) {
        await ReminderModel.delete(userId, eventId);
        return res.status(200).json({
          success: true,
          reminded: false,
          message: 'Reminder cancelled for this celestial event.'
        });
      } else {
        const { data: reminder } = await ReminderModel.create({ user_id: userId, event_id: eventId });
        return res.status(201).json({
          success: true,
          reminded: true,
          message: 'Reminder set! You will receive notification countdowns for this event.',
          data: reminder
        });
      }
    } catch (err) {
      next(err);
    }
  },

  async getReminders(req, res, next) {
    try {
      const { data } = await ReminderModel.findByUserId(req.user.id);
      return res.status(200).json({
        success: true,
        data: data || []
      });
    } catch (err) {
      next(err);
    }
  }
};
