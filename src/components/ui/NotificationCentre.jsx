import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { useLanguage } from '../../contexts/LanguageContext';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { translate } = useLanguage();

  // Mock notifications data - in real app, this would come from API/WebSocket
  const mockNotifications = [
    {
      id: 1,
      type: 'critical',
      title: 'Irrigation System Failure',
      message: 'Sector 3 irrigation pump has stopped. Immediate attention required.',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      location: 'North Field - Sector 3',
      action: 'Check Equipment',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Weather Alert',
      message: 'Heavy rainfall expected in next 2 hours. Consider protective measures.',
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      location: 'All Fields',
      action: 'View Forecast',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Soil Moisture Low',
      message: 'Soil moisture in Sector 5 has dropped below optimal levels.',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      location: 'Main Farm - Sector 5',
      action: 'Schedule Irrigation',
      read: true
    },
    {
      id: 4,
      type: 'success',
      title: 'Harvest Complete',
      message: 'Sector 2 wheat harvest has been completed successfully.',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      location: 'Main Farm - Sector 2',
      action: 'View Report',
      read: true
    },
    {
      id: 5,
      type: 'warning',
      title: 'Equipment Maintenance Due',
      message: 'Tractor T-101 is due for scheduled maintenance.',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      location: 'Equipment Yard',
      action: 'Schedule Service',
      read: false
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications?.filter(n => !n?.read)?.length);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'critical':
        return { name: 'AlertTriangle', color: 'text-error' };
      case 'warning':
        return { name: 'AlertCircle', color: 'text-warning' };
      case 'info':
        return { name: 'Info', color: 'text-primary' };
      case 'success':
        return { name: 'CheckCircle', color: 'text-success' };
      default:
        return { name: 'Bell', color: 'text-muted-foreground' };
    }
  };

  const getNotificationBg = (type) => {
    switch (type) {
      case 'critical':
        return 'bg-error/10 border-error/20';
      case 'warning':
        return 'bg-warning/10 border-warning/20';
      case 'info':
        return 'bg-primary/10 border-primary/20';
      case 'success':
        return 'bg-success/10 border-success/20';
      default:
        return 'bg-muted/50 border-border';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 60000); // minutes
    if (diff < 1) return translate('header.justNow');
    if (diff < 60) return translate('header.minutesAgo', { minutes: diff });
    return translate('header.hoursAgo', { hours: Math.floor(diff / 60) });
  };

  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotifications(prev => 
      prev?.map(n => n?.id === notification?.id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
    
    console.log(`Notification action: ${notification?.action} for ${notification?.id}`);
    // In real app, this would trigger specific actions based on notification type
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev?.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Icon name="Bell" size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-popover border border-border rounded-lg shadow-elevation-3 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={20} className="text-foreground" />
              <h3 className="font-medium text-foreground">
                {translate('alerts.title')}
              </h3>
              {unreadCount > 0 && (
                <span className="px-2 py-1 text-xs bg-error/10 text-error rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications?.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div className="p-2">
                {notifications?.map((notification) => {
                  const iconData = getNotificationIcon(notification?.type);
                  const bgClass = getNotificationBg(notification?.type);
                  
                  return (
                    <div
                      key={notification?.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-3 rounded-lg border mb-2 cursor-pointer transition-all duration-200 hover:bg-muted/30 ${bgClass} ${
                        !notification?.read ? 'border-l-4' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 mt-0.5 ${iconData?.color}`}>
                          <Icon name={iconData?.name} size={16} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`font-medium text-sm ${
                              !notification?.read ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {notification?.title}
                            </h4>
                            <span className="text-xs text-muted-foreground font-data">
                              {formatTimestamp(notification?.timestamp)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification?.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {notification?.location}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs h-auto py-1 px-2"
                            >
                              {notification?.action}
                            </Button>
                          </div>
                        </div>
                        
                        {!notification?.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications?.length > 0 && (
            <div className="p-3 border-t border-border">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllNotifications}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  View All Notifications
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;