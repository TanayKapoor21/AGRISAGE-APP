import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Layers, Target, Activity, Droplets, Bug, Wheat, Eye, ZoomIn, ZoomOut } from 'lucide-react';

const SatelliteImageryPanel = ({ 
  dateRange, 
  hyperspectralConfig, 
  analysisType, 
  onFieldSelection, 
  selectedField 
}) => {
  const mapRef = useRef(null);
  const [activeOverlay, setActiveOverlay] = useState('rgb');
  const [zoomLevel, setZoomLevel] = useState(12);
  const [mapCenter, setMapCenter] = useState({ lat: 29.6857, lng: 76.9905 }); // Karnal coordinates
  const [fieldBoundaries, setFieldBoundaries] = useState([]);
  const [ndviData, setNdviData] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulated field data for Karnal wheat lands
  const karnalWheatFields = [
    {
      id: 'field_001',
      name: 'करनाल गेहूं क्षेत्र A',
      bounds: [
        [29.6800, 76.9850],
        [29.6900, 76.9950],
        [29.6950, 76.9900],
        [29.6850, 76.9800]
      ],
      area: 45.2,
      soilQuality: 'good',
      ndvi: 0.72,
      moisture: 68,
      health: 'excellent'
    },
    {
      id: 'field_002',
      name: 'करनाल गेहूं क्षेत्र B',
      bounds: [
        [29.6700, 76.9900],
        [29.6800, 77.0000],
        [29.6850, 76.9950],
        [29.6750, 76.9850]
      ],
      area: 38.7,
      soilQuality: 'moderate',
      ndvi: 0.58,
      moisture: 45,
      health: 'good'
    },
    {
      id: 'field_003',
      name: 'करनाल गेहूं क्षेत्र C',
      bounds: [
        [29.6850, 77.0000],
        [29.6950, 77.0100],
        [29.7000, 77.0050],
        [29.6900, 76.9950]
      ],
      area: 52.1,
      soilQuality: 'poor',
      ndvi: 0.42,
      moisture: 32,
      health: 'requires_attention'
    }
  ];

  const overlayTypes = [
    { id: 'rgb', name: 'RGB', icon: Eye, color: 'blue' },
    { id: 'ndvi', name: 'NDVI', icon: Activity, color: 'green' },
    { id: 'ndwi', name: 'NDWI', icon: Droplets, color: 'cyan' },
    { id: 'soil', name: 'मिट्टी', icon: Target, color: 'orange' },
    { id: 'pest', name: 'कीट', icon: Bug, color: 'red' },
    { id: 'wheat', name: 'गेहूं', icon: Wheat, color: 'yellow' }
  ];

  useEffect(() => {
    // Initialize satellite imagery (simulated)
    setFieldBoundaries(karnalWheatFields);
    generateNDVIData();
  }, [dateRange, hyperspectralConfig]);

  const generateNDVIData = () => {
    // Simulate NDVI data generation
    const data = Array.from({ length: 100 }, (_, i) => ({
      x: 29.68 + (Math.random() * 0.02),
      y: 76.98 + (Math.random() * 0.02),
      ndvi: Math.random() * 0.8 + 0.2,
      moisture: Math.random() * 50 + 30,
      temperature: Math.random() * 15 + 20
    }));
    setNdviData(data);
  };

  const handleFieldClick = (field) => {
    setIsAnalyzing(true);
    onFieldSelection(field);
    
    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const getFieldColor = (field) => {
    switch (analysisType) {
      case 'soil-quality':
        return field?.soilQuality === 'good' ? '#10B981' : 
               field?.soilQuality === 'moderate' ? '#F59E0B' : '#EF4444';
      case 'crop-health':
        return field?.health === 'excellent' ? '#10B981' : 
               field?.health === 'good' ? '#F59E0B' : '#EF4444';
      case 'yield-estimation':
        return field?.ndvi > 0.6 ? '#10B981' : 
               field?.ndvi > 0.4 ? '#F59E0B' : '#EF4444';
      default:
        return '#3B82F6';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Overlay Controls */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex flex-wrap gap-2 mb-4">
          {overlayTypes?.map((overlay) => {
            const IconComponent = overlay?.icon;
            return (
              <button
                key={overlay?.id}
                onClick={() => setActiveOverlay(overlay?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeOverlay === overlay?.id 
                    ? `bg-${overlay?.color}-100 text-${overlay?.color}-700 border-${overlay?.color}-300 border` 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{overlay?.name}</span>
              </button>
            );
          })}
        </div>

        {/* Analysis Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">करनाल, हरियाणा</span>
            </div>
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{fieldBoundaries?.length} खेत</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setZoomLevel(Math.max(8, zoomLevel - 1))}
              className="p-2 bg-white rounded-lg hover:bg-gray-100 border border-gray-200"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-600 px-2">{zoomLevel}x</span>
            <button
              onClick={() => setZoomLevel(Math.min(18, zoomLevel + 1))}
              className="p-2 bg-white rounded-lg hover:bg-gray-100 border border-gray-200"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="flex-1 relative overflow-hidden">
        <div 
          ref={mapRef}
          className="w-full h-full bg-gradient-to-br from-green-100 to-yellow-100 relative"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        >
          {/* Simulated Satellite Base Layer */}
          <div className="absolute inset-0 opacity-70">
            <div className="w-full h-full bg-gradient-to-br from-emerald-200 via-lime-200 to-yellow-200" />
          </div>

          {/* Field Boundaries */}
          {fieldBoundaries?.map((field, index) => (
            <motion.div
              key={field?.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`absolute border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedField?.id === field?.id 
                  ? 'border-blue-500 shadow-lg z-20' 
                  : 'border-white/60 hover:border-white/80 hover:shadow-md'
              }`}
              style={{
                left: `${20 + (index % 3) * 30}%`,
                top: `${15 + Math.floor(index / 3) * 40}%`,
                width: `${25 + Math.random() * 10}%`,
                height: `${30 + Math.random() * 15}%`,
                backgroundColor: `${getFieldColor(field)}40`
              }}
              onClick={() => handleFieldClick(field)}
            >
              <div className="absolute inset-0 p-2 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-gray-800 bg-white/90 rounded px-2 py-1">
                    {field?.name}
                  </h4>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-700 bg-white/80 rounded px-1">
                      {field?.area} एकड़
                    </span>
                    <span className={`px-2 py-1 rounded text-white text-xs font-medium ${
                      field?.ndvi > 0.6 ? 'bg-green-600' : 
                      field?.ndvi > 0.4 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}>
                      NDVI: {field?.ndvi}
                    </span>
                  </div>
                </div>
              </div>

              {/* Analysis Indicator */}
              {isAnalyzing && selectedField?.id === field?.id && (
                <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}
            </motion.div>
          ))}

          {/* NDVI Heat Map Overlay */}
          {activeOverlay === 'ndvi' && (
            <div className="absolute inset-0 pointer-events-none">
              {ndviData?.map((point, index) => (
                <div
                  key={index}
                  className="absolute rounded-full opacity-60"
                  style={{
                    left: `${(point?.x - 29.68) * 5000}%`,
                    top: `${(point?.y - 76.98) * 5000}%`,
                    width: '8px',
                    height: '8px',
                    backgroundColor: point?.ndvi > 0.6 ? '#10B981' : 
                                   point?.ndvi > 0.4 ? '#F59E0B' : '#EF4444'
                  }}
                />
              ))}
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/95 rounded-lg p-3 shadow-lg">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">लीजेंड</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>उत्तम गुणवत्ता</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>मध्यम गुणवत्ता</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>सुधार आवश्यक</span>
              </div>
            </div>
          </div>

          {/* Accuracy Indicator */}
          <div className="absolute top-4 right-4 bg-white/95 rounded-lg p-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-sm font-semibold text-gray-800">सटीकता</div>
                <div className="text-lg font-bold text-blue-600">94.7%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteImageryPanel;