import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import AlertBanner from '../../components/ui/AlertBanner';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { useLanguage } from '../../contexts/LanguageContext';
import EnvironmentalMetricsCard from './components/EnvironmentalMetricsCard';
import EnvironmentalMap from './components/EnvironmentalMap';
import EnvironmentalAlerts from './components/EnvironmentalAlerts';
import SustainabilityPanel from './components/SustainabilityPanel';
import EnvironmentalTrends from './components/EnvironmentalTrends';

const EnvironmentalMonitoring = () => {
  const [selectedFarm, setSelectedFarm] = useState('main-farm');
  const [timeRange, setTimeRange] = useState('24h');
  const [dataQuality, setDataQuality] = useState(99.9);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedSensor, setSelectedSensor] = useState(null);
  const { translate } = useLanguage();

  // Mock farms data with translations
  const farms = [
    { 
      value: 'main-farm', 
      label: translate('farms.mainFarm'), 
      location: translate('locations.punjabIndia') 
    },
    { 
      value: 'north-field', 
      label: translate('farms.northField'), 
      location: translate('locations.haryanaIndia') 
    },
    { 
      value: 'organic-farm', 
      label: translate('farms.organicFarm'), 
      location: translate('locations.rajasthanIndia') 
    }
  ];

  // Mock time range options with translations
  const timeRanges = [
    { value: '1h', label: translate('time.lastHour') },
    { value: '24h', label: translate('time.last24Hours') },
    { value: '7d', label: translate('time.last7Days') },
    { value: '30d', label: translate('time.last30Days') },
    { value: 'season', label: translate('time.currentSeason') }
  ];

  // Mock environmental metrics data with translations
  const environmentalMetrics = [
    {
      title: translate('metrics.soilMoisture'),
      value: 65,
      unit: '%',
      status: 'optimal',
      trend: 5.2,
      icon: 'Droplets',
      threshold: { min: 60, max: 80 }
    },
    {
      title: translate('metrics.phBalance'),
      value: 6.8,
      unit: 'pH',
      status: 'optimal',
      trend: -2.1,
      icon: 'Layers',
      threshold: { min: 6.0, max: 7.5 }
    },
    {
      title: translate('metrics.temperature'),
      value: 28,
      unit: '°C',
      status: 'warning',
      trend: 12.5,
      icon: 'Thermometer',
      threshold: { min: 20, max: 35 }
    },
    {
      title: translate('metrics.waterQuality'),
      value: 8.2,
      unit: 'WQI',
      status: 'optimal',
      trend: 3.7,
      icon: 'Waves',
      threshold: { min: 7.0, max: 10.0 }
    },
    {
      title: translate('metrics.carbonFootprint'),
      value: 2.3,
      unit: 'tons CO2',
      status: 'warning',
      trend: -8.5,
      icon: 'Leaf',
      threshold: { min: 0, max: 2.0 }
    },
    {
      title: translate('metrics.pollutionLevel'),
      value: 125,
      unit: 'AQI',
      status: 'critical',
      trend: 18.2,
      icon: 'AlertTriangle',
      threshold: { min: 0, max: 100 }
    }
  ];

  useEffect(() => {
    // Simulate real-time updates every 15 minutes
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // In real app, this would fetch new sensor data
    }, 900000); // 15 minutes

    return () => clearInterval(interval);
  }, []);

  const handleSensorSelect = (sensor) => {
    setSelectedSensor(sensor);
  };

  const handleAlertAction = (alert, action) => {
    console.log(`Environmental alert action: ${action} for ${alert?.id}`);
    // In real app, this would trigger specific environmental actions
  };

  const handleExportData = () => {
    console.log('Exporting environmental compliance report...');
    // In real app, this would generate and download environmental reports
  };

  const formatLastUpdate = (timestamp) => {
    const diff = Math.floor((new Date() - timestamp) / 60000);
    if (diff < 1) return translate('header.justNow');
    if (diff < 60) return translate('header.minutesAgo', { minutes: diff });
    return translate('header.hoursAgo', { hours: Math.floor(diff / 60) });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AlertBanner />
      <main className="pt-16">
        {/* Page Header */}
        <div className="bg-card border-b border-border">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
                  {translate('env.title')}
                </h1>
                <p className="text-muted-foreground">
                  {translate('env.description')}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Download" onClick={handleExportData}>
                  {translate('env.exportReport')}
                </Button>
                <Button variant="default" iconName="Settings">
                  {translate('env.configureAlerts')}
                </Button>
              </div>
            </div>

            {/* Global Controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                label={translate('env.farmLocation')}
                options={farms}
                value={selectedFarm}
                onChange={setSelectedFarm}
                className="w-full"
              />
              
              <Select
                label={translate('env.timeRange')}
                options={timeRanges}
                value={timeRange}
                onChange={setTimeRange}
                className="w-full"
              />
              
              <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg border border-border">
                <Icon name="Database" size={16} className="text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {translate('env.dataQuality')}
                  </div>
                  <div className="text-xs text-success font-data">
                    {translate('env.accuracy', { accuracy: dataQuality })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg border border-border">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {translate('env.liveData')}
                  </div>
                  <div className="text-xs text-muted-foreground font-data">
                    {translate('env.updated', { time: formatLastUpdate(lastUpdate) })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-6">
          {/* Environmental Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            {environmentalMetrics?.map((metric, index) => (
              <EnvironmentalMetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                unit={metric?.unit}
                status={metric?.status}
                trend={metric?.trend}
                icon={metric?.icon}
                threshold={metric?.threshold}
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Environmental Map - Main Content (18 cols equivalent) */}
            <div className="xl:col-span-3 space-y-6">
              <EnvironmentalMap
                selectedFarm={farms?.find(f => f?.value === selectedFarm)?.label || translate('farms.mainFarm')}
                timeRange={timeRange}
                onSensorSelect={handleSensorSelect}
              />
              
              {/* Environmental Trends */}
              <EnvironmentalTrends />
            </div>

            {/* Right Panel (6 cols equivalent) */}
            <div className="xl:col-span-1 space-y-6">
              {/* Environmental Alerts */}
              <EnvironmentalAlerts onAlertAction={handleAlertAction} />
              
              {/* Sustainability Panel */}
              <SustainabilityPanel />
            </div>
          </div>

          {/* Additional Analytics Section */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Government Compliance Tracking */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={20} className="text-primary" />
                  <h3 className="font-medium text-foreground">
                    {translate('env.complianceStatus')}
                  </h3>
                </div>
                <Button variant="ghost" size="sm" iconName="ExternalLink">
                  {translate('env.viewDetails')}
                </Button>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Water Usage Limits', status: 'compliant', value: '85%', limit: '100%' },
                  { name: 'Emission Standards', status: 'warning', value: '105%', limit: '100%' },
                  { name: 'Soil Health Index', status: 'compliant', value: '8.2', limit: '7.0+' },
                  { name: 'Biodiversity Score', status: 'compliant', value: '6.8', limit: '6.0+' }
                ]?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        item?.status === 'compliant' ? 'bg-success' : 'bg-warning'
                      }`}></div>
                      <span className="text-sm text-foreground">{item?.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-data text-foreground">{item?.value}</div>
                      <div className="text-xs text-muted-foreground">of {item?.limit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Microclimate Analysis */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="CloudSun" size={20} className="text-primary" />
                  <h3 className="font-medium text-foreground">
                    {translate('env.microclimateAnalysis')}
                  </h3>
                </div>
                <Button variant="ghost" size="sm" iconName="BarChart3">
                  {translate('env.viewTrends')}
                </Button>
              </div>
              
              <div className="space-y-4">
                {[
                  { zone: 'North Sector', temp: '26°C', humidity: '68%', risk: 'Low' },
                  { zone: 'Central Field', temp: '29°C', humidity: '72%', risk: 'Medium' },
                  { zone: 'South Valley', temp: '32°C', humidity: '65%', risk: 'High' },
                  { zone: 'East Ridge', temp: '24°C', humidity: '75%', risk: 'Low' }
                ]?.map((zone, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium text-foreground text-sm">{zone?.zone}</div>
                      <div className="text-xs text-muted-foreground">
                        {zone?.temp} • {zone?.humidity}
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      zone?.risk === 'Low' ? 'bg-success/10 text-success' :
                      zone?.risk === 'Medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                    }`}>
                      {translate(`env.${zone?.risk?.toLowerCase()}Risk`)} Risk
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnvironmentalMonitoring;