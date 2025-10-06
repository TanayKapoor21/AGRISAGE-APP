import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MarketNewsFeed = () => {
  const [activeTab, setActiveTab] = useState('news');

  const tabs = [
    { id: 'news', label: 'बाजार समाचार', icon: 'Newspaper' },
    { id: 'schemes', label: 'सरकारी योजनाएं', icon: 'FileText' },
    { id: 'blockchain', label: 'ब्लॉकचेन लॉग', icon: 'Link' }
  ];

  const newsItems = [
    {
      id: 1,
      title: "गेहूं की कीमतों में 5% की वृद्धि",
      summary: "हरियाणा मंडियों में गेहूं की कीमतें बढ़ने से किसानों को फायदा हो रहा है।",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      source: "कृषि मंत्रालय",
      priority: "high",
      category: "मूल्य अपडेट"
    },
    {
      id: 2,
      title: "नई फसल बीमा योजना की घोषणा",
      summary: "प्रधानमंत्री फसल बीमा योजना में नए बदलाव किए गए हैं।",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      source: "बीमा कंपनी",
      priority: "medium",
      category: "योजना अपडेट"
    },
    {
      id: 3,
      title: "मानसून पूर्वानुमान अपडेट",
      summary: "अगले सप्ताह भारी बारिश की संभावना, फसल सुरक्षा के उपाय करें।",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      source: "मौसम विभाग",
      priority: "high",
      category: "मौसम चेतावनी"
    }
  ];

  const schemeItems = [
    {
      id: 1,
      title: "PM-KISAN योजना की नई किस्त",
      description: "₹2,000 की नई किस्त 15 नवंबर को जारी होगी।",
      deadline: "2024-11-15",
      status: "active",
      beneficiaries: "12,50,000"
    },
    {
      id: 2,
      title: "कृषि यंत्र सब्सिडी योजना",
      description: "ट्रैक्टर और अन्य कृषि उपकरणों पर 50% तक सब्सिडी।",
      deadline: "2024-12-31",
      status: "active",
      beneficiaries: "85,000"
    },
    {
      id: 3,
      title: "जैविक खेती प्रोत्साहन योजना",
      description: "जैविक खेती अपनाने वाले किसानों को अतिरिक्त सहायता।",
      deadline: "2024-11-30",
      status: "ending_soon",
      beneficiaries: "45,000"
    }
  ];

  const blockchainLogs = [
    {
      id: 1,
      transaction: "बीज खरीद सत्यापन",
      hash: "0x1a2b3c4d5e6f...",
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      status: "verified",
      amount: "₹25,000",
      parties: ["किसान राज कुमार", "बीज कंपनी ABC"]
    },
    {
      id: 2,
      transaction: "फसल बिक्री अनुबंध",
      hash: "0x2b3c4d5e6f7a...",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      status: "pending",
      amount: "₹1,50,000",
      parties: ["किसान सुरेश सिंह", "खरीदार XYZ कंपनी"]
    },
    {
      id: 3,
      transaction: "गुणवत्ता प्रमाणपत्र",
      hash: "0x3c4d5e6f7a8b...",
      timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
      status: "verified",
      amount: "₹75,000",
      parties: ["प्रमाणन एजेंसी", "किसान महेश यादव"]
    }
  ];

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 60000); // minutes
    if (diff < 1) return 'अभी';
    if (diff < 60) return `${diff} मिनट पहले`;
    return `${Math.floor(diff / 60)} घंटे पहले`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success';
      case 'pending': return 'text-warning';
      case 'active': return 'text-success';
      case 'ending_soon': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const renderNewsContent = () => (
    <div className="space-y-4">
      {newsItems?.map((item) => (
        <div key={item?.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(item?.priority)?.replace('text-', 'bg-')}`}></div>
              <span className="text-xs font-medium text-muted-foreground">{item?.category}</span>
            </div>
            <span className="text-xs text-muted-foreground">{formatTimestamp(item?.timestamp)}</span>
          </div>
          
          <h4 className="font-medium text-foreground mb-2">{item?.title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{item?.summary}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">स्रोत: {item?.source}</span>
            <Button variant="ghost" size="sm" iconName="ExternalLink">
              विस्तार से पढ़ें
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSchemesContent = () => (
    <div className="space-y-4">
      {schemeItems?.map((item) => (
        <div key={item?.id} className="p-4 border border-border rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-foreground">{item?.title}</h4>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              item?.status === 'active' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
            }`}>
              {item?.status === 'active' ? 'सक्रिय' : 'जल्दी समाप्त'}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">{item?.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">अंतिम तिथि:</span>
              <span className="ml-2 font-medium text-foreground">
                {new Date(item.deadline)?.toLocaleDateString('hi-IN')}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">लाभार्थी:</span>
              <span className="ml-2 font-medium text-foreground">{item?.beneficiaries}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border">
            <Button variant="outline" size="sm" iconName="FileText" className="w-full">
              आवेदन करें
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBlockchainContent = () => (
    <div className="space-y-4">
      {blockchainLogs?.map((item) => (
        <div key={item?.id} className="p-4 border border-border rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-foreground">{item?.transaction}</h4>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              item?.status === 'verified' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
            }`}>
              {item?.status === 'verified' ? 'सत्यापित' : 'लंबित'}
            </span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Hash" size={14} className="text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground">{item?.hash}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">राशि:</span>
              <span className="font-medium text-foreground">{item?.amount}</span>
            </div>
            
            <div className="space-y-1">
              <span className="text-muted-foreground">पक्षकार:</span>
              {item?.parties?.map((party, index) => (
                <div key={index} className="flex items-center space-x-2 ml-4">
                  <Icon name="User" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-foreground">{party}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground">{formatTimestamp(item?.timestamp)}</span>
              <Button variant="ghost" size="sm" iconName="Eye">
                विवरण देखें
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">लाइव अपडेट्स</h3>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex-1 justify-center ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {activeTab === 'news' && renderNewsContent()}
        {activeTab === 'schemes' && renderSchemesContent()}
        {activeTab === 'blockchain' && renderBlockchainContent()}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">लाइव अपडेट्स</span>
          </div>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            रीफ्रेश करें
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketNewsFeed;