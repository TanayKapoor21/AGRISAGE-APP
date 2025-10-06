import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, unit, status, trend, icon, description, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'excellent': return 'bg-success/10';
      case 'good': return 'bg-primary/10';
      case 'warning': return 'bg-warning/10';
      case 'critical': return 'bg-error/10';
      default: return 'bg-muted';
    }
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200 cursor-pointer ${getStatusBg(status)}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${getStatusBg(status)}`}>
          <Icon name={icon} size={24} className={getStatusColor(status)} />
        </div>
        <div className="flex items-center space-x-1">
          <Icon name={getTrendIcon(trend)} size={16} className={getTrendColor(trend)} />
          <span className={`text-sm font-medium ${getTrendColor(trend)}`}>
            {Math.abs(trend)}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium capitalize ${getStatusColor(status)}`}>
            {status}
          </span>
          <span className="text-xs text-muted-foreground font-data">
            अपडेट: 5 मिनट पहले
          </span>
        </div>
      </div>
    </div>
  );
};

export default KPICard;