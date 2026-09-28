import { dispatchModel } from '../models/dispatchModel.js';

export const getPapers = async (req, res, next) => {
  try {
    const { institution, category, search, page = 1, limit = 10 } = req.query;
    const result = await dispatchModel.getAllPapers({ institution, category, search, page, limit });
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

export const getSocial = async (req, res, next) => {
  try {
    const { platform, search, page = 1, limit = 10 } = req.query;
    const result = await dispatchModel.getAllSocial({ platform, search, page, limit });
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

export const getStatus = async (req, res, next) => {
  try {
    const status = await dispatchModel.getSyncInfo();
    res.status(200).json({
      success: true,
      data: status
    });
  } catch (error) {
    next(error);
  }
};

export const triggerManualSync = async (req, res, next) => {
  try {
    const result = await dispatchModel.performDaily7AMSync();
    res.status(200).json({
      success: true,
      message: 'Observatory 7:00 AM daily paper and social dispatch pipeline synced successfully!',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
