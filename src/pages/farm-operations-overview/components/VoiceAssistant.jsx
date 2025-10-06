import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [recentCommands, setRecentCommands] = useState([]);
  const [language, setLanguage] = useState('hindi');

  const mockCommands = [
    {
      id: 1,
      command: 'सेक्टर 3 में सिंचाई शुरू करें',
      response: 'सेक्टर 3 में सिंचाई सिस्टम चालू किया गया',
      timestamp: new Date(Date.now() - 300000),
      status: 'completed'
    },
    {
      id: 2,
      command: 'मौसम की जानकारी दें',
      response: 'आज का तापमान 24°C है, हल्की बारिश की संभावना',
      timestamp: new Date(Date.now() - 600000),
      status: 'completed'
    },
    {
      id: 3,
      command: 'खेत का स्वास्थ्य स्कोर बताएं',
      response: 'औसत स्वास्थ्य स्कोर 76% है, 2 खेतों में ध्यान की जरूरत',
      timestamp: new Date(Date.now() - 900000),
      status: 'completed'
    }
  ];

  useEffect(() => {
    setRecentCommands(mockCommands);
  }, []);

  const handleVoiceToggle = () => {
    if (isListening) {
      setIsListening(false);
      setIsProcessing(true);
      
      // Simulate voice processing
      setTimeout(() => {
        setIsProcessing(false);
        const newCommand = {
          id: Date.now(),
          command: currentCommand || 'नमूना आवाज कमांड',
          response: 'कमांड सफलतापूर्वक प्रोसेस की गई',
          timestamp: new Date(),
          status: 'completed'
        };
        setRecentCommands(prev => [newCommand, ...prev?.slice(0, 4)]);
        setCurrentCommand('');
      }, 2000);
    } else {
      setIsListening(true);
      setCurrentCommand('सुन रहा हूं...');
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 60000);
    if (diff < 1) return 'अभी';
    if (diff < 60) return `${diff} मिनट पहले`;
    return `${Math.floor(diff / 60)} घंटे पहले`;
  };

  const quickCommands = [
    { text: 'सभी खेतों की स्थिति', icon: 'MapPin' },
    { text: 'आज का मौसम', icon: 'Cloud' },
    { text: 'सिंचाई शुरू करें', icon: 'Droplets' },
    { text: 'अलर्ट दिखाएं', icon: 'Bell' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">आवाज सहायक</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={language === 'hindi' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('hindi')}
            >
              हिंदी
            </Button>
            <Button
              variant={language === 'punjabi' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('punjabi')}
            >
              ਪੰਜਾਬੀ
            </Button>
          </div>
        </div>
      </div>
      {/* Voice Interface */}
      <div className="p-6">
        {/* Voice Button */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <Button
              variant={isListening || isProcessing ? "default" : "outline"}
              size="lg"
              onClick={handleVoiceToggle}
              disabled={isProcessing}
              className={`w-20 h-20 rounded-full ${
                isListening ? 'bg-primary animate-pulse' : isProcessing ?'bg-warning' : ''
              }`}
            >
              <Icon 
                name={isProcessing ? "Loader2" : isListening ? "MicIcon" : "Mic"} 
                size={32}
                className={isProcessing ? "animate-spin" : ""}
              />
            </Button>
            
            {/* Voice Waves Animation */}
            {isListening && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex space-x-1">
                  {[...Array(3)]?.map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-primary rounded-full animate-pulse"
                      style={{
                        height: '20px',
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '1s'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              {isListening ? 'सुन रहा हूं...' : isProcessing ?'प्रोसेसिंग...': 'बोलने के लिए माइक दबाएं'}
            </p>
            {currentCommand && (
              <p className="text-sm text-primary mt-2 font-medium">
                "{currentCommand}"
              </p>
            )}
          </div>
        </div>

        {/* Quick Commands */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">त्वरित कमांड</h4>
          <div className="grid grid-cols-2 gap-2">
            {quickCommands?.map((cmd, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentCommand(cmd?.text);
                  handleVoiceToggle();
                }}
                className="justify-start text-xs"
              >
                <Icon name={cmd?.icon} size={14} className="mr-2" />
                {cmd?.text}
              </Button>
            ))}
          </div>
        </div>

        {/* Recent Commands */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">हाल की कमांड</h4>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {recentCommands?.map((cmd) => (
              <div key={cmd?.id} className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="MessageSquare" size={16} className="text-primary mt-1" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground mb-1">
                      "{cmd?.command}"
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {cmd?.response}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-data">
                        {formatTimestamp(cmd?.timestamp)}
                      </span>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        cmd?.status === 'completed' ? 'bg-success/10 text-success' :
                        cmd?.status === 'processing'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                      }`}>
                        <Icon 
                          name={cmd?.status === 'completed' ? 'CheckCircle' : 
                                cmd?.status === 'processing' ? 'Clock' : 'XCircle'} 
                          size={12} 
                          className="mr-1" 
                        />
                        {cmd?.status === 'completed' ? 'पूर्ण' :
                         cmd?.status === 'processing' ? 'प्रोसेसिंग' : 'त्रुटि'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>आवाज पहचान: चालू</span>
          <span>भाषा: {language === 'hindi' ? 'हिंदी' : 'ਪੰਜਾਬੀ'}</span>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;