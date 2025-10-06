import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const SatelliteImageryTimeline = ({ selectedCrops, selectedSeason }) => {
  const [activeView, setActiveView] = useState('ndvi');
  const [selectedDate, setSelectedDate] = useState('2024-09-28');
  const [showAnalysis, setShowAnalysis] = useState(true);

  const timelineData = [
    {
      date: '2024-06-15',
      week: 'Week 1',
      ndviAvg: 0.25,
      thermalStress: 'Low',
      pestDetections: 0,
      cloudCover: 15,
      imageQuality: 'Excellent',
      growthStage: 'Germination'
    },
    {
      date: '2024-07-06',
      week: 'Week 4',
      ndviAvg: 0.45,
      thermalStress: 'Low',
      pestDetections: 2,
      cloudCover: 25,
      imageQuality: 'Good',
      growthStage: 'Tillering'
    },
    {
      date: '2024-08-03',
      week: 'Week 8',
      ndviAvg: 0.72,
      thermalStress: 'Medium',
      pestDetections: 5,
      cloudCover: 10,
      imageQuality: 'Excellent',
      growthStage: 'Stem Extension'
    },
    {
      date: '2024-08-31',
      week: 'Week 12',
      ndviAvg: 0.85,
      thermalStress: 'High',
      pestDetections: 8,
      cloudCover: 5,
      imageQuality: 'Excellent',
      growthStage: 'Flowering'
    },
    {
      date: '2024-09-28',
      week: 'Week 16',
      ndviAvg: 0.78,
      thermalStress: 'Medium',
      pestDetections: 3,
      cloudCover: 20,
      imageQuality: 'Good',
      growthStage: 'Grain Filling'
    },
    {
      date: '2024-10-26',
      week: 'Week 20',
      ndviAvg: 0.65,
      thermalStress: 'Low',
      pestDetections: 1,
      cloudCover: 30,
      imageQuality: 'Fair',
      growthStage: 'Maturity'
    }
  ];

  const analysisData = {
    'ndvi': {
      title: 'NDVI Vegetation Index',
      titleHindi: 'एनडीवीआई वनस्पति सूचकांक',
      description: 'Normalized Difference Vegetation Index showing crop health and biomass',
      currentValue: 0.78,
      trend: 'Declining (Normal for maturity stage)',
      insights: [
        'Peak vegetation achieved in Week 12 (0.85 NDVI)',
        'Current decline indicates normal grain filling process',
        'Zone A showing 12% higher NDVI than farm average',
        'Stress detected in 3.2% of total area'
      ],
      recommendations: [
        'Monitor Zone C for potential irrigation needs',
        'Prepare for harvest in 2-3 weeks based on NDVI decline',
        'Focus pest management on high-stress areas'
      ]
    },
    'thermal': {
      title: 'Thermal Stress Analysis',
      titleHindi: 'तापीय तनाव विश्लेषण',
      description: 'Surface temperature analysis for crop stress detection',
      currentValue: 'Medium',
      trend: 'Improving (Temperature decreasing)',
      insights: [
        'Peak thermal stress recorded during Week 12 flowering',
        'Current stress levels within acceptable range',
        'Evening temperatures showing favorable trend',
        'Irrigation timing optimization reduced stress by 23%'
      ],
      recommendations: [
        'Continue current irrigation schedule',
        'Monitor morning temperature patterns',
        'Consider shade nets for next season peak stress periods'
      ]
    },
    'pest': {
      title: 'Computer Vision Pest Detection',
      titleHindi: 'कंप्यूटर विज़न कीट पहचान',
      description: 'AI-powered pest and disease detection from satellite imagery',
      currentValue: '3 detections',
      trend: 'Decreasing (Effective management)',
      insights: [
        'Peak pest activity detected during Week 12',
        'Aphid populations successfully controlled',
        'Early detection prevented 15% yield loss',
        'Treatment effectiveness: 87% success rate'
      ],
      recommendations: [
        'Continue monitoring for late-season pests',
        'Prepare preventive measures for next season',
        'Document successful treatment protocols'
      ]
    }
  };

  const getNDVIColor = (value) => {
    if (value >= 0.8) return 'bg-success';
    if (value >= 0.6) return 'bg-primary';
    if (value >= 0.4) return 'bg-warning';
    return 'bg-error';
  };

  const getThermalColor = (stress) => {
    switch (stress?.toLowerCase()) {
      case 'low': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'high': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getQualityColor = (quality) => {
    switch (quality?.toLowerCase()) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'fair': return 'text-warning';
      default: return 'text-error';
    }
  };

  const selectedData = timelineData?.find(item => item?.date === selectedDate);
  const currentAnalysis = analysisData?.[activeView];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Satellite" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                उपग्रह इमेजरी विश्लेषण (Satellite Imagery Analysis)
              </h3>
              <p className="text-sm text-muted-foreground">
                Weekly satellite monitoring with AI-powered insights • Sentinel-2 & Landsat
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={showAnalysis ? "default" : "outline"}
              size="sm"
              onClick={() => setShowAnalysis(!showAnalysis)}
              iconName="BarChart3"
              iconPosition="left"
            >
              Analysis
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

        {/* View Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant={activeView === 'ndvi' ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView('ndvi')}
            iconName="Leaf"
            iconPosition="left"
          >
            NDVI
          </Button>
          <Button
            variant={activeView === 'thermal' ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView('thermal')}
            iconName="Thermometer"
            iconPosition="left"
          >
            Thermal
          </Button>
          <Button
            variant={activeView === 'pest' ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView('pest')}
            iconName="Bug"
            iconPosition="left"
          >
            Pest Detection
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Satellite Image Display */}
            <div className="relative">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden border border-border">
                <Image
                  src={`https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=800&h=450&fit=crop&crop=center`}
                  alt={`Satellite imagery for ${selectedData?.week} - ${activeView?.toUpperCase()} analysis`}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Information */}
                <div className="absolute top-4 left-4 bg-popover/90 backdrop-blur-sm border border-border rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Calendar" size={14} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {selectedData?.week} - {selectedData?.date}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Growth Stage:</span>
                      <span className="text-foreground font-medium">{selectedData?.growthStage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cloud Cover:</span>
                      <span className="text-foreground font-medium">{selectedData?.cloudCover}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quality:</span>
                      <span className={`font-medium ${getQualityColor(selectedData?.imageQuality)}`}>
                        {selectedData?.imageQuality}
                      </span>
                    </div>
                  </div>
                </div>

                {/* NDVI Legend */}
                {activeView === 'ndvi' && (
                  <div className="absolute bottom-4 right-4 bg-popover/90 backdrop-blur-sm border border-border rounded-lg p-3">
                    <div className="text-xs font-medium text-foreground mb-2">NDVI Scale</div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-error rounded"></div>
                        <span className="text-xs text-muted-foreground">0.0-0.3 Poor</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-warning rounded"></div>
                        <span className="text-xs text-muted-foreground">0.3-0.6 Fair</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-primary rounded"></div>
                        <span className="text-xs text-muted-foreground">0.6-0.8 Good</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-success rounded"></div>
                        <span className="text-xs text-muted-foreground">0.8+ Excellent</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pest Detection Markers */}
                {activeView === 'pest' && selectedData?.pestDetections > 0 && (
                  <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-error rounded-full border-2 border-white animate-pulse"></div>
                    <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-warning rounded-full border-2 border-white animate-pulse"></div>
                    {selectedData?.pestDetections > 2 && (
                      <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-error rounded-full border-2 border-white animate-pulse"></div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Navigation */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Timeline Navigation</h4>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="RefreshCw" size={14} />
                  <span>Auto-refresh: Weekly</span>
                </div>
              </div>
              
              <div className="grid grid-cols-6 gap-2">
                {timelineData?.map((item) => (
                  <button
                    key={item?.date}
                    onClick={() => setSelectedDate(item?.date)}
                    className={`p-3 border rounded-lg text-left transition-all duration-200 ${
                      selectedDate === item?.date
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-xs font-medium text-foreground mb-1">
                      {item?.week}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {new Date(item.date)?.toLocaleDateString('en-IN', { 
                        day: '2-digit', 
                        month: 'short' 
                      })}
                    </div>
                    
                    {activeView === 'ndvi' && (
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getNDVIColor(item?.ndviAvg)}`}></div>
                        <span className="text-xs font-data">{item?.ndviAvg}</span>
                      </div>
                    )}
                    
                    {activeView === 'thermal' && (
                      <div className={`px-1 py-0.5 rounded text-xs ${getThermalColor(item?.thermalStress)}`}>
                        {item?.thermalStress}
                      </div>
                    )}
                    
                    {activeView === 'pest' && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Bug" size={10} className="text-error" />
                        <span className="text-xs font-data">{item?.pestDetections}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Analysis Panel */}
          {showAnalysis && (
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="BarChart3" size={16} className="text-primary" />
                  <h4 className="font-medium text-foreground">
                    {currentAnalysis?.titleHindi}
                  </h4>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {currentAnalysis?.description}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Current Value:</span>
                    <span className="text-sm font-medium text-foreground">
                      {currentAnalysis?.currentValue}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Trend:</span>
                    <span className="text-sm font-medium text-primary">
                      {currentAnalysis?.trend}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-foreground mb-3">Key Insights</h5>
                <div className="space-y-2">
                  {currentAnalysis?.insights?.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <Icon name="Lightbulb" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-foreground mb-3">Recommendations</h5>
                <div className="space-y-2">
                  {currentAnalysis?.recommendations?.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button variant="outline" size="sm" fullWidth iconName="FileText">
                  Generate Detailed Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SatelliteImageryTimeline;