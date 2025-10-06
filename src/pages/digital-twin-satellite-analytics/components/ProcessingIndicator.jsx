import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Activity, CheckCircle, AlertCircle, Clock, Zap, Database } from 'lucide-react';

const ProcessingIndicator = ({ status, realTimeData }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'processing':
        return {
          icon: Cpu,
          title: 'Google Earth Engine प्रसंस्करण',
          subtitle: 'उपग्रह डेटा विश्लेषण चल रहा है...',
          color: 'blue',
          bgColor: 'from-blue-500 to-cyan-500'
        };
      case 'analyzing':
        return {
          icon: Activity,
          title: 'हाइपरस्पेक्ट्रल विश्लेषण',
          subtitle: 'भूमि विभेदीकरण प्रगति में...',
          color: 'yellow',
          bgColor: 'from-yellow-500 to-orange-500'
        };
      case 'completed':
        return {
          icon: CheckCircle,
          title: 'विश्लेषण पूर्ण',
          subtitle: 'डेटा सफलतापूर्वक प्रसंस्कृत',
          color: 'green',
          bgColor: 'from-green-500 to-emerald-500'
        };
      default:
        return {
          icon: AlertCircle,
          title: 'स्थिति अज्ञात',
          subtitle: 'कृपया पुनः प्रयास करें',
          color: 'red',
          bgColor: 'from-red-500 to-pink-500'
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config?.icon;

  const processingSteps = [
    { id: 1, name: 'उपग्रह चित्र प्राप्ति', status: status === 'idle' ? 'pending' : 'completed' },
    { id: 2, name: 'हाइपरस्पेक्ट्रल विश्लेषण', status: status === 'processing' ? 'active' : status === 'completed' ? 'completed' : 'pending' },
    { id: 3, name: 'भूमि विभेदीकरण', status: status === 'analyzing' ? 'active' : status === 'completed' ? 'completed' : 'pending' },
    { id: 4, name: 'रिपोर्ट जेनरेशन', status: status === 'completed' ? 'completed' : 'pending' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6"
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${config?.bgColor} text-white p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              {status === 'processing' || status === 'analyzing' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <IconComponent className="h-5 w-5" />
                </motion.div>
              ) : (
                <IconComponent className="h-5 w-5" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{config?.title}</h3>
              <p className="text-sm opacity-90">{config?.subtitle}</p>
            </div>
          </div>
          
          {realTimeData && (
            <div className="text-right">
              <div className="text-sm opacity-90">अपडेट समय</div>
              <div className="text-xs">{new Date(realTimeData.timestamp)?.toLocaleTimeString('hi-IN')}</div>
            </div>
          )}
        </div>
      </div>
      {/* Processing Steps */}
      <div className="p-6">
        <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <Database className="h-4 w-4" />
          <span>प्रसंस्करण चरण</span>
        </h4>
        
        <div className="space-y-3">
          {processingSteps?.map((step, index) => (
            <motion.div
              key={step?.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                step?.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : step?.status === 'active' ?'bg-yellow-100 text-yellow-800' :'bg-gray-100 text-gray-500'
              }`}>
                {step?.status === 'completed' && <CheckCircle className="h-3 w-3" />}
                {step?.status === 'active' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-3 h-3 border border-yellow-600 border-t-transparent rounded-full"
                  />
                )}
                {step?.status === 'pending' && <Clock className="h-3 w-3" />}
              </div>
              
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  step?.status === 'active' ? 'text-yellow-800' :
                  step?.status === 'completed' ? 'text-green-800' : 'text-gray-600'
                }`}>
                  {step?.name}
                </div>
              </div>
              
              <div className={`text-xs px-2 py-1 rounded-full ${
                step?.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : step?.status === 'active' ?'bg-yellow-100 text-yellow-800' :'bg-gray-100 text-gray-500'
              }`}>
                {step?.status === 'completed' && 'पूर्ण'}
                {step?.status === 'active' && 'प्रगति में'}
                {step?.status === 'pending' && 'प्रतीक्षा'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Real-time Metrics */}
      {realTimeData && (
        <div className="p-6 bg-gray-50 border-t">
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>वास्तविक समय मेट्रिक्स</span>
          </h4>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{realTimeData?.coverage}%</div>
              <div className="text-xs text-gray-600">कवरेज</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{realTimeData?.accuracy}%</div>
              <div className="text-xs text-gray-600">सटीकता</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${realTimeData?.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {realTimeData?.status === 'success' ? '✓' : '✗'}
              </div>
              <div className="text-xs text-gray-600">स्थिति</div>
            </div>
          </div>
        </div>
      )}
      {/* Progress Bar */}
      {(status === 'processing' || status === 'analyzing') && (
        <div className="px-6 pb-6">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${config?.bgColor}`}
              initial={{ width: 0 }}
              animate={{ width: status === 'processing' ? '45%' : status === 'analyzing' ? '75%' : '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span className="font-medium">
              {status === 'processing' ? '45%' : status === 'analyzing' ? '75%' : '100%'}
            </span>
            <span>100%</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProcessingIndicator;