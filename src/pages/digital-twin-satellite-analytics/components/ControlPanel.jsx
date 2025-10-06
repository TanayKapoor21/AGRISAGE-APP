import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Settings, Play, Sliders, Target, Activity, TrendingUp, BarChart3, RefreshCw } from 'lucide-react';

const ControlPanel = ({
  dateRange,
  onDateRangeChange,
  hyperspectralConfig,
  onHyperspectralConfigChange,
  analysisType,
  onAnalysisTypeChange,
  onAnalysisStart,
  processingStatus
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const analysisTypes = [
    { id: 'soil-quality', name: 'मिट्टी गुणवत्ता', icon: Target, color: 'orange' },
    { id: 'crop-health', name: 'फसल स्वास्थ्य', icon: Activity, color: 'green' },
    { id: 'yield-estimation', name: 'उत्पादन अनुमान', icon: TrendingUp, color: 'blue' },
    { id: 'comprehensive', name: 'व्यापक विश्लेषण', icon: BarChart3, color: 'purple' }
  ];

  const bandConfigurations = [
    { id: 'rgb', name: 'RGB', description: 'प्राकृतिक रंग' },
    { id: 'nir', name: 'NIR', description: 'निकट अवरक्त' },
    { id: 'swir', name: 'SWIR', description: 'लघु तरंग अवरक्त' },
    { id: 'multispectral', name: 'Multispectral', description: 'बहु-स्पेक्ट्रल' }
  ];

  const handleDateChange = (field, value) => {
    onDateRangeChange({
      ...dateRange,
      [field]: value
    });
  };

  const handleConfigChange = (field, value) => {
    onHyperspectralConfigChange({
      ...hyperspectralConfig,
      [field]: value
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Main Control Bar */}
      <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Date Range Selector */}
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5" />
              <div className="space-x-2">
                <input
                  type="date"
                  value={dateRange?.startDate}
                  onChange={(e) => handleDateChange('startDate', e?.target?.value)}
                  className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-sm text-white placeholder-white/70"
                  placeholder="प्रारंभ तिथि"
                />
                <span className="text-white/70">to</span>
                <input
                  type="date"
                  value={dateRange?.endDate}
                  onChange={(e) => handleDateChange('endDate', e?.target?.value)}
                  className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-sm text-white placeholder-white/70"
                  placeholder="समाप्ति तिथि"
                />
              </div>
            </div>

            {/* Analysis Type Toggle */}
            <div className="flex items-center space-x-2">
              {analysisTypes?.map((type) => {
                const IconComponent = type?.icon;
                return (
                  <button
                    key={type?.id}
                    onClick={() => onAnalysisTypeChange(type?.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      analysisType === type?.id
                        ? 'bg-white text-blue-700' :'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline">{type?.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Advanced Settings Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span className="text-sm">उन्नत</span>
            </button>

            {/* Analysis Start Button */}
            <button
              onClick={onAnalysisStart}
              disabled={processingStatus === 'processing'}
              className="flex items-center space-x-2 bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processingStatus === 'processing' ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span className="text-sm">
                {processingStatus === 'processing' ? 'विश्लेषण में...' : 'विश्लेषण प्रारंभ'}
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Advanced Configuration Panel */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6 bg-gray-50 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hyperspectral Band Configuration */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <Sliders className="h-4 w-4" />
                <span>हाइपरस्पेक्ट्रल बैंड कॉन्फ़िगरेशन</span>
              </h4>
              <div className="space-y-2">
                {bandConfigurations?.map((band) => (
                  <label key={band?.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="bandConfig"
                      value={band?.id}
                      checked={hyperspectralConfig?.bandConfig === band?.id}
                      onChange={(e) => handleConfigChange('bandConfig', e?.target?.value)}
                      className="text-blue-600"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-800">{band?.name}</span>
                      <p className="text-xs text-gray-600">{band?.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Sensitivity Settings */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-3">संवेदनशीलता सेटिंग्स</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    संवेदनशीलता ({hyperspectralConfig?.sensitivity})
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={hyperspectralConfig?.sensitivity}
                    onChange={(e) => handleConfigChange('sensitivity', parseFloat(e?.target?.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    थ्रेशहोल्ड ({hyperspectralConfig?.threshold})
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={hyperspectralConfig?.threshold}
                    onChange={(e) => handleConfigChange('threshold', parseFloat(e?.target?.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Processing Options */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-3">प्रसंस्करण विकल्प</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="text-blue-600" />
                  <span className="text-sm text-gray-700">Google Earth Engine</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="text-blue-600" />
                  <span className="text-sm text-gray-700">Alpha Earth Integration</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="text-blue-600" />
                  <span className="text-sm text-gray-700">Cloud Masking</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="text-blue-600" />
                  <span className="text-sm text-gray-700">Real-time Processing</span>
                </label>
              </div>
            </div>
          </div>

          {/* Processing Status Info */}
          <div className="mt-6 p-4 bg-white rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-sm font-semibold text-gray-800">प्रसंस्करण स्थिति</h5>
                <p className="text-xs text-gray-600 mt-1">
                  {processingStatus === 'idle' && 'तैयार - विश्लेषण प्रारंभ करने के लिए तैयार'}
                  {processingStatus === 'processing' && 'Google Earth Engine से डेटा प्रोसेसिंग...'}
                  {processingStatus === 'completed' && 'विश्लेषण सफलतापूर्वक पूर्ण'}
                  {processingStatus === 'analyzing' && 'चयनित क्षेत्र का विश्लेषण...'}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  processingStatus === 'processing' || processingStatus === 'analyzing' ? 'bg-yellow-500 animate-pulse' :
                  processingStatus === 'completed' ? 'bg-green-500' : 'bg-gray-400'
                }`} />
                <span className="text-xs text-gray-500">
                  {processingStatus === 'processing' || processingStatus === 'analyzing' ? 'सक्रिय' :
                   processingStatus === 'completed' ? 'पूर्ण' : 'निष्क्रिय'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ControlPanel;