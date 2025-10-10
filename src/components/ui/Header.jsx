import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useLanguage } from '../../contexts/LanguageContext';
import NotificationCenter from './NotificationCentre';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState('Main Farm');
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showFarmDropdown, setShowFarmDropdown] = useState(false);
  const location = useLocation();
  const { translate } = useLanguage();

  const navigationItems = [
    {
      label: translate('header.operations'),
      path: '/farm-operations-overview',
      icon: 'Tractor',
      tooltip: 'Real-time farm monitoring and daily operational control center'
    },
    {
      label: translate('header.analytics'),
      path: '/crop-analytics-dashboard',
      icon: 'BarChart3',
      tooltip: 'Deep-dive crop performance analysis and AI-powered insights'
    },
    {
      label: translate('header.markets'),
      path: '/market-intelligence-hub',
      icon: 'TrendingUp',
      tooltip: 'Price forecasting and market intelligence for strategic decisions'
    },
    {
      label: translate('header.environment'),
      path: '/environmental-monitoring',
      icon: 'Leaf',
      tooltip: 'Sustainability tracking and environmental compliance monitoring'
    }
  ];

  const farms = [
    { 
      id: 1, 
      name: translate('farms.mainFarm'), 
      location: translate('locations.punjabIndia'), 
      area: '250 acres' 
    },
    { 
      id: 2, 
      name: translate('farms.northField'), 
      location: translate('locations.haryanaIndia'), 
      area: '180 acres' 
    },
    { 
      id: 3, 
      name: translate('farms.organicFarm'), 
      location: translate('locations.rajasthanIndia'), 
      area: '120 acres' 
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 900000); // Update every 15 minutes

    return () => clearInterval(interval);
  }, []);

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      // Simulate voice activation
      setTimeout(() => setIsVoiceActive(false), 3000);
    }
  };

  const handleFarmSelect = (farm) => {
    setSelectedFarm(farm?.name);
    setShowFarmDropdown(false);
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const formatLastUpdate = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 60000); // minutes
    if (diff < 1) return translate('header.justNow');
    if (diff < 60) return translate('header.minutesAgo', { minutes: diff });
    return translate('header.hoursAgo', { hours: Math.floor(diff / 60) });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-2">
      <div className="flex items-center h-16 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Sprout" size={24} color="white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-heading font-semibold text-foreground">
              {translate('header.title')}
            </h1>
          </div>
        </div>

        {/* Farm Context Selector */}
        <div className="relative ml-8 hidden md:block">
          <Button
            variant="outline"
            onClick={() => setShowFarmDropdown(!showFarmDropdown)}
            iconName="MapPin"
            iconPosition="left"
            className="min-w-[200px] justify-start"
          >
            <div className="text-left">
              <div className="font-medium">{selectedFarm}</div>
              <div className="text-xs text-muted-foreground">
                {farms?.find(f => f?.name === selectedFarm)?.area}
              </div>
            </div>
            <Icon name="ChevronDown" size={16} className="ml-auto" />
          </Button>

          {showFarmDropdown && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-3 z-50">
              <div className="p-2">
                {farms?.map((farm) => (
                  <button
                    key={farm?.id}
                    onClick={() => handleFarmSelect(farm)}
                    className="w-full p-3 text-left hover:bg-muted rounded-md transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={16} className="text-primary" />
                      <div>
                        <div className="font-medium text-foreground">{farm?.name}</div>
                        <div className="text-sm text-muted-foreground">{farm?.location}</div>
                        <div className="text-xs text-muted-foreground">{farm?.area}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 flex justify-center">
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              return (
                <div key={item?.path} className="relative group">
                  <a
                    href={item?.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-elevation-1'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span className="font-medium">{item?.label}</span>
                  </a>
                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-popover border border-border rounded-md shadow-elevation-2 text-sm text-popover-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-150 pointer-events-none whitespace-nowrap z-50">
                    {item?.tooltip}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-popover border-l border-t border-border rotate-45"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button variant="ghost" iconName="Menu" size="icon" />
          </div>
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-3">
          {/* Language Toggle */}
          <LanguageToggle />

          {/* Notification Center */}
          <NotificationCenter />

          {/* Voice Assistant Toggle */}
          <div className="relative">
            <Button
              variant={isVoiceActive ? "default" : "ghost"}
              size="icon"
              onClick={handleVoiceToggle}
              className={isVoiceActive ? "bg-primary text-primary-foreground" : ""}
            >
              <Icon 
                name={isVoiceActive ? "MicIcon" : "Mic"} 
                size={18}
                className={isVoiceActive ? "animate-pulse" : ""}
              />
            </Button>
            
            {isVoiceActive && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Real-time Data Status */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-success animate-pulse-slow' : 
              connectionStatus === 'warning' ? 'bg-warning' : 'bg-error'
            }`}></div>
            <div className="text-sm">
              <div className={`font-medium ${getConnectionStatusColor()}`}>
                {connectionStatus === 'connected' ? translate('header.live') : 
                 connectionStatus === 'warning' ? translate('header.delayed') : translate('header.offline')}
              </div>
              <div className="text-xs text-muted-foreground font-data">
                {formatLastUpdate(lastUpdate)}
              </div>
            </div>
          </div>

          {/* User Menu */}
          <Button variant="ghost" size="icon">
            <Icon name="User" size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;