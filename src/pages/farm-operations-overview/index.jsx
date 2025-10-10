import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import AlterBanner from '../../components/ui/AlterBanner';
import KPICard from './components/KPICard';
import FieldMap from './components/FieldMap';
import AlertFeed from './components/AlertFeed';
import PerformanceGrid from './components/PerformanceGrid';
import VoiceAssistant from './components/VoiceAssistant';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FarmOperationsOverview = () => {
  const [selectedFarm, setSelectedFarm] = useState('मुख्य खेत');
  const [seasonalView, setSeasonalView] = useState('रबी');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState('connected');

  // Mock KPI data
  const kpiData = [
    {
      title: 'मिट्टी स्वास्थ्य स्कोर',
      value: '76',
      unit: '%',
      status: 'good',
      trend: 5.2,
      icon: 'Layers',
      description: 'औसत pH 6.8, पोषक तत्व संतुलित'
    },
    {
      title: 'उत्पादन पूर्वानुमान',
      value: '28.5',
      unit: 'क्विंटल/बीघा',
      status: 'excellent',
      trend: 8.1,
      icon: 'TrendingUp',
      description: 'लक्ष्य से 12% अधिक अनुमानित उत्पादन'
    },
    {
      title: 'मौसम चेतावनी',
      value: '2',
      unit: 'सक्रिय',
      status: 'warning',
      trend: -15.3,
      icon: 'CloudRain',
      description: 'भारी बारिश की संभावना अगले 6 घंटों में'
    },
    {
      title: 'पानी की गुणवत्ता',
      value: '8.2',
      unit: '/10',
      status: 'excellent',
      trend: 3.7,
      icon: 'Droplets',
      description: 'सभी पैरामीटर सामान्य सीमा में'
    },
    {
      title: 'उपकरण स्थिति',
      value: '94',
      unit: '%',
      status: 'excellent',
      trend: 2.1,
      icon: 'Settings',
      description: '1 पंप रखरखाव की आवश्यकता'
    },
    {
      title: 'दैनिक लागत',
      value: '₹12,450',
      unit: '',
      status: 'good',
      trend: -8.5,
      icon: 'IndianRupee',
      description: 'बजट से 8% कम खर्च'
    }
  ];

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
        // Simulate connection status changes
        const statuses = ['connected', 'warning', 'error'];
        const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
        setConnectionStatus(randomStatus);
      }, 900000); // 15 minutes

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const formatLastUpdate = (date) => {
    return date?.toLocaleTimeString('hi-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'लाइव डेटा';
      case 'warning': return 'विलंबित डेटा';
      case 'error': return 'ऑफलाइन';
      default: return 'अज्ञात';
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AlterBanner />
      <main className="pt-16">
        {/* Top Controls Bar */}
        <div className="sticky top-16 z-30 bg-card border-b border-border shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Farm & Season Selector */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className="text-primary" />
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">
                      खेत संचालन अवलोकन
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {selectedFarm} • {seasonalView} सीजन 2024-25
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={seasonalView === 'रबी' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSeasonalView('रबी')}
                  >
                    रबी
                  </Button>
                  <Button
                    variant={seasonalView === 'खरीफ' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSeasonalView('खरीफ')}
                  >
                    खरीफ
                  </Button>
                  <Button
                    variant={seasonalView === 'जायद' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSeasonalView('जायद')}
                  >
                    जायद
                  </Button>
                </div>
              </div>

              {/* Status & Controls */}
              <div className="flex items-center space-x-4">
                {/* Connection Status */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    connectionStatus === 'connected' ? 'bg-success animate-pulse' : 
                    connectionStatus === 'warning' ? 'bg-warning' : 'bg-error'
                  }`}></div>
                  <div className="text-sm">
                    <div className={`font-medium ${getConnectionStatusColor()}`}>
                      {getConnectionStatusText()}
                    </div>
                    <div className="text-xs text-muted-foreground font-data">
                      {formatLastUpdate(lastUpdate)}
                    </div>
                  </div>
                </div>

                {/* Auto Refresh Toggle */}
                <Button
                  variant={autoRefresh ? 'default' : 'outline'}
                  size="sm"
                  iconName="RefreshCw"
                  onClick={() => setAutoRefresh(!autoRefresh)}
                >
                  ऑटो रिफ्रेश
                </Button>

                {/* Manual Refresh */}
                <Button variant="outline" size="sm" iconName="RotateCcw">
                  रिफ्रेश करें
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                unit={kpi?.unit}
                status={kpi?.status}
                trend={kpi?.trend}
                icon={kpi?.icon}
                description={kpi?.description}
                onClick={() => console.log(`KPI clicked: ${kpi?.title}`)}
              />
            ))}
          </div>

          {/* Main Dashboard Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Field Map - Takes 3 columns on xl screens */}
            <div className="xl:col-span-3">
              <FieldMap />
            </div>

            {/* Right Sidebar - Takes 1 column on xl screens */}
            <div className="space-y-6">
              <AlertFeed />
              <VoiceAssistant />
            </div>
          </div>

          {/* Performance Data Grid */}
          <div className="mt-6">
            <PerformanceGrid />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmOperationsOverview;