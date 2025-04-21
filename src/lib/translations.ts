
// Define types for our translations
export type SupportedLanguage = 'en' | 'ar';

// Simple translation dictionary
type TranslationSet = {
  [key: string]: {
    en: string;
    ar: string;
  }
};

// Core translations
export const translations: TranslationSet = {
  // General UI
  dashboard: {
    en: 'Dashboard',
    ar: 'لوحة تحكم',
  },
  dataCatalog: {
    en: 'Data Catalog',
    ar: 'فهرس البيانات',
  },
  connectors: {
    en: 'Connectors',
    ar: 'الموصلات',
  },
  architecture: {
    en: 'Architecture',
    ar: 'الهندسة المعمارية',
  },
  dataLineage: {
    en: 'Data Lineage',
    ar: 'نسب البيانات',
  },
  governance: {
    en: 'Governance',
    ar: 'الحوكمة',
  },
  workflows: {
    en: 'Workflows',
    ar: 'سير العمل',
  },
  settings: {
    en: 'Settings',
    ar: 'الإعدادات',
  },

  // Cloud Platforms
  aws: { 
    en: 'AWS',
    ar: 'AWS',
  },
  azure: {
    en: 'Azure',
    ar: 'أزور',
  },
  gcp: {
    en: 'Google Cloud',
    ar: 'جوجل كلاود',
  },
  palantir: {
    en: 'Palantir',
    ar: 'بالانتير',
  },

  // Asset types
  stream: {
    en: 'Stream',
    ar: 'تدفق',
  },
  database: {
    en: 'Database',
    ar: 'قاعدة بيانات',
  },
  api: {
    en: 'API',
    ar: 'واجهة برمجة التطبيقات',
  },
  dataset: {
    en: 'Dataset',
    ar: 'مجموعة بيانات',
  },

  // Status
  pending: {
    en: 'Pending',
    ar: 'قيد الانتظار',
  },
  approved: {
    en: 'Approved',
    ar: 'معتمد',
  },
  rejected: {
    en: 'Rejected',
    ar: 'مرفوض',
  },
  
  // Common actions
  create: {
    en: 'Create',
    ar: 'إنشاء',
  },
  edit: {
    en: 'Edit',
    ar: 'تحرير',
  },
  delete: {
    en: 'Delete',
    ar: 'حذف',
  },
  save: {
    en: 'Save',
    ar: 'حفظ',
  },
  cancel: {
    en: 'Cancel',
    ar: 'إلغاء',
  },
  submit: {
    en: 'Submit',
    ar: 'إرسال',
  },
};

// Translation helper function
export function getTranslation(key: string, language: SupportedLanguage = 'en'): string {
  const translationItem = translations[key];
  if (!translationItem) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translationItem[language] || translationItem.en;
}

// Helper component for translations with tooltip
export function TranslatedText({ textKey, language = 'ar', showTooltip = true }: { 
  textKey: string; 
  language?: SupportedLanguage;
  showTooltip?: boolean;
}) {
  const text = getTranslation(textKey, language);
  const otherLanguage = language === 'ar' ? 'en' : 'ar';
  const tooltipText = getTranslation(textKey, otherLanguage);
  
  if (!showTooltip) {
    return text;
  }
  
  // Note: This is just a definition. The actual component will need to be used with TooltipProvider
  return { text, tooltipText };
}
