
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SupportedLanguage } from '@/lib/translations';
import { TooltipProvider } from '@/components/ui/tooltip';

// Define the context type
interface LanguageContextProps {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  toggleLanguage: () => void;
}

// Create the context
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>('ar');

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
