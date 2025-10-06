import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MarketControlPanel = () => {
  const [selectedCommodity, setSelectedCommodity] = useState('wheat');
  const [selectedRegion, setSelectedRegion] = useState('haryana');
  const [priceAlertThreshold, setPriceAlertThreshold] = useState('2200');
  const [forecastConfidence, setForecastConfidence] = useState('80');
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const commodities = [
    { value: 'wheat', label: 'गेहूं', icon: 'Wheat' },
    { value: 'rice', label: 'धान', icon: 'Grain' },
    { value: 'corn', label: 'मक्का', icon: 'Corn' },
    { value: 'mustard', label: 'सरसों', icon: 'Flower' },
    { value: 'cotton', label: 'कपास', icon: 'Cloud' },
    { value: 'sugarcane', label: 'गन्ना', icon: 'TreePine' }
  ];

  const regions = [
    { value: 'haryana', label: 'हरियाणा', markets: 25 },
    { value: 'punjab', label: 'पंजाब', markets: 18 },
    { value: 'rajasthan', label: 'राजस्थान', markets: 22 },
    { value: 'up', label: 'उत्तर प्रदेश', markets: 35 },
    { value: 'mp', label: 'मध्य प्रदेश', markets: 28 }
  ];

  const handleVoiceCommand = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      // Simulate voice activation
      setTimeout(() => setVoiceEnabled(false), 3000);
    }
  };

  const handleQuickAlert = (type) => {
    console.log(`Quick alert set for: ${type}`);
    // In real app, this would set up specific alerts
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">बाजार नियंत्रण पैनल</h2>
          <p className="text-sm text-muted-foreground">फिल्टर और अलर्ट सेटिंग्स</p>
        </div>
        
        {/* Voice Assistant */}
        <div className="flex items-center space-x-2">
          <Button
            variant={voiceEnabled ? "default" : "outline"}
            size="sm"
            onClick={handleVoiceCommand}
            iconName={voiceEnabled ? "MicIcon" : "Mic"}
            iconPosition="left"
            className={voiceEnabled ? "animate-pulse" : ""}
          >
            {voiceEnabled ? "सुन रहा है..." : "आवाज़ सहायक"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Filters */}
        <div className="space-y-6">
          {/* Commodity Selector */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              फसल चुनें
            </label>
            <div className="grid grid-cols-2 gap-2">
              {commodities?.map((commodity) => (
                <button
                  key={commodity?.value}
                  onClick={() => setSelectedCommodity(commodity?.value)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                    selectedCommodity === commodity?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={commodity?.icon} size={18} />
                  <span className="text-sm font-medium">{commodity?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Region Selector */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              क्षेत्र चुनें
            </label>
            <div className="space-y-2">
              {regions?.map((region) => (
                <button
                  key={region?.value}
                  onClick={() => setSelectedRegion(region?.value)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                    selectedRegion === region?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} />
                    <span className="font-medium">{region?.label}</span>
                  </div>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    {region?.markets} मंडियां
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Alerts & Settings */}
        <div className="space-y-6">
          {/* Price Alert Settings */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              मूल्य अलर्ट सेटिंग्स
            </label>
            <div className="space-y-4">
              <Input
                label="न्यूनतम मूल्य अलर्ट (₹/क्विंटल)"
                type="number"
                value={priceAlertThreshold}
                onChange={(e) => setPriceAlertThreshold(e?.target?.value)}
                placeholder="2200"
              />
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Bell" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">मूल्य अलर्ट सक्रिय करें</span>
                </div>
                <button
                  onClick={() => setAlertsEnabled(!alertsEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    alertsEnabled ? 'bg-primary' : 'bg-muted-foreground'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      alertsEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Forecast Settings */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              पूर्वानुमान सेटिंग्स
            </label>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-2">
                  विश्वसनीयता स्तर: {forecastConfidence}%
                </label>
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={forecastConfidence}
                  onChange={(e) => setForecastConfidence(e?.target?.value)}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>60%</span>
                  <span>95%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              त्वरित क्रियाएं
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAlert('price_drop')}
                iconName="TrendingDown"
                iconPosition="left"
              >
                मूल्य गिरावट अलर्ट
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAlert('high_demand')}
                iconName="TrendingUp"
                iconPosition="left"
              >
                उच्च मांग अलर्ट
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAlert('weather')}
                iconName="Cloud"
                iconPosition="left"
              >
                मौसम अलर्ट
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAlert('transport')}
                iconName="Truck"
                iconPosition="left"
              >
                परिवहन अलर्ट
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Current Selection Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">वर्तमान चयन:</span>
          </div>
          
          <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
            <Icon name="Wheat" size={14} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              {commodities?.find(c => c?.value === selectedCommodity)?.label}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 bg-secondary/10 px-3 py-1 rounded-full">
            <Icon name="MapPin" size={14} className="text-secondary" />
            <span className="text-sm font-medium text-secondary">
              {regions?.find(r => r?.value === selectedRegion)?.label}
            </span>
          </div>
          
          {alertsEnabled && (
            <div className="flex items-center space-x-2 bg-success/10 px-3 py-1 rounded-full">
              <Icon name="Bell" size={14} className="text-success" />
              <span className="text-sm font-medium text-success">
                अलर्ट सक्रिय
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketControlPanel;