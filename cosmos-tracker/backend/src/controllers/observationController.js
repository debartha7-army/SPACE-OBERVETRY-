import { ObservationModel } from '../models/observationModel.js';

export const ObservationController = {
  async getUserObservations(req, res, next) {
    try {
      const { data, error } = await ObservationModel.findByUserId(req.user.id);
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        observations: data || []
      });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { target_name, target_type, observation_date, telescope_equipment, seeing_conditions, notes } = req.body;

      if (!target_name || !observation_date) {
        return res.status(400).json({
          success: false,
          message: 'Target celestial name and observation date are required.'
        });
      }

      const payload = {
        user_id: req.user.id,
        target_name: target_name.trim(),
        target_type: target_type || 'Celestial Object',
        observation_date,
        telescope_equipment: telescope_equipment || 'Naked Eye / Binoculars',
        seeing_conditions: seeing_conditions || 'Clear skies',
        notes: notes || ''
      };

      const { data, error } = await ObservationModel.create(payload);
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(201).json({
        success: true,
        message: 'Observation log recorded into your astronomer journal.',
        observation: data
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { error } = await ObservationModel.delete(id, req.user.id);

      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        message: 'Observation entry removed.'
      });
    } catch (err) {
      next(err);
    }
  }
};
