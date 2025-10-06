import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Satellite, Map, BarChart3, Languages, Download, RefreshCw } from 'lucide-react';
import SatelliteImageryPanel from './components/SatelliteImageryPanel';
import HyperspectralAnalyzer from './components/HyperspectralAnalyzer';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ControlPanel from './components/ControlPanel';
import EnglishTranslator from './components/EnglishTranslator';
import ProcessingIndicator from './components/ProcessingIndicator';

const DigitalTwinSatelliteAnalytics = () => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  });
  
  const [hyperspectralConfig, setHyperspectralConfig] = useState({
    bandConfig: 'rgb',
    sensitivity: 0.8,
    threshold: 0.6
  });
  
  const [analysisType, setAnalysisType] = useState('soil-quality');
  const [processingStatus, setProcessingStatus] = useState('idle');
  const [selectedField, setSelectedField] = useState(null);
  const [realTimeData, setRealTimeData] = useState(null);
  const [isTranslatorVisible, setIsTranslatorVisible] = useState(false);

  // Simulate real-time processing updates
  useEffect(() => {
    if (processingStatus === 'processing') {
      const timer = setTimeout(() => {
        setProcessingStatus('completed');
        // Simulate data update
        setRealTimeData({
          timestamp: new Date()?.toISOString(),
          status: 'success',
          coverage: 95.2,
          accuracy: 87.5
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [processingStatus]);

  const handleAnalysisStart = () => {
    setProcessingStatus('processing');
    setRealTimeData(null);
  };

  const handleFieldSelection = (fieldData) => {
    setSelectedField(fieldData);
    setProcessingStatus('analyzing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 p-4">
      {/* Header with English Translator */}
      <div className="relative mb-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Satellite className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">डिजिटल ट्विन सैटेलाइट एनालिटिक्स</h1>
                <p className="text-gray-600">करनाल गेहूं क्षेत्र उपग्रह विश्लेषण प्रणाली</p>
              </div>
            </div>
            
            {/* English Translator Widget */}
            <div className="relative">
              <button
                onClick={() => setIsTranslatorVisible(!isTranslatorVisible)}
                className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Languages className="h-4 w-4" />
                <span className="text-sm font-medium">EN</span>
              </button>
              
              {isTranslatorVisible && (
                <EnglishTranslator onClose={() => setIsTranslatorVisible(false)} />
              )}
            </div>
          </div>
        </motion.div>
      </div>
      {/* Control Panel */}
      <ControlPanel
        dateRange={selectedDateRange}
        onDateRangeChange={setSelectedDateRange}
        hyperspectralConfig={hyperspectralConfig}
        onHyperspectralConfigChange={setHyperspectralConfig}
        analysisType={analysisType}
        onAnalysisTypeChange={setAnalysisType}
        onAnalysisStart={handleAnalysisStart}
        processingStatus={processingStatus}
      />
      {/* Processing Indicator */}
      {processingStatus !== 'idle' && (
        <ProcessingIndicator 
          status={processingStatus}
          realTimeData={realTimeData}
        />
      )}
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-20 gap-6 mt-6">
        {/* Left Panel - Satellite Imagery (12 cols on desktop) */}
        <div className="xl:col-span-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden h-[600px]"
          >
            <div className="p-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Map className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">उपग्रह चित्रण एवं हाइपरस्पेक्ट्रल विश्लेषण</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">करनाल क्षेत्र</span>
                  <button className="p-1 hover:bg-white/20 rounded">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <SatelliteImageryPanel
              dateRange={selectedDateRange}
              hyperspectralConfig={hyperspectralConfig}
              analysisType={analysisType}
              onFieldSelection={handleFieldSelection}
              selectedField={selectedField}
            />
          </motion.div>
        </div>

        {/* Right Panel - Analytics Dashboard (8 cols on desktop) */}
        <div className="xl:col-span-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl h-[600px] overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">व्यापक विश्लेषण डैशबोर्ड</h2>
                </div>
                <button className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition-colors">
                  <Download className="h-4 w-4" />
                  <span className="text-xs">रिपोर्ट</span>
                </button>
              </div>
            </div>
            
            <AnalyticsDashboard
              selectedField={selectedField}
              analysisType={analysisType}
              processingStatus={processingStatus}
              realTimeData={realTimeData}
            />
          </motion.div>
        </div>
      </div>
      {/* Hyperspectral Analysis Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <HyperspectralAnalyzer
          config={hyperspectralConfig}
          selectedField={selectedField}
          analysisType={analysisType}
          onConfigChange={setHyperspectralConfig}
        />
      </motion.div>
    </div>
  );
};

export default DigitalTwinSatelliteAnalytics;