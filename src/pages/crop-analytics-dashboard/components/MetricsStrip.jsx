import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsStrip = ({ selectedCrops, selectedSeason }) => {
  const metricsData = [
    {
      id: 'yield',
      title: 'Predicted Yield',
      titleHindi: 'अनुमानित उत्पादन',
      value: '42.5',
      unit: 'quintals/acre',
      unitHindi: 'क्विंटल/एकड़',
      change: '+12.3%',
      trend: 'up',
      confidence: '94%',
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10',
      sparkline: [38, 40, 39, 41, 42, 43, 42.5]
    },
    {
      id: 'growth',
      title: 'Growth Stage',
      titleHindi: 'वृद्धि चरण',
      value: '75%',
      unit: 'Vegetative',
      unitHindi: 'वानस्पतिक',
      change: '+5 days',
      trend: 'up',
      confidence: '98%',
      icon: 'Leaf',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      sparkline: [45, 52, 58, 65, 70, 73, 75]
    },
    {
      id: 'pest',
      title: 'Pest Risk',
      titleHindi: 'कीट जोखिम',
      value: 'Low',
      unit: '18% probability',
      unitHindi: '18% संभावना',
      change: '-8%',
      trend: 'down',
      confidence: '91%',
      icon: 'Bug',
      color: 'text-success',
      bgColor: 'bg-success/10',
      sparkline: [35, 28, 25, 22, 20, 19, 18]
    },
    {
      id: 'profitability',
      title: 'Profitability Score',
      titleHindi: 'लाभप्रदता स्कोर',
      value: '8.7',
      unit: '/10',
      unitHindi: '/10',
      change: '+0.4',
      trend: 'up',
      confidence: '89%',
      icon: 'IndianRupee',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      sparkline: [7.8, 8.1, 8.3, 8.5, 8.6, 8.7, 8.7]
    }
  ];

  const renderSparkline = (data, color) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data?.map((value, index) => {
      const x = (index / (data?.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 20;
      return `${x},${y}`;
    })?.join(' ');

    return (
      <svg width="60" height="20" className="opacity-60">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={color}
        />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricsData?.map((metric) => (
        <div key={metric?.id} className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className={`flex items-center justify-center w-12 h-12 ${metric?.bgColor} rounded-lg`}>
              <Icon name={metric?.icon} size={24} className={metric?.color} />
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground font-data">
                  AI: {metric?.confidence}
                </span>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {metric?.titleHindi}
              </h3>
              <p className="text-xs text-muted-foreground opacity-75">
                {metric?.title}
              </p>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-heading font-bold text-foreground">
                {metric?.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {metric?.unitHindi}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  metric?.trend === 'up' ? 'bg-success/10 text-success' : 
                  metric?.trend === 'down'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon 
                    name={metric?.trend === 'up' ? 'TrendingUp' : metric?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                    size={12} 
                  />
                  <span>{metric?.change}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                {renderSparkline(metric?.sparkline, metric?.color)}
              </div>
            </div>

            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                vs. historical average • Updated 2h ago
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsStrip;