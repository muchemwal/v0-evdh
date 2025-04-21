
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataSourceType } from "@/lib/types";
import { RefreshCw, Key, Database, FileText } from "lucide-react";
import SchemaAnalysisCard from "./SchemaAnalysisCard";
import AutoMetadata from "./AutoMetadata";
import SchemaChangeAlert from "./SchemaChangeAlert";

interface ConnectorDetailProps {
  connector: {
    id: string;
    name: string;
    type: DataSourceType;
    description: string;
    status: "active" | "inactive" | "error";
    connectionDetails: string;
    lastSync?: string;
    frequency?: string;
    tags?: string[];
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConnectorDetail = ({ connector, open, onOpenChange }: ConnectorDetailProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [metadataUpdated, setMetadataUpdated] = useState(false);

  const handleMetadataExtraction = (metadata) => {
    setMetadataUpdated(true);
    // In a real app, we would update the connector with the new metadata
    console.log("Extracted metadata:", metadata);
  };

  const handleViewSchemaChanges = () => {
    setActiveTab("schema");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{connector.name}</span>
            <Badge className={
              connector.status === "active" 
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                : connector.status === "error"
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
            }>
              {connector.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>{connector.description}</DialogDescription>
        </DialogHeader>
        
        <SchemaChangeAlert connectorId={connector.id} onViewChanges={handleViewSchemaChanges} />
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
            <TabsTrigger value="samples">Sample Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Connection Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs p-2 bg-secondary/30 rounded border border-border">
                      <code className="break-all">{connector.connectionDetails}</code>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Synchronization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Sync:</span>
                      <span>{connector.lastSync || "Never"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span>{connector.frequency || "Manual"}</span>
                    </div>
                    <Button size="sm" className="w-full mt-2" variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" /> Sync Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4" />
                        <span className="text-sm">Authentication Method:</span>
                      </div>
                      <Badge variant="outline">OAuth 2.0</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Authentication credentials are stored securely and managed by the system.
                    </div>
                    <Button size="sm" className="mt-2 w-full sm:w-auto" variant="outline">
                      Update Credentials
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {connector.tags && connector.tags.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {connector.tags.map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="schema" className="pt-4">
            <SchemaAnalysisCard connectorId={connector.id} />
          </TabsContent>
          
          <TabsContent value="metadata" className="pt-4">
            <AutoMetadata 
              connectorId={connector.id} 
              connectorType={connector.type} 
              onMetadataExtracted={handleMetadataExtraction} 
            />
          </TabsContent>
          
          <TabsContent value="samples" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Sample Data</CardTitle>
                <CardDescription>
                  Preview sample data from this connector
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p className="mb-2">No sample data available.</p>
                  <p className="text-sm">
                    Click "Extract Sample Data" to fetch a sample from this connector.
                  </p>
                  <Button className="mt-4">
                    Extract Sample Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectorDetail;
