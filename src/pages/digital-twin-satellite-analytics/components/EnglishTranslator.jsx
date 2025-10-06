import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Languages, 
  Volume2, 
  Copy, 
  X, 
  Loader,
  CheckCircle,
  Globe
} from 'lucide-react';

const EnglishTranslator = ({ onClose }) => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('hi');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isCopied, setIsCopied] = useState(false);

  const languages = [
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' }
  ];

  // Common agricultural phrases for quick translation
  const commonPhrases = [
    'मिट्टी की गुणवत्ता कैसी है?',
    'फसल की उत्पादकता बढ़ाने के उपाय',
    'कीट प्रबंधन तकनीक',
    'सिंचाई की आवश्यकता',
    'मौसम का प्रभाव',
    'पोषक तत्वों की कमी'
  ];

  useEffect(() => {
    if (inputText?.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [inputText, sourceLanguage, targetLanguage]);

  const handleTranslate = async () => {
    if (!inputText?.trim()) return;

    setIsTranslating(true);
    
    // Simulated translation - In real implementation, use Google Translate API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock translations for demo
      const translations = {
        'मिट्टी की गुणवत्ता कैसी है?': 'How is the soil quality?',
        'फसल की उत्पादकता बढ़ाने के उपाय': 'Methods to increase crop productivity',
        'कीट प्रबंधन तकनीक': 'Pest management techniques',
        'सिंचाई की आवश्यकता': 'Irrigation requirements',
        'मौसम का प्रभाव': 'Weather impact',
        'पोषक तत्वों की कमी': 'Nutrient deficiency',
        'डिजिटल ट्विन सैटेलाइट एनालिटिक्स': 'Digital Twin Satellite Analytics',
        'करनाल गेहूं क्षेत्र': 'Karnal Wheat Field',
        'उपग्रह चित्रण': 'Satellite Imagery',
        'हाइपरस्पेक्ट्रल विश्लेषण': 'Hyperspectral Analysis'
      };

      setTranslatedText(translations?.[inputText] || `Translated: ${inputText}`);
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslatedText('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard?.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleSpeak = (text, language) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-2">
          <Languages className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">अनुवादक / Translator</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      {/* Language Selection */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e?.target?.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languages?.map((lang) => (
              <option key={lang?.code} value={lang?.code}>
                {lang?.flag} {lang?.name}
              </option>
            ))}
          </select>

          <button
            onClick={swapLanguages}
            className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
          >
            <Globe className="h-4 w-4 text-blue-600" />
          </button>

          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e?.target?.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languages?.map((lang) => (
              <option key={lang?.code} value={lang?.code}>
                {lang?.flag} {lang?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Input Section */}
      <div className="p-4">
        <div className="space-y-4">
          {/* Input Text */}
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e?.target?.value)}
              placeholder={sourceLanguage === 'hi' ? 'यहाँ टेक्स्ट लिखें...' : 'Enter text here...'}
              className="w-full h-24 p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute bottom-2 right-2 flex items-center space-x-1">
              <button
                onClick={() => handleSpeak(inputText, sourceLanguage)}
                disabled={!inputText?.trim()}
                className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Translation Output */}
          <div className="relative">
            <div className="w-full h-24 p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 overflow-y-auto">
              {isTranslating ? (
                <div className="flex items-center justify-center h-full">
                  <Loader className="h-5 w-5 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-500">अनुवाद हो रहा है...</span>
                </div>
              ) : (
                <div className="text-gray-800">
                  {translatedText || (targetLanguage === 'hi' ? 'अनुवाद यहाँ दिखेगा...' : 'Translation will appear here...')}
                </div>
              )}
            </div>
            {translatedText && (
              <div className="absolute bottom-2 right-2 flex items-center space-x-1">
                <button
                  onClick={() => handleCopy(translatedText)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {isCopied ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => handleSpeak(translatedText, targetLanguage)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Quick Phrases */}
      <div className="p-4 border-t bg-gray-50">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">त्वरित वाक्य / Quick Phrases</h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {commonPhrases?.map((phrase, index) => (
            <button
              key={index}
              onClick={() => setInputText(phrase)}
              className="w-full text-left px-2 py-1 text-xs text-gray-600 hover:bg-blue-100 hover:text-blue-800 rounded transition-colors"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EnglishTranslator;