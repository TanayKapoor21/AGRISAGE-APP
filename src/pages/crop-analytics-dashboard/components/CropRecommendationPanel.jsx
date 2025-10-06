import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CropRecommendationPanel = ({ selectedSeason }) => {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [sortBy, setSortBy] = useState('profitability');

  const recommendations = [
    {
      id: 1,
      crop: 'गेहूं HD-3086 (Wheat HD-3086)',
      profitabilityScore: 9.2,
      expectedYield: '48.5 q/acre',
      expectedRevenue: '₹1,94,000/acre',
      investmentRequired: '₹45,000/acre',
      roi: '331%',
      riskLevel: 'Low',
      seasonSuitability: 'Excellent',
      waterRequirement: 'Medium',
      soilSuitability: 'Perfect Match',
      marketDemand: 'High',
      reasons: [
        'Optimal soil pH match (6.8-7.2)',
        'Historical high performance in region',
        'Strong market demand forecast',
        'Disease resistant variety'
      ],
      timeline: '120-130 days',
      certifications: ['Organic Eligible', 'Export Quality'],
      weatherRisk: 'Low'
    },
    {
      id: 2,
      crop: 'सरसों RH-30 (Mustard RH-30)',
      profitabilityScore: 8.7,
      expectedYield: '22.8 q/acre',
      expectedRevenue: '₹1,36,800/acre',
      investmentRequired: '₹28,000/acre',
      roi: '389%',
      riskLevel: 'Low',
      seasonSuitability: 'Very Good',
      waterRequirement: 'Low',
      soilSuitability: 'Good Match',
      marketDemand: 'Very High',
      reasons: [
        'Drought tolerant variety',
        'Rising oil prices benefit',
        'Low water requirement',
        'Government procurement guarantee'
      ],
      timeline: '90-100 days',
      certifications: ['MSP Eligible', 'Contract Farming'],
      weatherRisk: 'Very Low'
    },
    {
      id: 3,
      crop: 'चना काबुली (Chickpea Kabuli)',
      profitabilityScore: 8.3,
      expectedYield: '18.5 q/acre',
      expectedRevenue: '₹1,48,000/acre',
      investmentRequired: '₹35,000/acre',
      roi: '323%',
      riskLevel: 'Medium',
      seasonSuitability: 'Good',
      waterRequirement: 'Low',
      soilSuitability: 'Suitable',
      marketDemand: 'Very High',
      reasons: [
        'Premium export variety',
        'Nitrogen fixation benefit',
        'High protein content demand',
        'Value-added processing potential'
      ],
      timeline: '100-110 days',
      certifications: ['Export Quality', 'Protein Rich'],
      weatherRisk: 'Medium'
    }
  ];

  const intercroppingOptions = [
    {
      id: 1,
      combination: 'गेहूं + सरसों (Wheat + Mustard)',
      ratio: '6:2 rows',
      additionalIncome: '₹25,000/acre',
      benefits: [
        'Efficient land utilization',
        'Risk diversification',
        'Improved soil health',
        'Pest management synergy'
      ],
      complexity: 'Medium',
      waterSaving: '15%',
      laborRequirement: '+20%'
    },
    {
      id: 2,
      combination: 'गेहूं + चना (Wheat + Chickpea)',
      ratio: '4:2 rows',
      additionalIncome: '₹32,000/acre',
      benefits: [
        'Nitrogen fixation advantage',
        'Premium market access',
        'Soil fertility improvement',
        'Reduced fertilizer cost'
      ],
      complexity: 'High',
      waterSaving: '10%',
      laborRequirement: '+30%'
    }
  ];

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'high': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getProfitabilityColor = (score) => {
    if (score >= 9) return 'text-success';
    if (score >= 8) return 'text-primary';
    if (score >= 7) return 'text-warning';
    return 'text-muted-foreground';
  };

  const sortedRecommendations = [...recommendations]?.sort((a, b) => {
    switch (sortBy) {
      case 'profitability':
        return b?.profitabilityScore - a?.profitabilityScore;
      case 'yield':
        return parseFloat(b?.expectedYield) - parseFloat(a?.expectedYield);
      case 'roi':
        return parseFloat(b?.roi) - parseFloat(a?.roi);
      default:
        return 0;
    }
  });

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 h-fit">
      {/* Panel Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
              <Icon name="Lightbulb" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                AI सिफारिशें (AI Recommendations)
              </h3>
              <p className="text-sm text-muted-foreground">
                Optimized for {selectedSeason || 'current season'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="Cpu" size={14} className="text-primary" />
              <span className="font-data">ML v2.1</span>
            </div>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1">
          <Button
            variant={activeTab === 'recommendations' ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab('recommendations')}
          >
            Crop Recommendations
          </Button>
          <Button
            variant={activeTab === 'intercropping' ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab('intercropping')}
          >
            Inter-cropping
          </Button>
        </div>
      </div>
      {/* Panel Content */}
      <div className="p-6">
        {activeTab === 'recommendations' ? (
          <div className="space-y-6">
            {/* Sort Controls */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Sort by:
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant={sortBy === 'profitability' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy('profitability')}
                >
                  Profitability
                </Button>
                <Button
                  variant={sortBy === 'yield' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy('yield')}
                >
                  Yield
                </Button>
                <Button
                  variant={sortBy === 'roi' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy('roi')}
                >
                  ROI
                </Button>
              </div>
            </div>

            {/* Recommendations List */}
            <div className="space-y-4">
              {sortedRecommendations?.map((rec, index) => (
                <div key={rec?.id} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{rec?.crop}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-lg font-bold ${getProfitabilityColor(rec?.profitabilityScore)}`}>
                            {rec?.profitabilityScore}/10
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(rec?.riskLevel)}`}>
                            {rec?.riskLevel} Risk
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" iconName="ExternalLink">
                      Details
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Expected Yield:</span>
                        <span className="text-sm font-medium text-foreground">{rec?.expectedYield}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Revenue:</span>
                        <span className="text-sm font-medium text-success">{rec?.expectedRevenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Investment:</span>
                        <span className="text-sm font-medium text-foreground">{rec?.investmentRequired}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">ROI:</span>
                        <span className="text-sm font-bold text-success">{rec?.roi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Timeline:</span>
                        <span className="text-sm font-medium text-foreground">{rec?.timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Water Need:</span>
                        <span className="text-sm font-medium text-primary">{rec?.waterRequirement}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-foreground mb-2 block">
                        Key Benefits:
                      </span>
                      <div className="space-y-1">
                        {rec?.reasons?.slice(0, 2)?.map((reason, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Icon name="Check" size={14} className="text-success" />
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="flex items-center space-x-4">
                        {rec?.certifications?.map((cert, idx) => (
                          <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {cert}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Icon name="TrendingUp" size={12} className="text-success" />
                        <span>Market: {rec?.marketDemand}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center py-4">
              <Icon name="Layers" size={48} className="text-muted-foreground mx-auto mb-3" />
              <h4 className="font-medium text-foreground mb-2">
                Inter-cropping Opportunities
              </h4>
              <p className="text-sm text-muted-foreground">
                Maximize land utilization with companion crops
              </p>
            </div>

            <div className="space-y-4">
              {intercroppingOptions?.map((option) => (
                <div key={option?.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{option?.combination}</h4>
                      <p className="text-sm text-muted-foreground">Ratio: {option?.ratio}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-success">+{option?.additionalIncome}</div>
                      <div className="text-xs text-muted-foreground">Additional income</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="text-center">
                      <Icon name="Droplets" size={16} className="text-primary mx-auto mb-1" />
                      <div className="font-medium text-success">{option?.waterSaving}</div>
                      <div className="text-muted-foreground">Water Saving</div>
                    </div>
                    <div className="text-center">
                      <Icon name="Users" size={16} className="text-warning mx-auto mb-1" />
                      <div className="font-medium text-warning">{option?.laborRequirement}</div>
                      <div className="text-muted-foreground">Labor Need</div>
                    </div>
                    <div className="text-center">
                      <Icon name="Settings" size={16} className="text-muted-foreground mx-auto mb-1" />
                      <div className="font-medium text-foreground">{option?.complexity}</div>
                      <div className="text-muted-foreground">Complexity</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {option?.benefits?.slice(0, 2)?.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Plus" size={12} className="text-primary" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropRecommendationPanel;