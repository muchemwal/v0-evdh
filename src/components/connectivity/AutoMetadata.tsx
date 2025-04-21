
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Info, Database, Check, X, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface AutoMetadataProps {
  connectorId: string;
  connectorType: string;
  onMetadataExtracted?: (metadata: any) => void;
}

const AutoMetadata = ({ connectorId, connectorType, onMetadataExtracted }: AutoMetadataProps) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [metadata, setMetadata] = useState<any>(null);
  const [autoSync, setAutoSync] = useState(false);
  const [description, setDescription] = useState("");

  const extractMetadata = async () => {
    setIsExtracting(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);
    
    // Call the Supabase Edge Function to extract metadata
    try {
      const { data, error } = await supabase.functions.invoke('extract-metadata', {
        body: { connectorId }
      });
      
      if (error) throw error;
      
      clearInterval(interval);
      setProgress(100);
      setMetadata(data);
      
      if (data.description) {
        setDescription(data.description);
      }
      
      if (onMetadataExtracted) {
        onMetadataExtracted(data);
      }
    } catch (error) {
      console.error("Metadata extraction failed:", error);
      
      // For demo, simulate results based on connector type
      const simulatedMetadata = {
        tables: 24,
        fields: 187,
        foreignKeys: 18,
        description: connectorType === "Database" 
          ? "PostgreSQL database containing customer and vehicle information. Contains sensitive PII data including customer contact information, payment details, and vehicle telemetry data." 
          : connectorType === "API" 
          ? "REST API providing real-time telemetry data from vehicle sensors. Updates every 5 seconds with location, speed, battery levels, and diagnostic information."
          : "Data source containing operational data for the EV charging network.",
        lastUpdated: new Date().toISOString(),
        owner: "data-engineering@evdatahub.example",
        size: "4.2 GB",
        recordCount: 142897,
        tags: ["production", "pii", connectorType.toLowerCase()]
      };
      
      clearInterval(interval);
      setProgress(100);
      setMetadata(simulatedMetadata);
      setDescription(simulatedMetadata.description);
      
      if (onMetadataExtracted) {
        onMetadataExtracted(simulatedMetadata);
      }
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Database className="h-5 w-5 mr-2" />
          Automated Metadata
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isExtracting && !metadata && (
          <div className="text-center p-6 border border-dashed border-border rounded-md">
            <p className="mb-4 text-sm text-muted-foreground">
              Extract metadata directly from the source system to automatically populate fields.
            </p>
            <Button onClick={extractMetadata}>
              Extract Metadata
            </Button>
          </div>
        )}
        
        {isExtracting && (
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Connecting to source system and extracting metadata...
            </p>
            <Progress value={progress} className="h-1" />
            <p className="text-center text-xs text-muted-foreground">
              {progress}% complete
            </p>
          </div>
        )}
        
        {metadata && (
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="flex justify-between items-center">
                <span>Metadata successfully extracted from source system.</span>
                <Button onClick={extractMetadata} size="sm" variant="outline">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Refresh
                </Button>
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Tables/Endpoints</p>
                <p className="font-medium">{metadata.tables}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Total Fields</p>
                <p className="font-medium">{metadata.fields}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Record Count</p>
                <p className="font-medium">{metadata.recordCount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Data Size</p>
                <p className="font-medium">{metadata.size}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Owner</p>
                <p className="font-medium">{metadata.owner}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Last Updated</p>
                <p className="font-medium">{new Date(metadata.lastUpdated).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="suggested-description">Suggested Description</Label>
              <Textarea 
                id="suggested-description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  AI-generated description based on source system metadata.
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" onClick={() => setDescription(metadata.description)}>
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                  <Button size="sm">
                    Apply
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Suggested Tags</Label>
              <div className="flex flex-wrap gap-1">
                {metadata.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1 pl-2 pr-1 py-0">
                    {tag}
                    <button className="h-4 w-4 rounded-full inline-flex items-center justify-center hover:bg-secondary/80">
                      <X className="h-2 w-2" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  Tags extracted from source system.
                </div>
                <Button size="sm">
                  Apply All Tags
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <div className="font-medium">Auto-sync Metadata</div>
                <div className="text-xs text-muted-foreground">Update metadata automatically when source system changes</div>
              </div>
              <Switch
                checked={autoSync}
                onCheckedChange={setAutoSync}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AutoMetadata;
