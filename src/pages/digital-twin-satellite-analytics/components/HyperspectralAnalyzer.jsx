import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, BarChart3, Target, Activity, TrendingUp, Settings, Download, RefreshCw, Zap } from 'lucide-react';

const HyperspectralAnalyzer = ({ 
  config, 
  selectedField, 
  analysisType, 
  onConfigChange 
}) => {
  const [spectralData, setSpectralData] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeView, setActiveView] = useState('spectral');

  const spectralBands = [
    { band: 'Blue', wavelength: '450-495nm', value: 0.12, color: 'bg-blue-500' },
    { band: 'Green', wavelength: '495-570nm', value: 0.18, color: 'bg-green-500' },
    { band: 'Red', wavelength: '620-750nm', value: 0.25, color: 'bg-red-500' },
    { band: 'NIR', wavelength: '750-900nm', value: 0.65, color: 'bg-gray-800' },
    { band: 'SWIR1', wavelength: '1550-1750nm', value: 0.32, color: 'bg-orange-500' },
    { band: 'SWIR2', wavelength: '2080-2350nm', value: 0.28, color: 'bg-yellow-600' }
  ];

  const viewTypes = [
    { id: 'spectral', name: 'स्पेक्ट्रल विश्लेषण', icon: Activity },
    { id: 'classification', name: 'भूमि वर्गीकरण', icon: Target },
    { id: 'indices', name: 'वनस्पति सूचकांक', icon: TrendingUp },
    { id: 'comparison', name: 'तुलनात्मक विश्लेषण', icon: BarChart3 }
  ];

  useEffect(() => {
    if (selectedField && config) {
      generateSpectralData();
      performAnalysis();
    }
  }, [selectedField, config, analysisType]);

  const generateSpectralData = () => {
    // Simulate hyperspectral data generation based on field characteristics
    const data = spectralBands?.map((band, index) => ({
      ...band,
      value: Math.random() * 0.8 + 0.1,
      quality: Math.random() > 0.3 ? 'good' : 'poor',
      timestamp: new Date()?.toISOString()
    }));
    setSpectralData(data);
  };

  const performAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const results = {
      landClassification: {
        wheat: 68.5,
        fallow: 15.2,
        other_crops: 12.8,
        water_bodies: 2.1,
        settlements: 1.4
      },
      vegetationIndices: {
        ndvi: 0.72,
        evi: 0.58,
        savi: 0.65,
        ndwi: 0.42
      },
      soilAnalysis: {
        moisture_content: 34.8,
        organic_matter: 2.4,
        nitrogen_status: 'moderate',
        ph_level: 6.8
      },
      cropHealth: {
        overall_health: 87,
        stress_level: 'low',
        disease_probability: 8,
        pest_risk: 'minimal'
      },
      yieldPrediction: {
        estimated_yield: 4.2,
        confidence: 89,
        factors_affecting: ['soil_moisture', 'weather_pattern', 'nutrient_level']
      }
    };

    setAnalysisResults(results);
    setIsAnalyzing(false);
  };

  const renderSpectralView = () => (
    <div className="space-y-6">
      {/* Spectral Signature Chart */}
      <div className="bg-white p-6 rounded-xl border">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>स्पेक्ट्रल हस्ताक्षर विश्लेषण</span>
        </h4>
        
        <div className="space-y-4">
          {spectralData?.map((band, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className="w-16 text-sm font-medium text-gray-700">{band?.band}</div>
              <div className="flex-1">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{band?.wavelength}</span>
                  <span>{(band?.value * 100)?.toFixed(1)}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${band?.value * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full ${band?.color} rounded-full`}
                  />
                </div>
              </div>
              <div className={`px-2 py-1 text-xs rounded-full ${
                band?.quality === 'good' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {band?.quality === 'good' ? 'उत्तम' : 'सुधार चाहिए'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Band Configuration */}
      <div className="bg-white p-6 rounded-xl border">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>बैंड कॉन्फ़िगरेशन</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              संवेदनशीलता स्तर: {(config?.sensitivity * 100)?.toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={config?.sensitivity}
              onChange={(e) => onConfigChange({ ...config, sensitivity: parseFloat(e?.target?.value) })}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              थ्रेशहोल्ड मान: {(config?.threshold * 100)?.toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={config?.threshold}
              onChange={(e) => onConfigChange({ ...config, threshold: parseFloat(e?.target?.value) })}
              className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderClassificationView = () => (
    <div className="space-y-6">
      {analysisResults && (
        <div className="bg-white p-6 rounded-xl border">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>भूमि उपयोग वर्गीकरण</span>
          </h4>
          
          <div className="space-y-4">
            {Object.entries(analysisResults?.landClassification)?.map(([category, percentage], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h5 className="font-medium text-gray-800 capitalize">
                    {category === 'wheat' ? 'गेहूं की फसल' :
                     category === 'fallow' ? 'परती भूमि' :
                     category === 'other_crops' ? 'अन्य फसलें' :
                     category === 'water_bodies' ? 'जल निकाय' :
                     category === 'settlements' ? 'बस्तियाँ' : category}
                  </h5>
                  <p className="text-sm text-gray-600">{percentage?.toFixed(1)}% क्षेत्र कवरेज</p>
                </div>
                <div className="w-24">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full rounded-full ${
                        category === 'wheat' ? 'bg-yellow-500' :
                        category === 'fallow' ? 'bg-gray-400' :
                        category === 'other_crops' ? 'bg-green-500' :
                        category === 'water_bodies'? 'bg-blue-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderIndicesView = () => (
    <div className="space-y-6">
      {analysisResults && (
        <div className="bg-white p-6 rounded-xl border">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>वनस्पति सूचकांक</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(analysisResults?.vegetationIndices)?.map(([index, value], i) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-800 uppercase">{index}</h5>
                  <span className={`text-lg font-bold ${
                    value > 0.6 ? 'text-green-600' :
                    value > 0.4 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {value?.toFixed(2)}
                  </span>
                </div>
                
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full rounded-full ${
                      value > 0.6 ? 'bg-green-500' :
                      value > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  />
                </div>
                
                <p className="text-xs text-gray-600">
                  {index === 'ndvi' ? 'सामान्यीकृत वनस्पति सूचकांक' :
                   index === 'evi' ? 'उन्नत वनस्पति सूचकांक' :
                   index === 'savi'? 'मिट्टी संशोधित वनस्पति सूचकांक' : 'सामान्यीकृत पानी सूचकांक'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderComparisonView = () => (
    <div className="space-y-6">
      {analysisResults && (
        <>
          {/* Crop Health vs Yield Correlation */}
          <div className="bg-white p-6 rounded-xl border">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">फसल स्वास्थ्य और उत्पादन सहसंबंध</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{analysisResults?.cropHealth?.overall_health}%</div>
                <div className="text-sm text-gray-600">समग्र स्वास्थ्य</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{analysisResults?.yieldPrediction?.estimated_yield}</div>
                <div className="text-sm text-gray-600">अनुमानित उत्पादन (टन/एकड़)</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{analysisResults?.yieldPrediction?.confidence}%</div>
                <div className="text-sm text-gray-600">विश्वसनीयता</div>
              </div>
            </div>
          </div>

          {/* Soil Analysis */}
          <div className="bg-white p-6 rounded-xl border">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">मिट्टी विश्लेषण परिणाम</h4>
            <div className="space-y-3">
              {Object.entries(analysisResults?.soilAnalysis)?.map(([param, value], index) => (
                <div key={param} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {param === 'moisture_content' ? 'नमी सामग्री' :
                     param === 'organic_matter' ? 'जैविक पदार्थ' :
                     param === 'nitrogen_status'? 'नाइट्रोजन स्थिति' : 'pH स्तर'}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {typeof value === 'number' ? `${value}${param?.includes('ph') ? '' : '%'}` : 
                     value === 'moderate' ? 'मध्यम' : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Layers className="h-6 w-6" />
            <div>
              <h2 className="text-xl font-bold">हाइपरस्पेक्ट्रल विश्लेषण प्रणाली</h2>
              <p className="text-sm opacity-90">उन्नत स्पेक्ट्रल डेटा विश्लेषण और भूमि वर्गीकरण</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={performAnalysis}
              disabled={isAnalyzing}
              className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors disabled:opacity-50"
            >
              {isAnalyzing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Zap className="h-4 w-4" />
              )}
              <span className="text-sm">{isAnalyzing ? 'विश्लेषण...' : 'पुन: विश्लेषण'}</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
              <Download className="h-4 w-4" />
              <span className="text-sm">निर्यात</span>
            </button>
          </div>
        </div>
      </div>
      {/* View Navigation */}
      <div className="p-6 border-b bg-gray-50">
        <div className="flex space-x-1 overflow-x-auto">
          {viewTypes?.map((view) => {
            const IconComponent = view?.icon;
            return (
              <button
                key={view?.id}
                onClick={() => setActiveView(view?.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeView === view?.id
                    ? 'bg-purple-100 text-purple-700' :'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{view?.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {isAnalyzing && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">हाइपरस्पेक्ट्रल विश्लेषण प्रगति में...</p>
              <p className="text-sm text-gray-500 mt-2">कृपया धैर्य रखें, यह कुछ समय ले सकता है</p>
            </div>
          </div>
        )}

        {!isAnalyzing && (
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeView === 'spectral' && renderSpectralView()}
            {activeView === 'classification' && renderClassificationView()}
            {activeView === 'indices' && renderIndicesView()}
            {activeView === 'comparison' && renderComparisonView()}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HyperspectralAnalyzer;