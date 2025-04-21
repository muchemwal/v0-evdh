
import React from "react";
import { getTranslation, SupportedLanguage } from "@/lib/translations";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TranslatedTextProps {
  textKey?: string;
  textEn?: string;
  textAr?: string;
  primaryLanguage?: SupportedLanguage;
}

/**
 * Component that displays text in one language with a tooltip showing the translation.
 * Must be used within a TooltipProvider at the root of the app.
 */
export const TranslatedText: React.FC<TranslatedTextProps> = ({
  textKey,
  textEn,
  textAr,
  primaryLanguage = "ar",
}) => {
  // translation logic
  const primaryText = textKey 
    ? getTranslation(textKey, primaryLanguage)
    : primaryLanguage === "ar" 
      ? textAr 
      : textEn;
  
  const secondaryText = textKey
    ? getTranslation(textKey, primaryLanguage === "ar" ? "en" : "ar")
    : primaryLanguage === "ar" 
      ? textEn 
      : textAr;

  if (!primaryText || !secondaryText) {
    return <span>{primaryText || secondaryText || textKey || "Missing translation"}</span>;
  }

  // TooltipProvider is at the app root level (App.tsx)
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-help">{primaryText}</span>
      </TooltipTrigger>
      <TooltipContent side="top">
        {secondaryText}
      </TooltipContent>
    </Tooltip>
  );
};
export default TranslatedText;
