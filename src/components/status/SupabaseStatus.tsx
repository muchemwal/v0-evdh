
import { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Database, Check, AlertCircle, Loader } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import TranslatedText from "@/components/ui/translated-text";

const SupabaseStatus = () => {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking");
  const [message, setMessage] = useState("Checking Supabase connection...");

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Simple ping to Supabase to check connection
        const { data, error } = await supabase.from('connectors').select('count').limit(1);
        
        if (error) {
          console.error("Supabase connection error:", error);
          setStatus("error");
          setMessage(`Connection error: ${error.message}`);
          return;
        }
        
        // Check if we have seeded data yet
        const { data: connectors, error: fetchError } = await supabase.from('connectors').select('count');
        
        if (fetchError) {
          console.error("Error fetching connectors:", fetchError);
          setStatus("error");
          setMessage(`Data error: ${fetchError.message}`);
          return;
        }
        
        setStatus("connected");
        const count = connectors?.[0]?.count || 0;
        setMessage(`Connected${count > 0 ? ` (${count} connectors)` : ' (No data)'}`);
      } catch (error) {
        console.error("Unexpected Supabase error:", error);
        setStatus("error");
        setMessage("Unexpected connection error");
      }
    };

    checkConnection();
    
    // Set up interval to check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="relative p-2 rounded-md hover:bg-secondary">
            {status === "checking" && (
              <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
            )}
            {status === "connected" && (
              <Database className="h-5 w-5 text-green-500" />
            )}
            {status === "error" && (
              <AlertCircle className="h-5 w-5 text-destructive" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">
            <TranslatedText textEn="Supabase Status" textAr="حالة Supabase" />
          </p>
          <p className="text-xs text-muted-foreground">{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SupabaseStatus;
