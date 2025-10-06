import React, { useState } from 'react';
import { Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EnvironmentalTrends = () => {
  const [selectedMetric, setSelectedMetric] = useState('temperature');
  const [timeRange, setTimeRange] = useState('7d');

  // Mock trend data
  const trendData = {
    temperature: [
      { time: '00:00', value: 22, optimal: 25 },
      { time: '04:00', value: 20, optimal: 25 },
      { time: '08:00', value: 26, optimal: 25 },
      { time: '12:00', value: 32, optimal: 25 },
      { time: '16:00', value: 35, optimal: 25 },
      { time: '20:00', value: 28, optimal: 25 }
    ],
    moisture: [
      { time: '00:00', value: 65, optimal: 70 },
      { time: '04:00', value: 68, optimal: 70 },
      { time: '08:00', value: 62, optimal: 70 },
      { time: '12:00', value: 58, optimal: 70 },
      { time: '16:00', value: 55, optimal: 70 },
      { time: '20:00', value: 60, optimal: 70 }
    ],
    ph: [
      { time: '00:00', value: 6.8, optimal: 6.5 },
      { time: '04:00', value: 6.7, optimal: 6.5 },
      { time: '08:00', value: 6.5, optimal: 6.5 },
      { time: '12:00', value: 6.3, optimal: 6.5 },
      { time: '16:00', value: 6.2, optimal: 6.5 },
      { time: '20:00', value: 6.4, optimal: 6.5 }
    ],
    aqi: [
      { time: '00:00', value: 85, optimal: 100 },
      { time: '04:00', value: 78, optimal: 100 },
      { time: '08:00', value: 92, optimal: 100 },
      { time: '12:00', value: 125, optimal: 100 },
      { time: '16:00', value: 135, optimal: 100 },
      { time: '20:00', value: 110, optimal: 100 }
    ]
  };

  const correlationData = [
    { factor: 'Temperature', correlation: 0.85, impact: 'High', trend: 'increasing' },
    { factor: 'Rainfall', correlation: -0.72, impact: 'High', trend: 'decreasing' },
    { factor: 'Humidity', correlation: 0.64, impact: 'Medium', trend: 'stable' },
    { factor: 'Wind Speed', correlation: -0.45, impact: 'Low', trend: 'variable' },
    { factor: 'Soil pH', correlation: 0.38, impact: 'Medium', trend: 'decreasing' }
  ];

  const metrics = [
    { key: 'temperature', label: 'Temperature', icon: 'Thermometer', unit: '°C', color: '#FF6B6B' },
    { key: 'moisture', label: 'Soil Moisture', icon: 'Droplets', unit: '%', color: '#4ECDC4' },
    { key: 'ph', label: 'Soil pH', icon: 'Layers', unit: 'pH', color: '#45B7D1' },
    { key: 'aqi', label: 'Air Quality', icon: 'Wind', unit: 'AQI', color: '#96CEB4' }
  ];

  const timeRanges = [
    { key: '24h', label: '24 Hours' },
    { key: '7d', label: '7 Days' },
    { key: '30d', label: '30 Days' },
    { key: '90d', label: '90 Days' }
  ];

  const currentMetric = metrics?.find(m => m?.key === selectedMetric);
  const currentData = trendData?.[selectedMetric] || [];

  const getCorrelationColor = (correlation) => {
    const abs = Math.abs(correlation);
    if (abs >= 0.7) return 'text-error';
    if (abs >= 0.5) return 'text-warning';
    return 'text-success';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return { name: 'TrendingUp', color: 'text-error' };
      case 'decreasing': return { name: 'TrendingDown', color: 'text-primary' };
      case 'stable': return { name: 'Minus', color: 'text-muted-foreground' };
      default: return { name: 'Activity', color: 'text-warning' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Trend Chart */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <h3 className="font-medium text-foreground">Environmental Trends</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Time Range Selector */}
            <div className="flex bg-muted rounded-lg p-1">
              {timeRanges?.map((range) => (
                <button
                  key={range?.key}
                  onClick={() => setTimeRange(range?.key)}
                  className={`px-3 py-1 text-xs rounded transition-colors duration-200 ${
                    timeRange === range?.key
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {range?.label}
                </button>
              ))}
            </div>
            
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>

        {/* Metric Selector */}
        <div className="flex space-x-2 mb-6">
          {metrics?.map((metric) => (
            <button
              key={metric?.key}
              onClick={() => setSelectedMetric(metric?.key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                selectedMetric === metric?.key
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-muted-foreground border-border hover:border-primary/50'
              }`}
            >
              <Icon name={metric?.icon} size={16} />
              <span className="text-sm font-medium">{metric?.label}</span>
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={currentMetric?.color}
                fill={`${currentMetric?.color}20`}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="optimal"
                stroke="var(--color-success)"
                strokeDasharray="5 5"
                strokeWidth={1}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Current Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
          {metrics?.map((metric) => {
            const data = trendData?.[metric?.key];
            const currentValue = data?.[data?.length - 1]?.value || 0;
            const optimalValue = data?.[data?.length - 1]?.optimal || 0;
            const deviation = ((currentValue - optimalValue) / optimalValue * 100)?.toFixed(1);
            
            return (
              <div key={metric?.key} className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Icon name={metric?.icon} size={14} className="text-primary" />
                  <span className="text-xs text-muted-foreground">{metric?.label}</span>
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {currentValue} {metric?.unit}
                </div>
                <div className={`text-xs ${Math.abs(deviation) > 10 ? 'text-error' : 'text-success'}`}>
                  {deviation > 0 ? '+' : ''}{deviation}% from optimal
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Correlation Analysis */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="GitBranch" size={20} className="text-primary" />
            <h3 className="font-medium text-foreground">Environmental Correlations</h3>
          </div>
          <Button variant="ghost" size="sm" iconName="Info">
            Learn More
          </Button>
        </div>

        <div className="space-y-3">
          {correlationData?.map((item, index) => {
            const trendIcon = getTrendIcon(item?.trend);
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Icon name={trendIcon?.name} size={14} className={trendIcon?.color} />
                    <span className="font-medium text-foreground">{item?.factor}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item?.impact === 'High' ? 'bg-error/10 text-error' :
                    item?.impact === 'Medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                  }`}>
                    {item?.impact}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">Correlation:</span>
                  <span className={`font-data font-medium ${getCorrelationColor(item?.correlation)}`}>
                    {item?.correlation > 0 ? '+' : ''}{item?.correlation}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-primary text-sm mb-1">Insight</h4>
              <p className="text-xs text-muted-foreground">
                Strong temperature correlation suggests implementing shade structures could improve crop stress resilience by 25%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalTrends;