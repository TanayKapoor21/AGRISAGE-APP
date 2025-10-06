import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegionalPricingTable = () => {
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('desc');

  const crops = [
    { value: 'wheat', label: 'गेहूं' },
    { value: 'rice', label: 'धान' },
    { value: 'corn', label: 'मक्का' },
    { value: 'mustard', label: 'सरसों' }
  ];

  // Mock regional pricing data
  const pricingData = [
    {
      id: 1,
      market: "करनाल मंडी",
      district: "करनाल",
      state: "हरियाणा",
      price: 2250,
      change: 2.5,
      volume: 1500,
      quality: "A1",
      transportCost: 45,
      profitMargin: 8.5,
      trustScore: 95,
      lastUpdated: new Date(Date.now() - 900000) // 15 minutes ago
    },
    {
      id: 2,
      market: "अंबाला मंडी",
      district: "अंबाला",
      state: "हरियाणा",
      price: 2200,
      change: -1.2,
      volume: 1200,
      quality: "A",
      transportCost: 35,
      profitMargin: 7.8,
      trustScore: 88,
      lastUpdated: new Date(Date.now() - 1200000) // 20 minutes ago
    },
    {
      id: 3,
      market: "पानीपत मंडी",
      district: "पानीपत",
      state: "हरियाणा",
      price: 2180,
      change: 0.8,
      volume: 900,
      quality: "B+",
      transportCost: 40,
      profitMargin: 6.9,
      trustScore: 92,
      lastUpdated: new Date(Date.now() - 600000) // 10 minutes ago
    },
    {
      id: 4,
      market: "रोहतक मंडी",
      district: "रोहतक",
      state: "हरियाणा",
      price: 2220,
      change: 1.5,
      volume: 1100,
      quality: "A",
      transportCost: 50,
      profitMargin: 7.2,
      trustScore: 90,
      lastUpdated: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: 5,
      market: "सिरसा मंडी",
      district: "सिरसा",
      state: "हरियाणा",
      price: 2160,
      change: -0.5,
      volume: 800,
      quality: "B+",
      transportCost: 60,
      profitMargin: 6.5,
      trustScore: 85,
      lastUpdated: new Date(Date.now() - 2400000) // 40 minutes ago
    }
  ];

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedData = [...pricingData]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 60000); // minutes
    if (diff < 1) return 'अभी';
    if (diff < 60) return `${diff} मिनट पहले`;
    return `${Math.floor(diff / 60)} घंटे पहले`;
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getQualityColor = (quality) => {
    if (quality === 'A1' || quality === 'A') return 'bg-success/20 text-success';
    if (quality === 'B+') return 'bg-warning/20 text-warning';
    return 'bg-muted text-muted-foreground';
  };

  const getTrustScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-error';
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    return sortOrder === 'asc' ? 
      <Icon name="ArrowUp" size={14} className="text-primary" /> : 
      <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-foreground">क्षेत्रीय मूल्य तुलना</h3>
            <p className="text-sm text-muted-foreground">हरियाणा की प्रमुख मंडियों में वर्तमान दरें</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Crop Selector */}
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e?.target?.value)}
              className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {crops?.map((crop) => (
                <option key={crop?.value} value={crop?.value}>
                  {crop?.label}
                </option>
              ))}
            </select>
            
            <Button variant="outline" size="sm" iconName="Download">
              एक्सपोर्ट करें
            </Button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-medium text-foreground">
                <button
                  onClick={() => handleSort('market')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors duration-200"
                >
                  <span>मंडी</span>
                  <SortIcon column="market" />
                </button>
              </th>
              <th className="text-left p-3 font-medium text-foreground">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors duration-200"
                >
                  <span>मूल्य (₹/क्विंटल)</span>
                  <SortIcon column="price" />
                </button>
              </th>
              <th className="text-left p-3 font-medium text-foreground">
                <button
                  onClick={() => handleSort('change')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors duration-200"
                >
                  <span>परिवर्तन (%)</span>
                  <SortIcon column="change" />
                </button>
              </th>
              <th className="text-left p-3 font-medium text-foreground">
                <button
                  onClick={() => handleSort('volume')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors duration-200"
                >
                  <span>वॉल्यूम</span>
                  <SortIcon column="volume" />
                </button>
              </th>
              <th className="text-left p-3 font-medium text-foreground">गुणवत्ता</th>
              <th className="text-left p-3 font-medium text-foreground">
                <button
                  onClick={() => handleSort('transportCost')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors duration-200"
                >
                  <span>परिवहन लागत</span>
                  <SortIcon column="transportCost" />
                </button>
              </th>
              <th className="text-left p-3 font-medium text-foreground">
                <button
                  onClick={() => handleSort('profitMargin')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors duration-200"
                >
                  <span>लाभ मार्जिन</span>
                  <SortIcon column="profitMargin" />
                </button>
              </th>
              <th className="text-left p-3 font-medium text-foreground">
                <button
                  onClick={() => handleSort('trustScore')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors duration-200"
                >
                  <span>विश्वास स्कोर</span>
                  <SortIcon column="trustScore" />
                </button>
              </th>
              <th className="text-left p-3 font-medium text-foreground">अपडेट</th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((row, index) => (
              <tr key={row?.id} className={`border-t border-border hover:bg-muted/30 transition-colors duration-200 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}>
                <td className="p-3">
                  <div>
                    <div className="font-medium text-foreground">{row?.market}</div>
                    <div className="text-xs text-muted-foreground">{row?.district}, {row?.state}</div>
                  </div>
                </td>
                <td className="p-3">
                  <span className="font-semibold text-foreground">
                    ₹{row?.price?.toLocaleString('hi-IN')}
                  </span>
                </td>
                <td className="p-3">
                  <div className={`flex items-center space-x-1 ${getChangeColor(row?.change)}`}>
                    <Icon 
                      name={row?.change > 0 ? "TrendingUp" : row?.change < 0 ? "TrendingDown" : "Minus"} 
                      size={14} 
                    />
                    <span className="font-medium">{Math.abs(row?.change)}%</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-foreground">{row?.volume?.toLocaleString('hi-IN')} क्विंटल</span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQualityColor(row?.quality)}`}>
                    {row?.quality}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-foreground">₹{row?.transportCost}/क्विंटल</span>
                </td>
                <td className="p-3">
                  <span className="text-foreground">{row?.profitMargin}%</span>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getTrustScoreColor(row?.trustScore)?.replace('text-', 'bg-')}`}></div>
                    <span className={`font-medium ${getTrustScoreColor(row?.trustScore)}`}>
                      {row?.trustScore}%
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(row?.lastUpdated)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            कुल {sortedData?.length} मंडियों का डेटा • अंतिम अपडेट: {formatTimestamp(new Date(Date.now() - 600000))}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="RefreshCw">
              रीफ्रेश करें
            </Button>
            <Button variant="outline" size="sm" iconName="Bell">
              अलर्ट सेट करें
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalPricingTable;