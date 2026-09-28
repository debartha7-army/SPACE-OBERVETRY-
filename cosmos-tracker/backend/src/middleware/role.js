/**
 * Role Check Middleware:
 * Ensures the authenticated user has the 'admin' role.
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required prior to permission verification.'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Administrative privileges are required for this cosmic modification.'
    });
  }

  next();
};
