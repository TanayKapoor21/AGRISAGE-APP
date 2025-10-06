import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceGrid = () => {
  const [sortBy, setSortBy] = useState('health');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedFields, setSelectedFields] = useState([]);

  const fieldData = [
    {
      id: 1,
      name: 'मुख्य खेत - सेक्टर A',
      crop: 'गेहूं',
      area: '25 बीघा',
      health: 85,
      moisture: 68,
      temperature: 22,
      ph: 6.8,
      nitrogen: 45,
      phosphorus: 38,
      potassium: 52,
      yield: 28.5,
      cost: '₹45,000',
      revenue: '₹1,25,000',
      profit: '₹80,000',
      lastIrrigation: '2 दिन पहले',
      nextAction: 'उर्वरक',
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
      ph: 7.2,
      nitrogen: 38,
      phosphorus: 42,
      potassium: 48,
      yield: 22.3,
      cost: '₹32,000',
      revenue: '₹95,000',
      profit: '₹63,000',
      lastIrrigation: '1 दिन पहले',
      nextAction: 'सिंचाई',
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
      ph: 6.5,
      nitrogen: 52,
      phosphorus: 45,
      potassium: 58,
      yield: 32.1,
      cost: '₹55,000',
      revenue: '₹1,65,000',
      profit: '₹1,10,000',
      lastIrrigation: '3 दिन पहले',
      nextAction: 'कटाई',
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
      ph: 5.8,
      nitrogen: 28,
      phosphorus: 32,
      potassium: 35,
      yield: 18.7,
      cost: '₹48,000',
      revenue: '₹85,000',
      profit: '₹37,000',
      lastIrrigation: '5 दिन पहले',
      nextAction: 'तुरंत सिंचाई',
      status: 'critical'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'excellent': return 'bg-success/10';
      case 'good': return 'bg-primary/10';
      case 'warning': return 'bg-warning/10';
      case 'critical': return 'bg-error/10';
      default: return 'bg-muted';
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleFieldSelect = (fieldId) => {
    setSelectedFields(prev => 
      prev?.includes(fieldId) 
        ? prev?.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action ${action} for fields:`, selectedFields);
  };

  const sortedData = [...fieldData]?.sort((a, b) => {
    let aVal = a?.[sortBy];
    let bVal = b?.[sortBy];
    
    if (typeof aVal === 'string') {
      aVal = aVal?.toLowerCase();
      bVal = bVal?.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">खेत प्रदर्शन डेटा</h3>
          <div className="flex items-center space-x-2">
            {selectedFields?.length > 0 && (
              <>
                <span className="text-sm text-muted-foreground">
                  {selectedFields?.length} चयनित
                </span>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('irrigate')}>
                  सिंचाई करें
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('fertilize')}>
                  उर्वरक दें
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" iconName="Download">
              निर्यात करें
            </Button>
          </div>
        </div>
      </div>
      {/* Data Grid */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedFields?.length === fieldData?.length}
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      setSelectedFields(fieldData?.map(f => f?.id));
                    } else {
                      setSelectedFields([]);
                    }
                  }}
                  className="rounded border-border"
                />
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>खेत का नाम</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('crop')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>फसल</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('health')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>स्वास्थ्य</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('moisture')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>नमी</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('yield')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>उत्पादन</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('profit')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>लाभ</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="p-3 text-left">अगली कार्रवाई</th>
              <th className="p-3 text-left">कार्य</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedData?.map((field) => (
              <tr 
                key={field?.id} 
                className={`hover:bg-muted/30 transition-colors duration-200 ${
                  selectedFields?.includes(field?.id) ? 'bg-primary/5' : ''
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedFields?.includes(field?.id)}
                    onChange={() => handleFieldSelect(field?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-3">
                  <div>
                    <div className="font-medium text-foreground">{field?.name}</div>
                    <div className="text-sm text-muted-foreground">{field?.area}</div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Wheat" size={16} className="text-primary" />
                    <span className="text-foreground">{field?.crop}</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusBg(field?.status)?.replace('bg-', 'bg-')?.replace('/10', '')}`}></div>
                    <span className={`font-medium ${getStatusColor(field?.status)}`}>
                      {field?.health}%
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Droplets" size={14} className="text-primary" />
                    <span className="text-foreground">{field?.moisture}%</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-foreground font-medium">
                    {field?.yield} क्विंटल/बीघा
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-success font-medium">
                    {field?.profit}
                  </div>
                </td>
                <td className="p-3">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    field?.status === 'critical' ? 'bg-error/10 text-error' :
                    field?.status === 'warning'? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
                  }`}>
                    {field?.nextAction}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="Droplets" size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="Zap" size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="Camera" size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            कुल {fieldData?.length} खेत दिखाए गए
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              पिछला
            </Button>
            <span className="text-muted-foreground">1 का 1</span>
            <Button variant="outline" size="sm">
              अगला
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceGrid;