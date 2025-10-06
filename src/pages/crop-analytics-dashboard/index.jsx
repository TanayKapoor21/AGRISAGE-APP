import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AlertBanner from '../../components/ui/AlertBanner';
import CropSelector from './components/CropSelector';
import MetricsStrip from './components/MetricsStrip';
import YieldProgressionChart from './components/YieldProgressionChart';
import CropRecommendationPanel from './components/CropRecommendationPanel';
import SatelliteImageryTimeline from './components/SatelliteImageryTimeline';

const CropAnalyticsDashboard = () => {
  const [selectedCrops, setSelectedCrops] = useState(['wheat', 'mustard']);
  const [selectedSeason, setSelectedSeason] = useState('rabi-2024');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API calls for crop analytics data
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
      setLastUpdated(new Date());
    };

    loadData();
  }, [selectedCrops, selectedSeason]);

  useEffect(() => {
    // Auto-refresh data every 6 hours
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 21600000); // 6 hours

    return () => clearInterval(interval);
  }, []);

  const handleCropChange = (crops) => {
    setSelectedCrops(crops);
  };

  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Loading Crop Analytics - AgriSage Analytics</title>
          <meta name="description" content="Loading comprehensive crop analytics dashboard with AI-powered insights" />
        </Helmet>
        
        <Header />
        <AlertBanner />
        
        <main className="pt-16">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="space-y-2">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    Loading Crop Analytics
                  </h2>
                  <p className="text-muted-foreground">
                    Fetching AI predictions and satellite data...
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span>Prioritizing yield predictions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Crop Analytics Dashboard - AgriSage Analytics</title>
        <meta name="description" content="AI-powered crop analytics dashboard with yield predictions, growth monitoring, and satellite imagery analysis for sustainable farming decisions" />
        <meta name="keywords" content="crop analytics, yield prediction, AI farming, satellite imagery, NDVI, agricultural intelligence, farm management" />
        <meta property="og:title" content="Crop Analytics Dashboard - AgriSage Analytics" />
        <meta property="og:description" content="Advanced crop performance analysis with AI-powered insights for optimized agricultural decision-making" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <AlertBanner />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  फसल विश्लेषण डैशबोर्ड
                </h1>
                <p className="text-lg text-muted-foreground">
                  Crop Analytics Dashboard - AI-powered insights for optimal yield management
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-muted-foreground">
                  Last Updated: {lastUpdated?.toLocaleTimeString('en-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </div>
                <div className="text-xs text-muted-foreground font-data">
                  Data refresh: Every 6 hours
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>AI Models Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>Satellite Data Live</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span>Weather Integration Active</span>
              </div>
            </div>
          </div>

          {/* Crop Selection Controls */}
          <div className="mb-8">
            <CropSelector
              selectedCrops={selectedCrops}
              onCropChange={handleCropChange}
              selectedSeason={selectedSeason}
              onSeasonChange={handleSeasonChange}
            />
          </div>

          {/* Key Metrics Strip */}
          <MetricsStrip
            selectedCrops={selectedCrops}
            selectedSeason={selectedSeason}
          />

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">
            {/* Yield Progression Chart - 8 columns equivalent */}
            <div className="xl:col-span-3">
              <YieldProgressionChart
                selectedCrops={selectedCrops}
                selectedSeason={selectedSeason}
              />
            </div>

            {/* Crop Recommendation Panel - 4 columns equivalent */}
            <div className="xl:col-span-1">
              <CropRecommendationPanel
                selectedSeason={selectedSeason}
              />
            </div>
          </div>

          {/* Satellite Imagery Timeline - Full Width */}
          <div className="mb-8">
            <SatelliteImageryTimeline
              selectedCrops={selectedCrops}
              selectedSeason={selectedSeason}
            />
          </div>

          {/* Footer Information */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Data Sources</h4>
                <ul className="space-y-1">
                  <li>• Sentinel-2 & Landsat Satellite Imagery</li>
                  <li>• Indian Meteorological Department</li>
                  <li>• IoT Sensor Network (250+ sensors)</li>
                  <li>• Government Agricultural Statistics</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-2">AI Models</h4>
                <ul className="space-y-1">
                  <li>• Yield Prediction: 94% accuracy</li>
                  <li>• Pest Detection: Computer Vision v2.1</li>
                  <li>• Weather Correlation: Deep Learning</li>
                  <li>• Recommendation Engine: ML v3.2</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Compliance</h4>
                <ul className="space-y-1">
                  <li>• ICAR Agricultural Standards</li>
                  <li>• Government Data Privacy (GDPR)</li>
                  <li>• Organic Certification Ready</li>
                  <li>• Export Quality Documentation</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border/50 text-center">
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} AgriSage Analytics. Empowering sustainable agriculture through AI-driven insights. 
                All crop predictions are estimates based on current data and should be used in conjunction with expert agricultural advice.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CropAnalyticsDashboard;