// backend/src/controllers/notificationController.js
const prisma = require("../config/db");
const { success, error } = require("../utils/responseHelper");

/**
 * Get user's notifications
 */
async function getMyNotifications(req, res) {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" }
    });

    const unreadCount = notifications.filter(n => !n.read).length;

    return success(res, {
      unreadCount,
      notifications
    });
  } catch (err) {
    console.error("getMyNotifications error:", err);
    return error(res, "Failed to fetch notifications.", 500);
  }
}

/**
 * Mark a single notification as read
 */
async function markAsRead(req, res) {
  try {
    const { id } = req.params;

    const notification = await prisma.notification.findFirst({
      where: { id, userId: req.user.id }
    });

    if (!notification) {
      return error(res, "Notification not found.", 404);
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { read: true }
    });

    return success(res, updated);
  } catch (err) {
    console.error("markAsRead error:", err);
    return error(res, "Failed to mark notification as read.", 500);
  }
}

/**
 * Mark all notifications as read
 */
async function markAllAsRead(req, res) {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.user.id, read: false },
      data: { read: true }
    });

    return success(res, null, "All notifications marked as read.");
  } catch (err) {
    console.error("markAllAsRead error:", err);
    return error(res, "Failed to mark notifications as read.", 500);
  }
}

module.exports = {
  getMyNotifications,
  markAsRead,
  markAllAsRead
};
