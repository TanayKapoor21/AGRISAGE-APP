import React from 'react';
import Icon from '../../../components/AppIcon';

const EnvironmentalMetricsCard = ({ title, value, unit, status, trend, icon, threshold }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'text-success bg-success/10 border-success/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'critical': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return { name: 'TrendingUp', color: 'text-success' };
    if (trend < 0) return { name: 'TrendingDown', color: 'text-error' };
    return { name: 'Minus', color: 'text-muted-foreground' };
  };

  const trendIcon = getTrendIcon(trend);

  return (
    <div className={`bg-card border rounded-lg p-4 ${getStatusColor(status)}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name={icon} size={20} className="text-primary" />
          <h3 className="font-medium text-sm text-foreground">{title}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name={trendIcon?.name} size={14} className={trendIcon?.color} />
          <span className={`text-xs font-data ${trendIcon?.color}`}>
            {Math.abs(trend)}%
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-semibold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        
        {threshold && (
          <div className="text-xs text-muted-foreground">
            Threshold: {threshold?.min} - {threshold?.max} {unit}
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            status === 'optimal' ? 'bg-success' : 
            status === 'warning' ? 'bg-warning' : 'bg-error'
          }`}></div>
          <span className="text-xs capitalize text-muted-foreground">{status}</span>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalMetricsCard;