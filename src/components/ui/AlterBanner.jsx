import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { useLanguage } from '../../contexts/LanguageContext';

const AlertBanner = () => {
  const [alerts, setAlerts] = useState([]);
  const [currentAlert, setCurrentAlert] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const { translate } = useLanguage();

  // Mock alerts data - in real app, this would come from API/WebSocket
  const mockAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Irrigation System Failure',
      message: 'Sector 3 irrigation pump has stopped. Immediate attention required.',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      location: 'North Field - Sector 3',
      action: 'Check Equipment'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Weather Alert',
      message: 'Heavy rainfall expected in next 2 hours. Consider protective measures.',
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      location: 'All Fields',
      action: 'View Forecast'
    },
    {
      id: 3,
      type: 'info',
      title: 'Soil Moisture Low',
      message: 'Soil moisture in Sector 5 has dropped below optimal levels.',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      location: 'Main Farm - Sector 5',
      action: 'Schedule Irrigation'
    }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);
  }, []);

  useEffect(() => {
    if (alerts?.length > 1) {
      const interval = setInterval(() => {
        setCurrentAlert((prev) => (prev + 1) % alerts?.length);
      }, 5000); // Auto-rotate every 5 seconds

      return () => clearInterval(interval);
    }
  }, [alerts?.length]);

  const getAlertStyles = (type) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-error/90 backdrop-blur-sm',
          border: 'border-error',
          icon: 'AlertTriangle',
          iconColor: 'text-white',
          textColor: 'text-white',
          titleColor: 'text-white'
        };
      case 'warning':
        return {
          bg: 'bg-warning/90 backdrop-blur-sm',
          border: 'border-warning',
          icon: 'AlertCircle',
          iconColor: 'text-white',
          textColor: 'text-white',
          titleColor: 'text-white'
        };
      case 'info':
        return {
          bg: 'bg-primary/90 backdrop-blur-sm',
          border: 'border-primary',
          icon: 'Info',
          iconColor: 'text-white',
          textColor: 'text-white',
          titleColor: 'text-white'
        };
      default:
        return {
          bg: 'bg-card/95 backdrop-blur-sm',
          border: 'border-border',
          icon: 'Bell',
          iconColor: 'text-muted-foreground',
          textColor: 'text-foreground',
          titleColor: 'text-foreground'
        };
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 60000); // minutes
    if (diff < 1) return translate('header.justNow');
    if (diff < 60) return translate('header.minutesAgo', { minutes: diff });
    return translate('header.hoursAgo', { hours: Math.floor(diff / 60) });
  };

  const handleDismiss = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
    if (currentAlert >= alerts?.length - 1) {
      setCurrentAlert(0);
    }
  };

  const handleAction = (alert) => {
    console.log(`Action triggered for alert: ${alert?.id}`);
    // In real app, this would trigger specific actions based on alert type
  };

  if (alerts?.length === 0) return null;

  const alert = alerts?.[currentAlert];
  if (!alert) return null;

  const styles = getAlertStyles(alert?.type);

  return (
    <div className={`fixed top-16 left-0 right-0 z-40 ${styles?.bg} ${styles?.border} border-b shadow-lg transition-all duration-300`}>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Alert Content */}
          <div className="flex items-center space-x-4 flex-1">
            <div className={`flex-shrink-0 ${styles?.iconColor}`}>
              <Icon name={styles?.icon} size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <h4 className={`font-semibold ${styles?.titleColor}`}>
                  {translate(`alerts.${alert?.title?.toLowerCase()?.replace(/\s+/g, '')}`, alert?.title)}
                </h4>
                <span className={`text-xs font-data px-2 py-1 rounded-full ${
                  alert?.type === 'critical' ? 'bg-white/20 text-white' :
                  alert?.type === 'warning' ? 'bg-white/20 text-white' :
                  alert?.type === 'info'? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {formatTimestamp(alert?.timestamp)}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  alert?.type === 'critical' ? 'bg-white/20 text-white' :
                  alert?.type === 'warning' ? 'bg-white/20 text-white' :
                  alert?.type === 'info'? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {translate(`locations.${alert?.location?.toLowerCase()?.replace(/[\s-]/g, '')}`) || alert?.location}
                </span>
              </div>
              
              <p className={`text-sm mt-1 ${styles?.textColor} opacity-90`}>
                {translate('alerts.immediateAttention')}
              </p>
            </div>
          </div>

          {/* Alert Controls */}
          <div className="flex items-center space-x-2 ml-4">
            {/* Alert Counter */}
            {alerts?.length > 1 && (
              <div className="hidden sm:flex items-center space-x-2">
                <span className={`text-xs ${styles?.textColor} opacity-75`}>
                  {currentAlert + 1} of {alerts?.length}
                </span>
                <div className="flex space-x-1">
                  {alerts?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentAlert(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentAlert ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction(alert)}
                className={`border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200`}
              >
                {translate(`alerts.${alert?.action?.toLowerCase()?.replace(/\s+/g, '')}`) || alert?.action}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
              >
                {translate('alerts.exportReport')}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
              >
                {translate('alerts.configureAlerts')}
              </Button>

              {/* Expand/Collapse */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className={`text-white hover:bg-white/20 transition-colors duration-200`}
              >
                <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
              </Button>

              {/* Dismiss */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDismiss(alert?.id)}
                className={`text-white hover:bg-white/20 transition-colors duration-200`}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className={`font-medium ${styles?.titleColor}`}>Priority:</span>
                <span className={`ml-2 capitalize ${styles?.textColor}`}>
                  {translate(`alerts.${alert?.type}`) || alert?.type}
                </span>
              </div>
              <div>
                <span className={`font-medium ${styles?.titleColor}`}>Location:</span>
                <span className={`ml-2 ${styles?.textColor} opacity-90`}>
                  {translate(`locations.${alert?.location?.toLowerCase()?.replace(/[\s-]/g, '')}`) || alert?.location}
                </span>
              </div>
              <div>
                <span className={`font-medium ${styles?.titleColor}`}>Time:</span>
                <span className={`ml-2 ${styles?.textColor} opacity-90 font-data`}>
                  {alert?.timestamp?.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertBanner;