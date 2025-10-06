import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const YieldProgressionChart = ({ selectedCrops, selectedSeason }) => {
  const [chartView, setChartView] = useState('progression');
  const [showWeatherOverlay, setShowWeatherOverlay] = useState(true);
  const [selectedZone, setSelectedZone] = useState('all');

  const progressionData = [
    {
      week: 'Week 1',
      date: '2024-06-15',
      wheat: 5.2,
      rice: 3.8,
      cotton: 2.1,
      predicted: 5.5,
      rainfall: 12,
      temperature: 28,
      humidity: 65
    },
    {
      week: 'Week 4',
      date: '2024-07-06',
      wheat: 12.8,
      rice: 9.4,
      cotton: 6.7,
      predicted: 13.2,
      rainfall: 45,
      temperature: 31,
      humidity: 72
    },
    {
      week: 'Week 8',
      date: '2024-08-03',
      wheat: 24.5,
      rice: 18.9,
      cotton: 15.2,
      predicted: 25.1,
      rainfall: 78,
      temperature: 29,
      humidity: 78
    },
    {
      week: 'Week 12',
      date: '2024-08-31',
      wheat: 35.7,
      rice: 28.6,
      cotton: 24.8,
      predicted: 36.2,
      rainfall: 23,
      temperature: 27,
      humidity: 68
    },
    {
      week: 'Week 16',
      date: '2024-09-28',
      wheat: 42.1,
      rice: 36.4,
      cotton: 32.9,
      predicted: 42.5,
      rainfall: 8,
      temperature: 25,
      humidity: 58
    },
    {
      week: 'Week 20',
      date: '2024-10-26',
      wheat: 45.3,
      rice: 41.2,
      cotton: 38.7,
      predicted: 45.8,
      rainfall: 2,
      temperature: 22,
      humidity: 52
    }
  ];

  const zoneData = [
    {
      zone: 'Zone A',
      area: '62 acres',
      currentYield: 44.2,
      predictedYield: 46.8,
      efficiency: 94.4,
      soilHealth: 'Excellent',
      irrigation: 'Optimal'
    },
    {
      zone: 'Zone B',
      area: '58 acres',
      currentYield: 41.8,
      predictedYield: 43.2,
      efficiency: 96.8,
      soilHealth: 'Good',
      irrigation: 'Adequate'
    },
    {
      zone: 'Zone C',
      area: '45 acres',
      currentYield: 39.6,
      predictedYield: 41.1,
      efficiency: 96.3,
      soilHealth: 'Fair',
      irrigation: 'Needs Attention'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-elevation-3">
          <h4 className="font-medium text-foreground mb-2">{label}</h4>
          <div className="space-y-2">
            {payload?.map((entry) => (
              <div key={entry?.dataKey} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry?.color }}
                  />
                  <span className="text-sm text-muted-foreground capitalize">
                    {entry?.dataKey}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {entry?.value} {entry?.dataKey?.includes('rainfall') ? 'mm' : 
                    entry?.dataKey?.includes('temperature') ? '°C' : 
                    entry?.dataKey?.includes('humidity') ? '%' : 'q/acre'}
                </span>
              </div>
            ))}
          </div>
          {showWeatherOverlay && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="text-center">
                  <Icon name="CloudRain" size={14} className="text-primary mx-auto mb-1" />
                  <div className="font-data">{data?.rainfall}mm</div>
                </div>
                <div className="text-center">
                  <Icon name="Thermometer" size={14} className="text-accent mx-auto mb-1" />
                  <div className="font-data">{data?.temperature}°C</div>
                </div>
                <div className="text-center">
                  <Icon name="Droplets" size={14} className="text-primary mx-auto mb-1" />
                  <div className="font-data">{data?.humidity}%</div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      {/* Chart Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              उत्पादन प्रगति विश्लेषण (Yield Progression Analysis)
            </h3>
            <p className="text-sm text-muted-foreground">
              AI-powered yield tracking with weather correlation • Updated 6h ago
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={showWeatherOverlay ? "default" : "outline"}
              size="sm"
              onClick={() => setShowWeatherOverlay(!showWeatherOverlay)}
              iconName="Cloud"
              iconPosition="left"
            >
              Weather
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={chartView === 'progression' ? "default" : "outline"}
              size="sm"
              onClick={() => setChartView('progression')}
            >
              Progression
            </Button>
            <Button
              variant={chartView === 'comparison' ? "default" : "outline"}
              size="sm"
              onClick={() => setChartView('comparison')}
            >
              Comparison
            </Button>
            <Button
              variant={chartView === 'zones' ? "default" : "outline"}
              size="sm"
              onClick={() => setChartView('zones')}
            >
              Zone Analysis
            </Button>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Actual Yield</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-muted-foreground">AI Prediction</span>
            </div>
            {showWeatherOverlay && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-muted-foreground">Weather Impact</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Chart Content */}
      <div className="p-6">
        {chartView === 'zones' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {zoneData?.map((zone) => (
                <div 
                  key={zone?.zone}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedZone === zone?.zone?.toLowerCase()?.replace(' ', '-') 
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedZone(zone?.zone?.toLowerCase()?.replace(' ', '-'))}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">{zone?.zone}</h4>
                    <span className="text-xs text-muted-foreground">{zone?.area}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current:</span>
                      <span className="text-sm font-medium text-foreground">{zone?.currentYield} q/acre</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Predicted:</span>
                      <span className="text-sm font-medium text-primary">{zone?.predictedYield} q/acre</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Efficiency:</span>
                      <span className="text-sm font-medium text-success">{zone?.efficiency}%</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <Icon name="Leaf" size={12} className="text-primary" />
                        <span className="text-muted-foreground">{zone?.soilHealth}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Droplets" size={12} className="text-primary" />
                        <span className="text-muted-foreground">{zone?.irrigation}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={progressionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="week" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="yield"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  label={{ value: 'Yield (q/acre)', angle: -90, position: 'insideLeft' }}
                />
                {showWeatherOverlay && (
                  <YAxis 
                    yAxisId="weather"
                    orientation="right"
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    label={{ value: 'Rainfall (mm)', angle: 90, position: 'insideRight' }}
                  />
                )}
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                {showWeatherOverlay && (
                  <Bar 
                    yAxisId="weather"
                    dataKey="rainfall" 
                    fill="var(--color-secondary)"
                    opacity={0.3}
                    name="Rainfall (mm)"
                  />
                )}
                
                <Line
                  yAxisId="yield"
                  type="monotone"
                  dataKey="wheat"
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                  name="Wheat Yield"
                />
                <Line
                  yAxisId="yield"
                  type="monotone"
                  dataKey="predicted"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
                  name="AI Prediction"
                />
                
                {chartView === 'comparison' && (
                  <>
                    <Line
                      yAxisId="yield"
                      type="monotone"
                      dataKey="rice"
                      stroke="var(--color-success)"
                      strokeWidth={2}
                      dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 3 }}
                      name="Rice Yield"
                    />
                    <Line
                      yAxisId="yield"
                      type="monotone"
                      dataKey="cotton"
                      stroke="var(--color-warning)"
                      strokeWidth={2}
                      dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 3 }}
                      name="Cotton Yield"
                    />
                  </>
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default YieldProgressionChart;