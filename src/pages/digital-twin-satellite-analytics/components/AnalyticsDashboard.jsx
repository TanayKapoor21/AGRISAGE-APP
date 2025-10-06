import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Droplets, Bug, Wheat, Activity, CheckCircle, Target } from 'lucide-react';

const AnalyticsDashboard = ({ 
  selectedField, 
  analysisType, 
  processingStatus, 
  realTimeData 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [yieldPrediction, setYieldPrediction] = useState(null);

  const tabs = [
    { id: 'overview', name: 'ओवरव्यू', icon: BarChart3 },
    { id: 'yield', name: 'उत्पादन', icon: Wheat },
    { id: 'health', name: 'स्वास्थ्य', icon: Activity },
    { id: 'soil', name: 'मिट्टी', icon: Target }
  ];

  useEffect(() => {
    if (selectedField) {
      generateAnalyticsData();
      generateYieldPrediction();
    }
  }, [selectedField, analysisType]);

  const generateAnalyticsData = () => {
    const data = {
      soilQuality: {
        good: 65,
        moderate: 25,
        poor: 10,
        ph: 6.8,
        organicMatter: 2.4,
        nitrogen: 78,
        phosphorus: 45,
        potassium: 89
      },
      cropHealth: {
        excellent: 45,
        good: 35,
        fair: 15,
        poor: 5,
        ndvi: 0.72,
        lai: 4.2,
        chlorophyll: 45.6
      },
      pestDisease: {
        detected: 12,
        severity: 'low',
        types: ['Aphids', 'Rust', 'Blight'],
        affectedArea: 8.5
      },
      moisture: {
        current: 68,
        optimal: 75,
        deficit: 7,
        irrigation: 'recommended'
      },
      nutrients: {
        nitrogen: { current: 78, optimal: 85, status: 'adequate' },
        phosphorus: { current: 45, optimal: 60, status: 'low' },
        potassium: { current: 89, optimal: 80, status: 'high' }
      }
    };
    setAnalyticsData(data);
  };

  const generateYieldPrediction = () => {
    const prediction = {
      estimatedYield: 4.2,
      confidence: 87,
      factors: [
        { name: 'मिट्टी गुणवत्ता', impact: 85, trend: 'positive' },
        { name: 'मौसम पैटर्न', impact: 78, trend: 'positive' },
        { name: 'पोषक तत्व', impact: 65, trend: 'neutral' },
        { name: 'कीट रोग', impact: 92, trend: 'positive' }
      ],
      historicalComparison: {
        lastYear: 3.8,
        average: 3.5,
        improvement: 12
      }
    };
    setYieldPrediction(prediction);
  };

  const renderOverviewTab = () => (
    <div className="space-y-4">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">स्वास्थ्य स्कोर</p>
              <p className="text-2xl font-bold">87%</p>
            </div>
            <Activity className="h-8 w-8 opacity-80" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">उत्पादन अनुमान</p>
              <p className="text-2xl font-bold">4.2 टन</p>
            </div>
            <Wheat className="h-8 w-8 opacity-80" />
          </div>
        </motion.div>
      </div>

      {/* Field Information */}
      {selectedField && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">चयनित क्षेत्र</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">नाम:</span>
              <span className="font-medium">{selectedField?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">क्षेत्रफल:</span>
              <span className="font-medium">{selectedField?.area} एकड़</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">NDVI:</span>
              <span className={`font-medium ${selectedField?.ndvi > 0.6 ? 'text-green-600' : selectedField?.ndvi > 0.4 ? 'text-yellow-600' : 'text-red-600'}`}>
                {selectedField?.ndvi}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderYieldTab = () => (
    <div className="space-y-4">
      {yieldPrediction && (
        <>
          {/* Yield Prediction */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold">उत्पादन पूर्वानुमान</h4>
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold mb-1">{yieldPrediction?.estimatedYield} टन/एकड़</div>
            <div className="text-sm opacity-90">विश्वसनीयता: {yieldPrediction?.confidence}%</div>
          </div>

          {/* Yield Factors */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">प्रभावकारी कारक</h4>
            <div className="space-y-3">
              {yieldPrediction?.factors?.map((factor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{factor?.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          factor?.impact > 80 ? 'bg-green-500' : 
                          factor?.impact > 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${factor?.impact}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{factor?.impact}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Comparison */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">ऐतिहासिक तुलना</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">पिछला वर्ष:</span>
                <span className="font-medium">{yieldPrediction?.historicalComparison?.lastYear} टन/एकड़</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">औसत:</span>
                <span className="font-medium">{yieldPrediction?.historicalComparison?.average} टन/एकड़</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">सुधार:</span>
                <span className="font-medium text-green-600">+{yieldPrediction?.historicalComparison?.improvement}%</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderHealthTab = () => (
    <div className="space-y-4">
      {analyticsData && (
        <>
          {/* Health Distribution */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">स्वास्थ्य वितरण</h4>
            <div className="space-y-3">
              {[
                { label: 'उत्कृष्ट', value: analyticsData?.cropHealth?.excellent, color: 'bg-green-500' },
                { label: 'अच्छा', value: analyticsData?.cropHealth?.good, color: 'bg-blue-500' },
                { label: 'मध्यम', value: analyticsData?.cropHealth?.fair, color: 'bg-yellow-500' },
                { label: 'खराब', value: analyticsData?.cropHealth?.poor, color: 'bg-red-500' }
              ]?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item?.label}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item?.color}`} style={{ width: `${item?.value}%` }} />
                    </div>
                    <span className="text-sm font-medium">{item?.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pest & Disease */}
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Bug className="h-4 w-4 text-red-500" />
              <h4 className="text-sm font-semibold text-gray-800">कीट व रोग स्थिति</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">पता लगाए गए:</span>
                <span className="font-medium">{analyticsData?.pestDisease?.detected}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">गंभीरता:</span>
                <span className={`font-medium ${
                  analyticsData?.pestDisease?.severity === 'low' ? 'text-green-600' : 
                  analyticsData?.pestDisease?.severity === 'medium' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {analyticsData?.pestDisease?.severity === 'low' ? 'कम' : 
                   analyticsData?.pestDisease?.severity === 'medium' ? 'मध्यम' : 'उच्च'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">प्रभावित क्षेत्र:</span>
                <span className="font-medium">{analyticsData?.pestDisease?.affectedArea}%</span>
              </div>
            </div>
          </div>

          {/* Moisture Status */}
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Droplets className="h-4 w-4 text-blue-500" />
              <h4 className="text-sm font-semibold text-gray-800">नमी की स्थिति</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">वर्तमान:</span>
                <span className="font-medium">{analyticsData?.moisture?.current}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">आदर्श:</span>
                <span className="font-medium">{analyticsData?.moisture?.optimal}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">कमी:</span>
                <span className="font-medium text-orange-600">{analyticsData?.moisture?.deficit}%</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderSoilTab = () => (
    <div className="space-y-4">
      {analyticsData && (
        <>
          {/* Soil Quality Distribution */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">मिट्टी गुणवत्ता वितरण</h4>
            <div className="space-y-3">
              {[
                { label: 'उत्तम', value: analyticsData?.soilQuality?.good, color: 'bg-green-500' },
                { label: 'मध्यम', value: analyticsData?.soilQuality?.moderate, color: 'bg-yellow-500' },
                { label: 'खराब', value: analyticsData?.soilQuality?.poor, color: 'bg-red-500' }
              ]?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item?.label}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item?.color}`} style={{ width: `${item?.value}%` }} />
                    </div>
                    <span className="text-sm font-medium">{item?.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrient Levels */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">पोषक तत्व स्तर</h4>
            <div className="space-y-3">
              {Object.entries(analyticsData?.nutrients)?.map(([nutrient, data], index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">
                      {nutrient === 'nitrogen' ? 'नाइट्रोजन' : 
                       nutrient === 'phosphorus' ? 'फास्फोरस' : 'पोटेशियम'}
                    </span>
                    <span className={`font-medium ${
                      data?.status === 'adequate' ? 'text-green-600' : 
                      data?.status === 'low' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {data?.current}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        data?.status === 'adequate' ? 'bg-green-500' : 
                        data?.status === 'low' ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${(data?.current / data?.optimal) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soil Properties */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">मिट्टी गुणधर्म</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">pH स्तर:</span>
                <span className="font-medium">{analyticsData?.soilQuality?.ph}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">जैविक पदार्थ:</span>
                <span className="font-medium">{analyticsData?.soilQuality?.organicMatter}%</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex space-x-1">
          {tabs?.map((tab) => {
            const IconComponent = tab?.icon;
            return (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab?.id
                    ? 'bg-blue-100 text-blue-700' :'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{tab?.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Tab Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {processingStatus === 'processing' && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">विश्लेषण प्रगति में...</p>
            </div>
          </div>
        )}

        {processingStatus !== 'processing' && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'yield' && renderYieldTab()}
            {activeTab === 'health' && renderHealthTab()}
            {activeTab === 'soil' && renderSoilTab()}
          </motion.div>
        )}
      </div>
      {/* Real-time Status */}
      {realTimeData && (
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-gray-600">अंतिम अपडेट: {new Date(realTimeData.timestamp)?.toLocaleTimeString('hi-IN')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">कवरेज: {realTimeData?.coverage}%</span>
              <span className="text-gray-600">सटीकता: {realTimeData?.accuracy}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;