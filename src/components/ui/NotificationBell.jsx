import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell, FileBarChart, Sparkles, AlertTriangle, Users, Award,
  Upload, BarChart3, CheckCheck,
} from 'lucide-react'

const TYPE_ICONS = {
  report: FileBarChart,
  insight: Sparkles,
  alert: AlertTriangle,
  investor: Users,
  grant: Award,
  upload: Upload,
  metrics: BarChart3,
}

const TYPE_STYLES = {
  report: 'bg-blue-50 text-blue-600',
  insight: 'bg-primary-light text-primary-dark',
  alert: 'bg-red-50 text-red-600',
  investor: 'bg-violet-50 text-violet-600',
  grant: 'bg-amber-50 text-amber-600',
  upload: 'bg-gray-100 text-text-secondary',
  metrics: 'bg-emerald-50 text-emerald-600',
}

export default function NotificationBell({ notifications: initial }) {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(initial)
  const ref = useRef(null)
  const navigate = useNavigate()

  const unreadCount = items.filter((n) => !n.read).length

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleClick = (notification) => {
    setItems((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
    )
    setOpen(false)
    if (notification.link) navigate(notification.link)
  }

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative p-2 rounded-lg text-text-secondary hover:bg-gray-50 hover:text-text-primary border border-border transition-colors"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold leading-none">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-card rounded-xl border border-border shadow-xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gray-50/50">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                {unreadCount > 0 && (
                  <p className="text-xs text-text-secondary mt-0.5">{unreadCount} unread</p>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark"
                >
                  <CheckCheck size={14} />
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-[360px] overflow-y-auto">
              {items.map((notification) => {
                const Icon = TYPE_ICONS[notification.type] || Bell
                const iconStyle = TYPE_STYLES[notification.type] || TYPE_STYLES.upload
                return (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => handleClick(notification)}
                    className={`w-full text-left px-4 py-3 flex gap-3 border-b border-border last:border-0 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-primary-light/30' : ''
                    }`}
                  >
                    <div className={`shrink-0 p-2 rounded-lg h-fit ${iconStyle}`}>
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm leading-snug ${!notification.read ? 'font-semibold text-text-primary' : 'font-medium text-text-primary'}`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="shrink-0 w-2 h-2 rounded-full bg-primary mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-text-secondary mt-1 line-clamp-2">{notification.message}</p>
                      <p className="text-[11px] text-text-secondary/70 mt-1.5">{notification.time}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
