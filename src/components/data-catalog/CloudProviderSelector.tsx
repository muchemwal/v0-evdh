
import React from "react";
import { Cloud, Database, FileText, Code } from "lucide-react";

export interface CloudProviderProps {
  provider: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export const cloudProviders = [
  { id: "aws", name: "AWS", color: "text-yellow-500" },
  { id: "azure", name: "Azure", color: "text-blue-500" },
  { id: "gcp", name: "Google Cloud", color: "text-green-500" },
  { id: "palantir", name: "Palantir", color: "text-red-500" }
];

const CloudProviderSelector: React.FC<CloudProviderProps> = ({ 
  provider, 
  size = "md", 
  showLabel = false 
}) => {
  const sizeClass = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  const getProviderDetails = () => {
    const foundProvider = cloudProviders.find(p => p.id === provider);
    if (!foundProvider) return { name: "Unknown", color: "text-gray-500" };
    return foundProvider;
  };

  const { name, color } = getProviderDetails();

  return (
    <div className="flex items-center gap-1.5">
      <Cloud className={`${sizeClass[size]} ${color}`} />
      {showLabel && <span className="text-sm font-medium">{name}</span>}
    </div>
  );
};

export default CloudProviderSelector;
