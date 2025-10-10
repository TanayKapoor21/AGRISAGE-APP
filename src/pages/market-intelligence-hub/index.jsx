import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import AlterBanner from '../../components/ui/AlterBanner';
import MarketKPICard from './components/MarketKPICard';
import PriceForecastChart from './components/PriceForecastChart';
import MarketNewsFeed from './components/MarketNewsFeed';
import RegionalPricingTable from './components/RegionalPricingTable';
import MarketControlPanel from './components/MarketControlPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MarketIntelligenceHub = () => {
  const [currentLanguage, setCurrentLanguage] = useState('hi');
  const [lastDataUpdate, setLastDataUpdate] = useState(new Date());

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Simulate real-time data updates
    const interval = setInterval(() => {
      setLastDataUpdate(new Date());
    }, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Mock KPI data
  const kpiData = [
    {
      title: "वर्तमान गेहूं मूल्य",
      value: 2250,
      unit: "₹/क्विंटल",
      change: 2.5,
      changeType: "positive",
      icon: "TrendingUp",
      trend: [1, 2, -1, 3, 2, 1, 4],
      confidence: 85
    },
    {
      title: "30-दिन पूर्वानुमान",
      value: 2380,
      unit: "₹/क्विंटल",
      change: 5.8,
      changeType: "positive",
      icon: "Target",
      trend: [2, 3, 2, 4, 3, 5, 4],
      confidence: 78
    },
    {
      title: "मांग पूर्वानुमान",
      value: "उच्च",
      change: 12.3,
      changeType: "positive",
      icon: "TrendingUp",
      trend: [1, 2, 3, 4, 5, 4, 5],
      confidence: 92
    },
    {
      title: "अनुबंध अवसर स्कोर",
      value: 87,
      unit: "/100",
      change: 8.2,
      changeType: "positive",
      icon: "FileText",
      trend: [3, 4, 3, 5, 4, 5, 5],
      confidence: 88
    }
  ];

  const formatLastUpdate = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 60000); // minutes
    if (diff < 1) return 'अभी';
    if (diff < 60) return `${diff} मिनट पहले`;
    return `${Math.floor(diff / 60)} घंटे पहले`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AlterBanner />
      <main className="pt-16">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-primary rounded-lg">
                    <Icon name="TrendingUp" size={24} className="text-primary-foreground" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">
                    बाजार बुद्धिमत्ता केंद्र
                  </h1>
                </div>
                <p className="text-lg text-muted-foreground">
                  AI-संचालित मूल्य पूर्वानुमान और बाजार विश्लेषण डैशबोर्ड
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">
                      लाइव डेटा • अंतिम अपडेट: {formatLastUpdate(lastDataUpdate)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">हरियाणा फोकस</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Download" iconPosition="left">
                  रिपोर्ट डाउनलोड करें
                </Button>
                <Button variant="default" iconName="Bell" iconPosition="left">
                  अलर्ट सेट करें
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Market Control Panel */}
          <div className="mb-8">
            <MarketControlPanel />
          </div>

          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <MarketKPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                unit={kpi?.unit}
                change={kpi?.change}
                changeType={kpi?.changeType}
                icon={kpi?.icon}
                trend={kpi?.trend}
                confidence={kpi?.confidence}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">
            {/* Price Forecast Chart - 12 columns */}
            <div className="xl:col-span-3">
              <PriceForecastChart />
            </div>

            {/* Market News Feed - 4 columns */}
            <div className="xl:col-span-1">
              <MarketNewsFeed />
            </div>
          </div>

          {/* Regional Pricing Table */}
          <div className="mb-8">
            <RegionalPricingTable />
          </div>

          {/* Additional Insights Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Market Volatility Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Icon name="Activity" size={20} className="text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">बाजार अस्थिरता</h3>
                  <p className="text-sm text-muted-foreground">पिछले 30 दिनों का विश्लेषण</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">गेहूं अस्थिरता</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-warning"></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">12.5%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">धान अस्थिरता</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-success"></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">8.3%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">मक्का अस्थिरता</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-error"></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">15.7%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contract Opportunities */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Icon name="Handshake" size={20} className="text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">अनुबंध अवसर</h3>
                  <p className="text-sm text-muted-foreground">उपलब्ध खरीदार अनुबंध</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">ABC एग्रो लिमिटेड</span>
                    <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">
                      उच्च विश्वास
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    गेहूं: ₹2,300/क्विंटल • 500 क्विंटल
                  </div>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">XYZ फूड्स</span>
                    <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">
                      मध्यम विश्वास
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    धान: ₹1,850/क्विंटल • 300 क्विंटल
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4" iconName="Plus">
                सभी अनुबंध देखें
              </Button>
            </div>

            {/* Weather Impact */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="CloudRain" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">मौसम प्रभाव</h3>
                  <p className="text-sm text-muted-foreground">मूल्य पर मौसम का प्रभाव</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Sun" size={16} className="text-warning" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">धूप वाले दिन</div>
                    <div className="text-xs text-muted-foreground">मूल्य में +2.3% वृद्धि</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Icon name="CloudRain" size={16} className="text-primary" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">बारिश के दिन</div>
                    <div className="text-xs text-muted-foreground">मूल्य में -1.8% कमी</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Icon name="Wind" size={16} className="text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">तेज़ हवा</div>
                    <div className="text-xs text-muted-foreground">कोई महत्वपूर्ण प्रभाव नहीं</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">
                  सरकारी प्रमाणित डेटा स्रोत
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">
                  ब्लॉकचेन सुरक्षित
                </span>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} AgriSage Analytics. सभी अधिकार सुरक्षित।
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketIntelligenceHub;