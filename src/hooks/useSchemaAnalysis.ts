
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useSchemaAnalysis = (connectorId: string) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const { data: classifications, refetch: refetchClassifications } = useQuery({
    queryKey: ['classifications', connectorId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('data_classifications')
        .select('*')
        .eq('connector_id', connectorId);
      
      if (error) throw error;
      return data || [];
    }
  });

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 300);
    
    try {
      const { data: analysisData, error } = await supabase.functions.invoke('analyze-schema', {
        body: { connectorId }
      });
      
      if (error) throw error;
      
      if (analysisData.classifications) {
        const { error: classificationError } = await supabase
          .from('data_classifications')
          .insert(
            analysisData.classifications.map(c => ({
              connector_id: connectorId,
              ...c
            }))
          );
        
        if (classificationError) throw classificationError;
      }
      
      clearInterval(interval);
      setProgress(100);
      refetchClassifications();
      return analysisData;
    } catch (error) {
      console.error("Analysis failed:", error);
      clearInterval(interval);
      setProgress(0);
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    classifications,
    isAnalyzing,
    progress,
    startAnalysis,
    refetchClassifications
  };
};
