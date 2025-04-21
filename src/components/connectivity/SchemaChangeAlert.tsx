import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface SchemaChangeAlertProps {
  connectorId: string;
  onViewChanges?: () => void;
}

const SchemaChangeAlert = ({ connectorId, onViewChanges }: SchemaChangeAlertProps) => {
  const [changes, setChanges] = useState<{
    detected: boolean;
    count: number;
    connectorName: string;
    timestamp: string;
  } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initial check for changes
    checkForSchemaChanges();
    
    // Set up realtime subscription for schema changes
    const channel = supabase.channel(`schema-changes-${connectorId}`);
    
    const subscription = channel
      .on('broadcast', 
        { event: 'schema_change' },
        (payload) => {
          const changeData = payload.payload;
          setChanges({
            detected: true,
            count: changeData.changes_count,
            connectorName: changeData.connector_name,
            timestamp: new Date(changeData.detected_at).toLocaleString()
          });
          
          // Show a toast notification
          toast({
            title: "Schema Change Detected",
            description: `${changeData.changes_count} changes found in ${changeData.connector_name}`,
            variant: "destructive"
          });
        }
      )
      .subscribe();
    
    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectorId]);

  const checkForSchemaChanges = async () => {
    try {
      // Real implementation would query Supabase for the latest schema changes
      const { data, error } = await supabase
        .from('schema_changes')
        .select('*')
        .eq('connector_id', connectorId)
        .order('detected_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setChanges({
          detected: true,
          count: data[0].changes_count,
          connectorName: data[0].connector_name,
          timestamp: new Date(data[0].detected_at).toLocaleString()
        });
      }
    } catch (error) {
      console.error("Error checking for schema changes:", error);
      
      // For demo, simulate a schema change
      if (Math.random() > 0.5) {
        setChanges({
          detected: true,
          count: 3,
          connectorName: "Vehicle Telemetry API",
          timestamp: new Date().toLocaleString()
        });
      }
    }
  };

  if (!changes || !changes.detected) {
    return null;
  }

  return (
    <Alert className="border-amber-500 mb-4">
      <AlertTriangle className="h-4 w-4 text-amber-500" />
      <AlertTitle>Schema Changes Detected</AlertTitle>
      <AlertDescription className="flex justify-between items-center">
        <div>
          <p>{changes.count} changes detected in {changes.connectorName}</p>
          <p className="text-xs text-muted-foreground">{changes.timestamp}</p>
        </div>
        <Button size="sm" variant="outline" onClick={onViewChanges}>
          View Changes
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default SchemaChangeAlert;
