import { useState, useEffect } from 'react'
import { Bell, X, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import axios from 'axios'

const Notifications = () => {
    const { user } = useAuth()
    const { t } = useTheme()
    const [notifications, setNotifications] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [showDropdown, setShowDropdown] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            fetchUnreadCount()
            fetchNotifications()
        }
    }, [user])

    const fetchUnreadCount = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/notifications/unread-count')
            setUnreadCount(response.data.unreadCount)
        } catch (error) {
            console.error('Error al obtener contador de notificaciones:', error)
        }
    }

    const fetchNotifications = async () => {
        try {
            setLoading(true)
            const response = await axios.get('http://localhost:5001/api/notifications')
            setNotifications(response.data)
        } catch (error) {
            console.error('Error al obtener notificaciones:', error)
        } finally {
            setLoading(false)
        }
    }

    const markAsRead = async (notificationId) => {
        try {
            await axios.put(`http://localhost:5001/api/notifications/${notificationId}/read`)
            setNotifications(prev =>
                prev.map(notif =>
                    notif._id === notificationId ? { ...notif, read: true } : notif
                )
            )
            setUnreadCount(prev => Math.max(0, prev - 1))
        } catch (error) {
            console.error('Error al marcar notificación como leída:', error)
        }
    }

    const markAllAsRead = async () => {
        try {
            await axios.put('http://localhost:5001/api/notifications/mark-all-read')
            setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
            setUnreadCount(0)
        } catch (error) {
            console.error('Error al marcar todas como leídas:', error)
        }
    }

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'like':
                return '❤️'
            case 'comment':
                return '💬'
            case 'follow':
                return '👤'
            default:
                return '🔔'
        }
    }

    const formatNotificationTime = (timestamp) => {
        const now = new Date()
        const notifTime = new Date(timestamp)
        const diffInMinutes = Math.floor((now - notifTime) / (1000 * 60))

        if (diffInMinutes < 1) return 'Ahora'
        if (diffInMinutes < 60) return `${diffInMinutes}m`
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
        return `${Math.floor(diffInMinutes / 1440)}d`
    }

    return (
        <div className="notifications-container">
            <button
                className="notifications-trigger"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <Bell size={24} />
                {unreadCount > 0 && (
                    <span className="notification-badge">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {showDropdown && (
                    <>
                        <div
                            className="notifications-overlay"
                            onClick={() => setShowDropdown(false)}
                        />
                        <motion.div
                            className="notifications-dropdown"
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="notifications-header">
                                <h3>{t('notifications')}</h3>
                                <div className="notifications-actions">
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllAsRead}
                                            className="mark-all-read-btn"
                                            title="Marcar todas como leídas"
                                        >
                                            <Check size={16} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setShowDropdown(false)}
                                        className="close-notifications-btn"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="notifications-list">
                                {loading ? (
                                    <div className="notifications-loading">
                                        <div className="loading-spinner"></div>
                                        <p>Cargando notificaciones...</p>
                                    </div>
                                ) : notifications.length === 0 ? (
                                    <div className="notifications-empty">
                                        <Bell size={48} />
                                        <p>No tienes notificaciones</p>
                                    </div>
                                ) : (
                                    notifications.map(notification => (
                                        <div
                                            key={notification._id}
                                            className={`notification-item ${!notification.read ? 'unread' : ''}`}
                                            onClick={() => !notification.read && markAsRead(notification._id)}
                                        >
                                            <div className="notification-icon">
                                                {getNotificationIcon(notification.type)}
                                            </div>

                                            <img
                                                src={notification.sender?.avatar || '/default-avatar.png'}
                                                alt={notification.sender?.fullName}
                                                className="notification-avatar"
                                            />

                                            <div className="notification-content">
                                                <p className="notification-text">
                                                    <strong>{notification.sender?.fullName}</strong> {notification.message}
                                                </p>
                                                <span className="notification-time">
                                                    {formatNotificationTime(notification.createdAt)}
                                                </span>
                                            </div>

                                            {!notification.read && (
                                                <div className="notification-unread-dot"></div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>

                            {notifications.length > 0 && (
                                <div className="notifications-footer">
                                    <button className="view-all-notifications-btn">
                                        Ver todas las notificaciones
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Notifications
