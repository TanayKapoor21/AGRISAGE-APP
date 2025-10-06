import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PriceForecastChart = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('3M');
  const [showVolume, setShowVolume] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState('wheat');

  const timeframes = [
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1Y', value: '1Y' }
  ];

  const crops = [
    { label: 'गेहूं', value: 'wheat' },
    { label: 'धान', value: 'rice' },
    { label: 'मक्का', value: 'corn' },
    { label: 'सरसों', value: 'mustard' }
  ];

  // Mock data for price forecasting
  const priceData = [
    {
      date: '01/10',
      historical: 2150,
      forecast: null,
      confidence_high: null,
      confidence_low: null,
      volume: 1200,
      actual: 2150
    },
    {
      date: '08/10',
      historical: 2180,
      forecast: null,
      confidence_high: null,
      confidence_low: null,
      volume: 1350,
      actual: 2180
    },
    {
      date: '15/10',
      historical: 2200,
      forecast: null,
      confidence_high: null,
      confidence_low: null,
      volume: 1100,
      actual: 2200
    },
    {
      date: '22/10',
      historical: 2175,
      forecast: null,
      confidence_high: null,
      confidence_low: null,
      volume: 1400,
      actual: 2175
    },
    {
      date: '29/10',
      historical: 2190,
      forecast: 2190,
      confidence_high: 2210,
      confidence_low: 2170,
      volume: 1250,
      actual: null
    },
    {
      date: '05/11',
      historical: null,
      forecast: 2220,
      confidence_high: 2250,
      confidence_low: 2190,
      volume: 1300,
      actual: null
    },
    {
      date: '12/11',
      historical: null,
      forecast: 2240,
      confidence_high: 2280,
      confidence_low: 2200,
      volume: 1350,
      actual: null
    },
    {
      date: '19/11',
      historical: null,
      forecast: 2260,
      confidence_high: 2310,
      confidence_low: 2210,
      volume: 1400,
      actual: null
    },
    {
      date: '26/11',
      historical: null,
      forecast: 2280,
      confidence_high: 2340,
      confidence_low: 2220,
      volume: 1450,
      actual: null
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{`दिनांक: ${label}`}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-foreground">
                ₹{entry?.value?.toLocaleString('hi-IN')}/क्विंटल
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Chart Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            मूल्य पूर्वानुमान चार्ट
          </h2>
          <p className="text-sm text-muted-foreground">
            AI-आधारित मूल्य भविष्यवाणी और बाजार रुझान विश्लेषण
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Crop Selector */}
          <div className="flex items-center space-x-2">
            <Icon name="Wheat" size={16} className="text-muted-foreground" />
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e?.target?.value)}
              className="bg-background border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {crops?.map((crop) => (
                <option key={crop?.value} value={crop?.value}>
                  {crop?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            {timeframes?.map((timeframe) => (
              <button
                key={timeframe?.value}
                onClick={() => setSelectedTimeframe(timeframe?.value)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                  selectedTimeframe === timeframe?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {timeframe?.label}
              </button>
            ))}
          </div>

          {/* Volume Toggle */}
          <Button
            variant={showVolume ? "default" : "outline"}
            size="sm"
            onClick={() => setShowVolume(!showVolume)}
            iconName="BarChart3"
            iconPosition="left"
          >
            वॉल्यूम
          </Button>
        </div>
      </div>
      {/* Chart */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={priceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="price"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `₹${value}`}
            />
            {showVolume && (
              <YAxis 
                yAxisId="volume"
                orientation="right"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Historical Price Line */}
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="historical"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              name="ऐतिहासिक मूल्य"
              connectNulls={false}
            />
            
            {/* Forecast Line */}
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="forecast"
              stroke="var(--color-accent)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
              name="पूर्वानुमान"
              connectNulls={false}
            />
            
            {/* Confidence Interval */}
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="confidence_high"
              stroke="var(--color-warning)"
              strokeWidth={1}
              dot={false}
              name="उच्च विश्वास"
              connectNulls={false}
            />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="confidence_low"
              stroke="var(--color-warning)"
              strokeWidth={1}
              dot={false}
              name="निम्न विश्वास"
              connectNulls={false}
            />
            
            {/* Volume Bars */}
            {showVolume && (
              <Bar
                yAxisId="volume"
                dataKey="volume"
                fill="var(--color-muted)"
                opacity={0.3}
                name="वॉल्यूम (क्विंटल)"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      {/* Chart Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-0.5 bg-primary"></div>
          <span className="text-sm text-muted-foreground">ऐतिहासिक डेटा</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-0.5 bg-accent border-dashed border-t-2"></div>
          <span className="text-sm text-muted-foreground">AI पूर्वानुमान</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-0.5 bg-warning"></div>
          <span className="text-sm text-muted-foreground">विश्वास अंतराल</span>
        </div>
        {showVolume && (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-muted opacity-30"></div>
            <span className="text-sm text-muted-foreground">व्यापार वॉल्यूम</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceForecastChart;