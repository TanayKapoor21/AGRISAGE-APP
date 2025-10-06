import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FieldMap = () => {
  const [selectedField, setSelectedField] = useState(null);
  const [mapView, setMapView] = useState('satellite');
  const [showSensors, setShowSensors] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  const fields = [
    {
      id: 1,
      name: 'मुख्य खेत - सेक्टर A',
      crop: 'गेहूं',
      area: '25 बीघा',
      health: 85,
      moisture: 68,
      temperature: 22,
      coordinates: { x: 20, y: 30 },
      status: 'excellent'
    },
    {
      id: 2,
      name: 'उत्तरी खेत - सेक्टर B',
      crop: 'चना',
      area: '18 बीघा',
      health: 72,
      moisture: 45,
      temperature: 24,
      coordinates: { x: 60, y: 25 },
      status: 'warning'
    },
    {
      id: 3,
      name: 'दक्षिणी खेत - सेक्टर C',
      crop: 'सरसों',
      area: '30 बीघा',
      health: 91,
      moisture: 75,
      temperature: 21,
      coordinates: { x: 40, y: 70 },
      status: 'excellent'
    },
    {
      id: 4,
      name: 'पश्चिमी खेत - सेक्टर D',
      crop: 'आलू',
      area: '22 बीघा',
      health: 58,
      moisture: 35,
      temperature: 26,
      coordinates: { x: 80, y: 60 },
      status: 'critical'
    }
  ];

  const sensors = [
    { id: 1, type: 'soil', x: 25, y: 35, status: 'active', fieldId: 1 },
    { id: 2, type: 'weather', x: 65, y: 30, status: 'active', fieldId: 2 },
    { id: 3, type: 'moisture', x: 45, y: 75, status: 'warning', fieldId: 3 },
    { id: 4, type: 'temperature', x: 85, y: 65, status: 'error', fieldId: 4 }
  ];

  const getHealthColor = (health) => {
    if (health >= 80) return '#4CAF50';
    if (health >= 60) return '#FF8F00';
    return '#D32F2F';
  };

  const getSensorIcon = (type) => {
    switch (type) {
      case 'soil': return 'Layers';
      case 'weather': return 'Cloud';
      case 'moisture': return 'Droplets';
      case 'temperature': return 'Thermometer';
      default: return 'Radio';
    }
  };

  const getSensorStatusColor = (status) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'warning': return '#FF8F00';
      case 'error': return '#D32F2F';
      default: return '#666666';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Map Controls */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-foreground">खेत का नक्शा</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant={mapView === 'satellite' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMapView('satellite')}
              >
                उपग्रह दृश्य
              </Button>
              <Button
                variant={mapView === 'ndvi' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMapView('ndvi')}
              >
                NDVI हीट मैप
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={showSensors ? 'default' : 'outline'}
              size="sm"
              iconName="Radio"
              onClick={() => setShowSensors(!showSensors)}
            >
              सेंसर
            </Button>
            <Button variant="outline" size="sm" iconName="ZoomIn" onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2))}>
              ज़ूम इन
            </Button>
            <Button variant="outline" size="sm" iconName="ZoomOut" onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.5))}>
              ज़ूम आउट
            </Button>
          </div>
        </div>
      </div>
      {/* Interactive Map */}
      <div className="relative h-96 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
        <div 
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-10 grid-rows-8 h-full w-full">
              {Array.from({ length: 80 })?.map((_, i) => (
                <div key={i} className="border border-green-200"></div>
              ))}
            </div>
          </div>

          {/* Field Areas */}
          {fields?.map((field) => (
            <div
              key={field?.id}
              className={`absolute cursor-pointer transition-all duration-200 ${
                selectedField?.id === field?.id ? 'z-20' : 'z-10'
              }`}
              style={{
                left: `${field?.coordinates?.x}%`,
                top: `${field?.coordinates?.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedField(field)}
            >
              {/* Field Boundary */}
              <div
                className={`w-20 h-16 rounded-lg border-2 transition-all duration-200 ${
                  selectedField?.id === field?.id 
                    ? 'border-primary shadow-lg scale-110' 
                    : 'border-white/60 hover:border-primary/60'
                }`}
                style={{
                  backgroundColor: `${getHealthColor(field?.health)}40`,
                  borderColor: selectedField?.id === field?.id ? '#2E7D32' : getHealthColor(field?.health)
                }}
              >
                {/* Field Label */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-card border border-border rounded px-2 py-1 shadow-sm">
                    <span className="text-xs font-medium text-foreground">{field?.name}</span>
                  </div>
                </div>

                {/* Health Indicator */}
                <div className="absolute top-1 right-1">
                  <div 
                    className="w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: getHealthColor(field?.health) }}
                  ></div>
                </div>

                {/* Crop Icon */}
                <div className="flex items-center justify-center h-full">
                  <Icon name="Wheat" size={16} color={getHealthColor(field?.health)} />
                </div>
              </div>
            </div>
          ))}

          {/* Sensors */}
          {showSensors && sensors?.map((sensor) => (
            <div
              key={sensor?.id}
              className="absolute z-30 cursor-pointer"
              style={{
                left: `${sensor?.x}%`,
                top: `${sensor?.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div 
                className="w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: getSensorStatusColor(sensor?.status) }}
              >
                <Icon name={getSensorIcon(sensor?.type)} size={12} color="white" />
              </div>
              
              {/* Sensor Pulse Animation */}
              {sensor?.status === 'active' && (
                <div 
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ backgroundColor: getSensorStatusColor(sensor?.status) }}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-sm">
          <h4 className="text-sm font-medium text-foreground mb-2">स्वास्थ्य सूचकांक</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-xs text-muted-foreground">उत्कृष्ट (80+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-xs text-muted-foreground">चेतावनी (60-79)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <span className="text-xs text-muted-foreground">गंभीर (&lt;60)</span>
            </div>
          </div>
        </div>
      </div>
      {/* Field Details Panel */}
      {selectedField && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-semibold text-foreground">{selectedField?.name}</h4>
            <Button variant="ghost" size="icon" onClick={() => setSelectedField(null)}>
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">फसल</span>
              <p className="font-medium text-foreground">{selectedField?.crop}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">क्षेत्रफल</span>
              <p className="font-medium text-foreground">{selectedField?.area}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">स्वास्थ्य स्कोर</span>
              <p className="font-medium" style={{ color: getHealthColor(selectedField?.health) }}>
                {selectedField?.health}%
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">मिट्टी की नमी</span>
              <p className="font-medium text-foreground">{selectedField?.moisture}%</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <Button variant="default" size="sm" iconName="Droplets">
              सिंचाई शुरू करें
            </Button>
            <Button variant="outline" size="sm" iconName="Zap">
              उर्वरक लगाएं
            </Button>
            <Button variant="outline" size="sm" iconName="Camera">
              फोटो लें
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldMap;