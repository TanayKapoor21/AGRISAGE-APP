import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertFeed = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isExpanded, setIsExpanded] = useState(true);

  const mockAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'सिंचाई सिस्टम बंद',
      message: 'सेक्टर 3 का सिंचाई पंप बंद हो गया है। तुरंत जांच की आवश्यकता।',
      timestamp: new Date(Date.now() - 300000),
      location: 'उत्तरी खेत - सेक्टर 3',
      category: 'equipment',
      action: 'उपकरण जांचें',
      priority: 1
    },
    {
      id: 2,
      type: 'warning',
      title: 'मौसम चेतावनी',
      message: 'अगले 2 घंटों में भारी बारिश की संभावना। सुरक्षा उपाय करें।',
      timestamp: new Date(Date.now() - 600000),
      location: 'सभी खेत',
      category: 'weather',
      action: 'मौसम देखें',
      priority: 2
    },
    {
      id: 3,
      type: 'info',
      title: 'मिट्टी की नमी कम',
      message: 'सेक्टर 5 में मिट्टी की नमी इष्टतम स्तर से कम है।',
      timestamp: new Date(Date.now() - 900000),
      location: 'मुख्य खेत - सेक्टर 5',
      category: 'soil',
      action: 'सिंचाई करें',
      priority: 3
    },
    {
      id: 4,
      type: 'warning',
      title: 'कीट संक्रमण',
      message: 'गेहूं की फसल में एफिड कीट का संक्रमण देखा गया।',
      timestamp: new Date(Date.now() - 1200000),
      location: 'दक्षिणी खेत - सेक्टर A',
      category: 'pest',
      action: 'कीटनाशक छिड़काव',
      priority: 2
    },
    {
      id: 5,
      type: 'success',
      title: 'फसल तैयार',
      message: 'सरसों की फसल कटाई के लिए तैयार है।',
      timestamp: new Date(Date.now() - 1800000),
      location: 'पश्चिमी खेत - सेक्टर B',
      category: 'harvest',
      action: 'कटाई शुरू करें',
      priority: 4
    },
    {
      id: 6,
      type: 'info',
      title: 'उर्वरक स्टॉक कम',
      message: 'यूरिया उर्वरक का स्टॉक 20% से कम है।',
      timestamp: new Date(Date.now() - 2400000),
      location: 'गोदाम',
      category: 'inventory',
      action: 'ऑर्डर करें',
      priority: 3
    }
  ];

  useEffect(() => {
    setAlerts(mockAlerts?.sort((a, b) => a?.priority - b?.priority));
  }, []);

  const getAlertStyles = (type) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-error/10',
          border: 'border-error/20',
          icon: 'AlertTriangle',
          iconColor: 'text-error',
          textColor: 'text-error'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          border: 'border-warning/20',
          icon: 'AlertCircle',
          iconColor: 'text-warning',
          textColor: 'text-warning'
        };
      case 'info':
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/20',
          icon: 'Info',
          iconColor: 'text-primary',
          textColor: 'text-primary'
        };
      case 'success':
        return {
          bg: 'bg-success/10',
          border: 'border-success/20',
          icon: 'CheckCircle',
          iconColor: 'text-success',
          textColor: 'text-success'
        };
      default:
        return {
          bg: 'bg-muted',
          border: 'border-border',
          icon: 'Bell',
          iconColor: 'text-muted-foreground',
          textColor: 'text-foreground'
        };
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'equipment': return 'Settings';
      case 'weather': return 'Cloud';
      case 'soil': return 'Layers';
      case 'pest': return 'Bug';
      case 'harvest': return 'Scissors';
      case 'inventory': return 'Package';
      default: return 'Bell';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 60000);
    if (diff < 1) return 'अभी';
    if (diff < 60) return `${diff} मिनट पहले`;
    return `${Math.floor(diff / 60)} घंटे पहले`;
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts?.filter(alert => alert?.type === filter);

  const handleDismiss = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const handleAction = (alert) => {
    console.log(`Action triggered for alert: ${alert?.id}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">अलर्ट फ़ीड</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {['all', 'critical', 'warning', 'info', 'success']?.map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterType)}
              className="text-xs"
            >
              {filterType === 'all' ? 'सभी' :
               filterType === 'critical' ? 'गंभीर' :
               filterType === 'warning' ? 'चेतावनी' :
               filterType === 'info' ? 'जानकारी' : 'सफल'}
              {filterType !== 'all' && (
                <span className="ml-1 text-xs">
                  ({alerts?.filter(a => a?.type === filterType)?.length})
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>
      {/* Alert List */}
      {isExpanded && (
        <div className="max-h-96 overflow-y-auto">
          {filteredAlerts?.length === 0 ? (
            <div className="p-8 text-center">
              <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
              <p className="text-muted-foreground">कोई अलर्ट नहीं</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredAlerts?.map((alert) => {
                const styles = getAlertStyles(alert?.type);
                return (
                  <div
                    key={alert?.id}
                    className={`p-4 hover:bg-muted/50 transition-colors duration-200 ${styles?.bg}`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Alert Icon */}
                      <div className={`flex-shrink-0 ${styles?.iconColor}`}>
                        <Icon name={styles?.icon} size={20} />
                      </div>

                      {/* Alert Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`font-medium ${styles?.textColor}`}>
                            {alert?.title}
                          </h4>
                          <Icon name={getCategoryIcon(alert?.category)} size={14} className="text-muted-foreground" />
                        </div>

                        <p className="text-sm text-muted-foreground mb-2">
                          {alert?.message}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{alert?.location}</span>
                          <span className="font-data">{formatTimestamp(alert?.timestamp)}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAction(alert)}
                            className="text-xs"
                          >
                            {alert?.action}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDismiss(alert?.id)}
                            className="text-xs"
                          >
                            खारिज करें
                          </Button>
                        </div>
                      </div>

                      {/* Priority Indicator */}
                      <div className="flex-shrink-0">
                        <div className={`w-2 h-8 rounded-full ${
                          alert?.priority === 1 ? 'bg-error' :
                          alert?.priority === 2 ? 'bg-warning' :
                          alert?.priority === 3 ? 'bg-primary' : 'bg-success'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {/* Footer */}
      <div className="p-3 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            कुल अलर्ट: {alerts?.length}
          </span>
          <Button variant="ghost" size="sm" className="text-xs">
            सभी देखें
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertFeed;