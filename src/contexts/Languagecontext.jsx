import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Header
    'header.title': 'AgriSage Analytics',
    'header.farmLocation': 'Farm Location',
    'header.operations': 'Operations',
    'header.analytics': 'Analytics', 
    'header.markets': 'Markets',
    'header.environment': 'Environment',
    'header.live': 'Live',
    'header.delayed': 'Delayed',
    'header.offline': 'Offline',
    'header.justNow': 'Just now',
    'header.minutesAgo': '{minutes}m ago',
    'header.hoursAgo': '{hours}h ago',
    
    // Environmental Monitoring
    'env.title': 'Environmental Monitoring',
    'env.description': 'Comprehensive environmental tracking and sustainability analytics for data-driven agricultural decisions',
    'env.exportReport': 'Export Report',
    'env.configureAlerts': 'Configure Alerts',
    'env.farmLocation': 'Farm Location',
    'env.timeRange': 'Time Range',
    'env.dataQuality': 'Data Quality',
    'env.accuracy': '{accuracy}% accuracy',
    'env.liveData': 'Live Data',
    'env.updated': 'Updated {time}',
    'env.complianceStatus': 'Compliance Status',
    'env.viewDetails': 'View Details',
    'env.microclimateAnalysis': 'Microclimate Analysis',
    'env.viewTrends': 'View Trends',
    'env.lowRisk': 'Low Risk',
    'env.mediumRisk': 'Medium Risk', 
    'env.highRisk': 'High Risk',
    
    // Metrics
    'metrics.soilMoisture': 'Soil Moisture',
    'metrics.phBalance': 'pH Balance',
    'metrics.temperature': 'Temperature',
    'metrics.waterQuality': 'Water Quality',
    'metrics.carbonFootprint': 'Carbon Footprint',
    'metrics.pollutionLevel': 'Pollution Level',
    
    // Alerts
    'alerts.title': 'Environmental Alerts',
    'alerts.critical': 'Critical',
    'alerts.warning': 'Warning',
    'alerts.info': 'Info',
    'alerts.checkEquipment': 'Check Equipment',
    'alerts.exportReport': 'Export Report',
    'alerts.configureAlerts': 'Configure Alerts',
    'alerts.immediateAttention': 'Immediate attention required',
    'alerts.irrigationFailure': 'Irrigation System Failure',
    'alerts.weatherAlert': 'Weather Alert',
    'alerts.soilMoistureLow': 'Soil Moisture Low',
    
    // Time ranges
    'time.lastHour': 'Last Hour',
    'time.last24Hours': 'Last 24 Hours',
    'time.last7Days': 'Last 7 Days',
    'time.last30Days': 'Last 30 Days',
    'time.currentSeason': 'Current Season',
    
    // Farms
    'farms.mainFarm': 'Main Farm (250 acres)',
    'farms.northField': 'North Field (180 acres)',
    'farms.organicFarm': 'Organic Farm (120 acres)',
    
    // Locations
    'locations.punjabIndia': 'Punjab, India',
    'locations.haryanaIndia': 'Haryana, India',
    'locations.rajasthanIndia': 'Rajasthan, India',
    'locations.northFieldSector3': 'North Field - Sector 3',
    'locations.mainFarmSector5': 'Main Farm - Sector 5',
    'locations.allFields': 'All Fields',
    
    // Actions & Navigation
    'actions.dismiss': 'Dismiss',
    'actions.expand': 'Expand',
    'actions.collapse': 'Collapse',
    'actions.viewForecast': 'View Forecast',
    'actions.scheduleIrrigation': 'Schedule Irrigation'
  },
  
  hi: {
    // Header
    'header.title': 'कृषि सेज एनालिटिक्स',
    'header.farmLocation': 'खेत स्थान',
    'header.operations': 'संचालन',
    'header.analytics': 'विश्लेषण',
    'header.markets': 'बाज़ार',
    'header.environment': 'पर्यावरण',
    'header.live': 'लाइव',
    'header.delayed': 'विलंबित',
    'header.offline': 'ऑफलाइन',
    'header.justNow': 'अभी',
    'header.minutesAgo': '{minutes} मिनट पहले',
    'header.hoursAgo': '{hours} घंटे पहले',
    
    // Environmental Monitoring
    'env.title': 'पर्यावरण निगरानी',
    'env.description': 'डेटा-आधारित कृषि निर्णयों के लिए व्यापक पर्यावरण ट्रैकिंग और स्थिरता विश्लेषण',
    'env.exportReport': 'रिपोर्ट एक्सपोर्ट करें',
    'env.configureAlerts': 'अलर्ट कॉन्फ़िगर करें',
    'env.farmLocation': 'खेत स्थान',
    'env.timeRange': 'समय सीमा',
    'env.dataQuality': 'डेटा गुणवत्ता',
    'env.accuracy': '{accuracy}% सटीकता',
    'env.liveData': 'लाइव डेटा',
    'env.updated': '{time} अपडेटेड',
    'env.complianceStatus': 'अनुपालन स्थिति',
    'env.viewDetails': 'विवरण देखें',
    'env.microclimateAnalysis': 'माइक्रो क्लाइमेट विश्लेषण',
    'env.viewTrends': 'रुझान देखें',
    'env.lowRisk': 'कम जोखिम',
    'env.mediumRisk': 'मध्यम जोखिम',
    'env.highRisk': 'उच्च जोखिम',
    
    // Metrics
    'metrics.soilMoisture': 'मिट्टी की नमी',
    'metrics.phBalance': 'पीएच संतुलन',
    'metrics.temperature': 'तापमान',
    'metrics.waterQuality': 'जल गुणवत्ता',
    'metrics.carbonFootprint': 'कार्बन फुटप्रिंट',
    'metrics.pollutionLevel': 'प्रदूषण स्तर',
    
    // Alerts
    'alerts.title': 'पर्यावरण चेतावनी',
    'alerts.critical': 'गंभीर',
    'alerts.warning': 'चेतावनी',
    'alerts.info': 'जानकारी',
    'alerts.checkEquipment': 'उपकरण जांचें',
    'alerts.exportReport': 'रिपोर्ट एक्सपोर्ट करें',
    'alerts.configureAlerts': 'अलर्ट कॉन्फ़िगर करें',
    'alerts.immediateAttention': 'तत्काल ध्यान देने की आवश्यकता है',
    'alerts.irrigationFailure': 'सिंचाई सिस्टम की विफलता',
    'alerts.weatherAlert': 'मौसम चेतावनी',
    'alerts.soilMoistureLow': 'मिट्टी की नमी कम',
    
    // Time ranges
    'time.lastHour': 'पिछला घंटा',
    'time.last24Hours': 'पिछले 24 घंटे',
    'time.last7Days': 'पिछले 7 दिन',
    'time.last30Days': 'पिछले 30 दिन',
    'time.currentSeason': 'वर्तमान मौसम',
    
    // Farms
    'farms.mainFarm': 'मुख्य खेत (250 एकड़)',
    'farms.northField': 'उत्तरी खेत (180 एकड़)',
    'farms.organicFarm': 'जैविक खेत (120 एकड़)',
    
    // Locations
    'locations.punjabIndia': 'पंजाब, भारत',
    'locations.haryanaIndia': 'हरियाणा, भारत',
    'locations.rajasthanIndia': 'राजस्थान, भारत',
    'locations.northFieldSector3': 'उत्तरी खेत - सेक्टर 3',
    'locations.mainFarmSector5': 'मुख्य खेत - सेक्टर 5',
    'locations.allFields': 'सभी खेत',
    
    // Actions & Navigation
    'actions.dismiss': 'खारिज करें',
    'actions.expand': 'विस्तार करें',
    'actions.collapse': 'संकुचित करें',
    'actions.viewForecast': 'पूर्वानुमान देखें',
    'actions.scheduleIrrigation': 'सिंचाई शेड्यूल करें'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const translate = (key, params = {}) => {
    let translation = translations?.[language]?.[key] || translations?.['en']?.[key] || key;
    
    // Replace parameters in translation
    Object.keys(params)?.forEach(param => {
      translation = translation?.replace(`{${param}}`, params?.[param]);
    });
    
    return translation;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const value = {
    language,
    setLanguage,
    translate,
    toggleLanguage,
    isHindi: language === 'hi',
    isEnglish: language === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;