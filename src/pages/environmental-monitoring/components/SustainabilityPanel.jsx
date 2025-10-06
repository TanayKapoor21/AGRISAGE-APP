import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SustainabilityPanel = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock sustainability data
  const sustainabilityData = {
    carbonFootprint: {
      current: 2.3,
      target: 2.0,
      unit: 'tons CO2',
      trend: -8.5,
      breakdown: [
        { category: 'Fuel Consumption', value: 1.2, percentage: 52 },
        { category: 'Fertilizer Use', value: 0.7, percentage: 30 },
        { category: 'Equipment', value: 0.4, percentage: 18 }
      ]
    },
    waterUsage: {
      current: 1250,
      target: 1100,
      unit: 'liters/hectare',
      trend: 12.3,
      efficiency: 78
    },
    soilHealth: {
      score: 8.2,
      maxScore: 10,
      trend: 5.7,
      factors: [
        { name: 'Organic Matter', score: 8.5, status: 'good' },
        { name: 'pH Balance', score: 7.8, status: 'fair' },
        { name: 'Nutrient Levels', score: 8.7, status: 'excellent' },
        { name: 'Microbial Activity', score: 7.9, status: 'good' }
      ]
    },
    biodiversity: {
      index: 6.8,
      maxIndex: 10,
      trend: 15.2,
      species: {
        beneficial: 24,
        total: 35,
        newSpecies: 3
      }
    },
    carbonCredits: {
      earned: 45,
      potential: 60,
      unit: 'credits',
      value: 2250,
      currency: '₹'
    }
  };

  const recommendations = [
    {
      id: 1,
      category: 'carbon',
      priority: 'high',
      title: 'Reduce Fuel Consumption',
      description: 'Switch to electric equipment for 20% reduction in carbon emissions',
      impact: '0.24 tons CO2 reduction',
      effort: 'Medium',
      timeline: '3 months'
    },
    {
      id: 2,
      category: 'water',
      priority: 'medium',
      title: 'Implement Drip Irrigation',
      description: 'Install drip irrigation in Sector 5 to improve water efficiency',
      impact: '15% water savings',
      effort: 'High',
      timeline: '2 months'
    },
    {
      id: 3,
      category: 'soil',
      priority: 'low',
      title: 'Increase Organic Matter',
      description: 'Add compost to improve soil health and carbon sequestration',
      impact: '0.5 point soil score increase',
      effort: 'Low',
      timeline: '1 month'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'fair': return 'text-warning';
      case 'poor': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Carbon Footprint Card */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Leaf" size={20} className="text-primary" />
            <h3 className="font-medium text-foreground">Carbon Footprint</h3>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingDown" size={14} className="text-success" />
            <span className="text-xs text-success font-data">
              {Math.abs(sustainabilityData?.carbonFootprint?.trend)}%
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-semibold text-foreground">
              {sustainabilityData?.carbonFootprint?.current}
            </span>
            <span className="text-sm text-muted-foreground">
              {sustainabilityData?.carbonFootprint?.unit}
            </span>
            <span className="text-xs text-muted-foreground">
              / target: {sustainabilityData?.carbonFootprint?.target}
            </span>
          </div>
          
          <div className="space-y-2">
            {sustainabilityData?.carbonFootprint?.breakdown?.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item?.category}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-data text-foreground">{item?.value}</span>
                  <span className="text-xs text-muted-foreground">({item?.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Soil Health Card */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Layers" size={20} className="text-primary" />
            <h3 className="font-medium text-foreground">Soil Health</h3>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-xs text-success font-data">
              {sustainabilityData?.soilHealth?.trend}%
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-semibold text-foreground">
              {sustainabilityData?.soilHealth?.score}
            </span>
            <span className="text-sm text-muted-foreground">
              / {sustainabilityData?.soilHealth?.maxScore}
            </span>
          </div>
          
          <div className="space-y-2">
            {sustainabilityData?.soilHealth?.factors?.map((factor, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{factor?.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-data text-foreground">{factor?.score}</span>
                  <span className={`text-xs capitalize ${getStatusColor(factor?.status)}`}>
                    {factor?.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Carbon Credits Card */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={20} className="text-primary" />
            <h3 className="font-medium text-foreground">Carbon Credits</h3>
          </div>
          <Button variant="outline" size="sm">
            Trade Credits
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-lg font-semibold text-foreground">
                {sustainabilityData?.carbonCredits?.earned}
              </div>
              <div className="text-xs text-muted-foreground">Credits Earned</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-success">
                {sustainabilityData?.carbonCredits?.currency}{sustainabilityData?.carbonCredits?.value}
              </div>
              <div className="text-xs text-muted-foreground">Market Value</div>
            </div>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(sustainabilityData?.carbonCredits?.earned / sustainabilityData?.carbonCredits?.potential) * 100}%` 
              }}
            ></div>
          </div>
          <div className="text-xs text-muted-foreground text-center">
            {sustainabilityData?.carbonCredits?.earned} / {sustainabilityData?.carbonCredits?.potential} potential credits
          </div>
        </div>
      </div>
      {/* Sustainability Recommendations */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-foreground">Sustainability Recommendations</h3>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
        
        <div className="space-y-3">
          {recommendations?.map((rec) => (
            <div key={rec?.id} className={`p-3 rounded-lg border ${getPriorityColor(rec?.priority)}`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm text-foreground">{rec?.title}</h4>
                <span className={`px-2 py-1 text-xs rounded-full capitalize ${getPriorityColor(rec?.priority)}`}>
                  {rec?.priority}
                </span>
              </div>
              
              <p className="text-xs text-muted-foreground mb-3">
                {rec?.description}
              </p>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Impact:</span>
                  <div className="font-medium text-foreground">{rec?.impact}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Effort:</span>
                  <div className="font-medium text-foreground">{rec?.effort}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Timeline:</span>
                  <div className="font-medium text-foreground">{rec?.timeline}</div>
                </div>
              </div>
              
              <div className="mt-3 flex space-x-2">
                <Button variant="outline" size="xs">
                  Learn More
                </Button>
                <Button variant="default" size="xs">
                  Implement
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SustainabilityPanel;