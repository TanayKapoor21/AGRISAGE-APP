import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EnvironmentalAlerts = ({ onAlertAction }) => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');

  // Mock environmental alerts data
  const mockAlerts = [
    {
      id: 'env_001',
      type: 'critical',
      category: 'water',
      title: 'Water Pollution Detected',
      message: 'High nitrate levels detected in water body near Sector 3. Immediate action required.',
      location: 'North Field - Water Body 1',
      timestamp: new Date(Date.now() - 180000),
      sensor: 'water_001',
      readings: { nitrate: 45, threshold: 25, unit: 'mg/L' },
      actions: ['Test Water', 'Alert Authorities', 'Stop Irrigation']
    },
    {
      id: 'env_002',
      type: 'warning',
      category: 'soil',
      title: 'Soil pH Imbalance',
      message: 'Soil pH levels have dropped below optimal range in multiple sectors.',
      location: 'Main Farm - Sectors 2,4,6',
      timestamp: new Date(Date.now() - 420000),
      sensor: 'soil_001',
      readings: { ph: 5.8, threshold: 6.5, unit: 'pH' },
      actions: ['Apply Lime', 'Retest Soil', 'Adjust Fertilizer']
    },
    {
      id: 'env_003',
      type: 'info',
      category: 'air',
      title: 'Air Quality Moderate',
      message: 'Air quality index has increased due to regional dust storms.',
      location: 'All Fields',
      timestamp: new Date(Date.now() - 600000),
      sensor: 'air_001',
      readings: { aqi: 125, threshold: 100, unit: 'AQI' },
      actions: ['Monitor Crops', 'Protective Measures']
    },
    {
      id: 'env_004',
      type: 'warning',
      category: 'carbon',
      title: 'Carbon Footprint High',
      message: 'Monthly carbon emissions exceeded sustainability targets by 15%.',
      location: 'Farm Operations',
      timestamp: new Date(Date.now() - 900000),
      sensor: 'carbon_calc',
      readings: { emissions: 2.3, threshold: 2.0, unit: 'tons CO2' },
      actions: ['Review Practices', 'Optimize Equipment', 'Plant Trees']
    },
    {
      id: 'env_005',
      type: 'critical',
      category: 'temperature',
      title: 'Thermal Stress Alert',
      message: 'Extreme temperature variations detected. Crop stress imminent.',
      location: 'South Field - Sector 8',
      timestamp: new Date(Date.now() - 1200000),
      sensor: 'weather_001',
      readings: { temperature: 42, threshold: 35, unit: '°C' },
      actions: ['Increase Irrigation', 'Shade Crops', 'Monitor Health']
    }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);
  }, []);

  const getAlertIcon = (category) => {
    const icons = {
      water: 'Droplets',
      soil: 'Layers',
      air: 'Wind',
      carbon: 'Leaf',
      temperature: 'Thermometer'
    };
    return icons?.[category] || 'AlertTriangle';
  };

  const getAlertStyles = (type) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-error/10',
          border: 'border-error/20',
          iconColor: 'text-error',
          textColor: 'text-error-foreground'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          border: 'border-warning/20',
          iconColor: 'text-warning',
          textColor: 'text-warning-foreground'
        };
      case 'info':
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/20',
          iconColor: 'text-primary',
          textColor: 'text-primary-foreground'
        };
      default:
        return {
          bg: 'bg-muted',
          border: 'border-border',
          iconColor: 'text-muted-foreground',
          textColor: 'text-foreground'
        };
    }
  };

  const formatTimestamp = (timestamp) => {
    const diff = Math.floor((new Date() - timestamp) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return `${Math.floor(diff / 60)}h ago`;
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts?.filter(alert => alert?.type === filter);

  const handleAlertAction = (alert, action) => {
    console.log(`Action "${action}" triggered for alert: ${alert?.id}`);
    onAlertAction && onAlertAction(alert, action);
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-foreground">Environmental Alerts</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground font-data">
              {filteredAlerts?.length} active
            </span>
            <Button variant="ghost" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {['all', 'critical', 'warning', 'info']?.map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`flex-1 px-3 py-2 text-xs rounded-md transition-colors duration-200 ${
                filter === filterType
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {filterType?.charAt(0)?.toUpperCase() + filterType?.slice(1)}
              {filterType !== 'all' && (
                <span className="ml-1 text-xs">
                  ({alerts?.filter(a => a?.type === filterType)?.length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Alerts List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredAlerts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={32} className="text-success mx-auto mb-2" />
            <p className="text-muted-foreground">No environmental alerts</p>
            <p className="text-xs text-muted-foreground mt-1">All systems operating normally</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredAlerts?.map((alert) => {
              const styles = getAlertStyles(alert?.type);
              return (
                <div
                  key={alert?.id}
                  className={`p-3 rounded-lg border ${styles?.bg} ${styles?.border} transition-all duration-200 hover:shadow-sm`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 ${styles?.iconColor} mt-0.5`}>
                      <Icon name={getAlertIcon(alert?.category)} size={16} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium text-sm ${styles?.textColor}`}>
                          {alert?.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground font-data">
                            {formatTimestamp(alert?.timestamp)}
                          </span>
                          <button
                            onClick={() => handleDismissAlert(alert?.id)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Icon name="X" size={12} />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2">
                        {alert?.message}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>{alert?.location}</span>
                        {alert?.readings && (
                          <span className="font-data">
                            {alert?.readings?.value || Object.values(alert?.readings)?.[0]} {alert?.readings?.unit}
                            {alert?.readings?.threshold && (
                              <span className="text-muted-foreground/70">
                                {' '}(threshold: {alert?.readings?.threshold})
                              </span>
                            )}
                          </span>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-1">
                        {alert?.actions?.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="xs"
                            onClick={() => handleAlertAction(alert, action)}
                            className="text-xs"
                          >
                            {action}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnvironmentalAlerts;