import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const CropSelector = ({ selectedCrops, onCropChange, selectedSeason, onSeasonChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const cropOptions = [
    { value: 'wheat', label: 'गेहूं (Wheat)', description: 'Rabi crop - High yield potential' },
    { value: 'rice', label: 'धान (Rice)', description: 'Kharif crop - Water intensive' },
    { value: 'cotton', label: 'कपास (Cotton)', description: 'Cash crop - Export quality' },
    { value: 'sugarcane', label: 'गन्ना (Sugarcane)', description: 'Perennial - High profitability' },
    { value: 'mustard', label: 'सरसों (Mustard)', description: 'Oilseed - Drought resistant' },
    { value: 'maize', label: 'मक्का (Maize)', description: 'Dual season - Versatile crop' },
    { value: 'bajra', label: 'बाजरा (Pearl Millet)', description: 'Drought tolerant - Nutritious' },
    { value: 'jowar', label: 'ज्वार (Sorghum)', description: 'Resilient - Climate adaptive' }
  ];

  const seasonOptions = [
    { value: 'kharif-2024', label: 'खरीफ 2024 (Kharif 2024)', description: 'Jun-Oct growing season' },
    { value: 'rabi-2024', label: 'रबी 2024-25 (Rabi 2024-25)', description: 'Nov-Apr growing season' },
    { value: 'zaid-2024', label: 'जायद 2024 (Zaid 2024)', description: 'Apr-Jun summer season' },
    { value: 'annual-2024', label: 'वार्षिक 2024 (Annual 2024)', description: 'Full year analysis' }
  ];

  const fieldOptions = [
    { value: 'all', label: 'सभी खेत (All Fields)', description: 'Complete farm analysis' },
    { value: 'north-field', label: 'उत्तरी खेत (North Field)', description: '180 acres - Premium soil' },
    { value: 'main-farm', label: 'मुख्य फार्म (Main Farm)', description: '250 acres - Mixed crops' },
    { value: 'organic-farm', label: 'जैविक फार्म (Organic Farm)', description: '120 acres - Certified organic' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Wheat" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              फसल विश्लेषण नियंत्रण (Crop Analysis Controls)
            </h2>
            <p className="text-sm text-muted-foreground">
              Select crops and parameters for detailed analytics
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          iconName={showAdvanced ? "ChevronUp" : "Settings"}
          iconPosition="left"
        >
          Advanced
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crop Selection */}
        <div className="space-y-4">
          <Select
            label="फसल चयन (Crop Selection)"
            description="Select multiple crops for comparison"
            options={cropOptions}
            value={selectedCrops}
            onChange={onCropChange}
            multiple
            searchable
            clearable
            placeholder="Choose crops..."
            className="w-full"
          />
          
          {selectedCrops && selectedCrops?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCrops?.map((crop) => {
                const cropData = cropOptions?.find(c => c?.value === crop);
                return (
                  <div key={crop} className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    <Icon name="Leaf" size={14} />
                    <span>{cropData?.label?.split(' ')?.[0]}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Season Selection */}
        <div>
          <Select
            label="मौसम चयन (Season Selection)"
            description="Growing season for analysis"
            options={seasonOptions}
            value={selectedSeason}
            onChange={onSeasonChange}
            placeholder="Select season..."
            className="w-full"
          />
        </div>

        {/* Field Comparison */}
        <div>
          <Select
            label="खेत तुलना (Field Comparison)"
            description="Compare across different fields"
            options={fieldOptions}
            value="all"
            onChange={() => {}}
            placeholder="Select fields..."
            className="w-full"
          />
        </div>
      </div>
      {/* Advanced Controls */}
      {showAdvanced && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Confidence Interval
              </label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">85%</Button>
                <Button variant="default" size="sm">95%</Button>
                <Button variant="outline" size="sm">99%</Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Data Granularity
              </label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">Daily</Button>
                <Button variant="default" size="sm">Weekly</Button>
                <Button variant="outline" size="sm">Monthly</Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Growth Stage Focus
              </label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="Sprout" size={14} className="mr-1" />
                  Seedling
                </Button>
                <Button variant="default" size="sm">
                  <Icon name="Leaf" size={14} className="mr-1" />
                  Vegetative
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                AI Model Version
              </label>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Cpu" size={16} className="text-primary" />
                <span className="font-data">v2.1.3</span>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropSelector;