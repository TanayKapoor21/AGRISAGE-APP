import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage, isHindi, isEnglish } = useLanguage();

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleLanguage}
        className="relative group"
        title={`Switch to ${isEnglish ? 'Hindi' : 'English'}`}
      >
        <div className="flex items-center justify-center">
          <Icon name="Languages" size={18} />
          <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-popover border border-border rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {isEnglish ? 'हिन्दी' : 'English'}
          </span>
        </div>
        
        {/* Language indicator */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
          {language?.toUpperCase()}
        </span>
      </Button>
    </div>
  );
};

export default LanguageToggle;