import React from 'react';
import Icon from '../../../components/AppIcon';

const MarketKPICard = ({ title, value, change, changeType, unit, icon, trend, confidence }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  const getConfidenceColor = () => {
    if (confidence >= 80) return 'bg-success/20 text-success';
    if (confidence >= 60) return 'bg-warning/20 text-warning';
    return 'bg-error/20 text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            {confidence && (
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getConfidenceColor()}`}>
                <Icon name="Target" size={12} className="mr-1" />
                {confidence}% विश्वसनीयता
              </div>
            )}
          </div>
        </div>
        {trend && (
          <div className="flex items-center space-x-1">
            {trend?.map((point, index) => (
              <div
                key={index}
                className={`w-1 h-6 rounded-full ${
                  point > 0 ? 'bg-success' : point < 0 ? 'bg-error' : 'bg-muted'
                }`}
                style={{ height: `${Math.abs(point) * 20 + 8}px` }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-foreground">
            {typeof value === 'number' ? value?.toLocaleString('hi-IN') : value}
          </span>
          {unit && (
            <span className="text-sm text-muted-foreground">{unit}</span>
          )}
        </div>

        {change && (
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
              <Icon name={getChangeIcon()} size={14} />
              <span className="text-sm font-medium">
                {Math.abs(change)}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              पिछले महीने से
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketKPICard;