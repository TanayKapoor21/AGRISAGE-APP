import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EnvironmentalMap = ({ selectedFarm, timeRange, onSensorSelect }) => {
  const [mapView, setMapView] = useState('satellite');
  const [overlayType, setOverlayType] = useState('sensors');
  const [selectedSensor, setSelectedSensor] = useState(null);

  // Mock sensor data with real-time status
  const sensorData = [
    {
      id: 'soil_001',
      type: 'soil',
      name: 'Soil Monitor S1',
      location: { lat: 30.7333, lng: 76.7794 },
      position: { x: 25, y: 35 },
      status: 'active',
      readings: {
        moisture: 65,
        ph: 6.8,
        temperature: 24,
        nutrients: 'optimal'
      },
      lastUpdate: new Date(Date.now() - 300000)
    },
    {
      id: 'water_001',
      type: 'water',
      name: 'Water Quality W1',
      location: { lat: 30.7350, lng: 76.7810 },
      position: { x: 45, y: 25 },
      status: 'warning',
      readings: {
        quality: 7.2,
        pollution: 'moderate',
        temperature: 22,
        flow: 'normal'
      },
      lastUpdate: new Date(Date.now() - 180000)
    },
    {
      id: 'air_001',
      type: 'air',
      name: 'Air Quality A1',
      location: { lat: 30.7320, lng: 76.7780 },
      position: { x: 65, y: 45 },
      status: 'active',
      readings: {
        aqi: 85,
        humidity: 72,
        temperature: 26,
        co2: 410
      },
      lastUpdate: new Date(Date.now() - 120000)
    },
    {
      id: 'weather_001',
      type: 'weather',
      name: 'Weather Station W1',
      location: { lat: 30.7340, lng: 76.7800 },
      position: { x: 35, y: 55 },
      status: 'active',
      readings: {
        temperature: 28,
        humidity: 68,
        windSpeed: 12,
        rainfall: 0
      },
      lastUpdate: new Date(Date.now() - 60000)
    }
  ];

  const getSensorIcon = (type, status) => {
    const icons = {
      soil: 'Layers',
      water: 'Droplets',
      air: 'Wind',
      weather: 'CloudSun'
    };
    
    return icons?.[type] || 'Circle';
  };

  const getSensorStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success border-success text-white';
      case 'warning': return 'bg-warning border-warning text-white';
      case 'error': return 'bg-error border-error text-white';
      case 'offline': return 'bg-muted-foreground border-muted-foreground text-white';
      default: return 'bg-muted border-border text-muted-foreground';
    }
  };

  const handleSensorClick = (sensor) => {
    setSelectedSensor(sensor);
    onSensorSelect && onSensorSelect(sensor);
  };

  const formatLastUpdate = (timestamp) => {
    const diff = Math.floor((new Date() - timestamp) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return `${Math.floor(diff / 60)}h ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Map Controls */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-foreground">Environmental Map</h3>
            <span className="text-xs text-muted-foreground font-data">
              {selectedFarm} • {sensorData?.length} sensors active
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Map View Toggle */}
            <div className="flex bg-background border border-border rounded-md p-1">
              {['satellite', 'terrain', 'hybrid']?.map((view) => (
                <button
                  key={view}
                  onClick={() => setMapView(view)}
                  className={`px-3 py-1 text-xs rounded transition-colors duration-200 ${
                    mapView === view
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {view?.charAt(0)?.toUpperCase() + view?.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Overlay Toggle */}
            <div className="flex bg-background border border-border rounded-md p-1">
              {['sensors', 'heat', 'pollution']?.map((overlay) => (
                <button
                  key={overlay}
                  onClick={() => setOverlayType(overlay)}
                  className={`px-3 py-1 text-xs rounded transition-colors duration-200 ${
                    overlayType === overlay
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {overlay?.charAt(0)?.toUpperCase() + overlay?.slice(1)}
                </button>
              ))}
            </div>
            
            <Button variant="outline" size="sm" iconName="Maximize2">
              Fullscreen
            </Button>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 bg-muted">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Environmental Monitoring Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=30.7333,76.7794&z=16&output=embed"
          className="absolute inset-0"
        />
        
        {/* Sensor Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {sensorData?.map((sensor) => (
            <div
              key={sensor?.id}
              className="absolute pointer-events-auto"
              style={{
                left: `${sensor?.position?.x}%`,
                top: `${sensor?.position?.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <button
                onClick={() => handleSensorClick(sensor)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${getSensorStatusColor(sensor?.status)} ${
                  selectedSensor?.id === sensor?.id ? 'ring-2 ring-primary ring-offset-2' : ''
                }`}
              >
                <Icon 
                  name={getSensorIcon(sensor?.type, sensor?.status)} 
                  size={14}
                />
              </button>
              
              {/* Sensor pulse animation for active sensors */}
              {sensor?.status === 'active' && (
                <div className="absolute inset-0 rounded-full bg-success animate-ping opacity-20"></div>
              )}
            </div>
          ))}
        </div>

        {/* Heat Map Overlay */}
        {overlayType === 'heat' && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-yellow-500/20 to-red-500/20 pointer-events-none">
            <div className="absolute top-4 left-4 bg-card border border-border rounded-lg p-2">
              <div className="text-xs font-medium text-foreground mb-2">Soil Temperature (°C)</div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-xs text-muted-foreground">20-25</span>
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-xs text-muted-foreground">25-30</span>
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-xs text-muted-foreground">30+</span>
              </div>
            </div>
          </div>
        )}

        {/* Pollution Overlay */}
        {overlayType === 'pollution' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-red-500/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-yellow-500/30 rounded-full animate-pulse"></div>
            <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-2">
              <div className="text-xs font-medium text-foreground mb-2">Pollution Levels</div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">High</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Moderate</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Selected Sensor Details */}
      {selectedSensor && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name={getSensorIcon(selectedSensor?.type)} size={16} className="text-primary" />
              <h4 className="font-medium text-foreground">{selectedSensor?.name}</h4>
              <span className={`px-2 py-1 text-xs rounded-full ${getSensorStatusColor(selectedSensor?.status)}`}>
                {selectedSensor?.status}
              </span>
            </div>
            <div className="text-xs text-muted-foreground font-data">
              Updated {formatLastUpdate(selectedSensor?.lastUpdate)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(selectedSensor?.readings)?.map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-semibold text-foreground">{value}</div>
                <div className="text-xs text-muted-foreground capitalize">{key}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentalMap;