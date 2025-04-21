
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ConnectorForm from "@/components/connectivity/ConnectorForm";
import ConnectorDetail from "@/components/connectivity/ConnectorDetail";
import ConnectorsTab from "@/components/connectivity/tabs/ConnectorsTab";
import APIRegistryTab from "@/components/connectivity/tabs/APIRegistryTab";
import MonitoringTab from "@/components/connectivity/tabs/MonitoringTab";
import MetadataTab from "@/components/connectivity/tabs/MetadataTab";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Connectors = () => {
  const [isNewConnectorOpen, setIsNewConnectorOpen] = useState(false);
  const [selectedConnector, setSelectedConnector] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { toast } = useToast();

  const addConnector = async (newConnector: any) => {
    try {
      const { error } = await supabase
        .from('connectors')
        .insert([newConnector]);
      
      if (error) throw error;
      
      setIsNewConnectorOpen(false);
      
      toast({
        title: "Connector added",
        description: "The new connector has been successfully added."
      });
    } catch (error) {
      console.error("Error adding connector:", error);
      
      toast({
        title: "Error adding connector",
        description: "There was an error adding the connector. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Connectors</h1>
        <Button onClick={() => setIsNewConnectorOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Connector
        </Button>
      </div>
      
      <Tabs defaultValue="connectors">
        <TabsList className="mb-6">
          <TabsTrigger value="connectors">Connectors</TabsTrigger>
          <TabsTrigger value="apis">API Registry</TabsTrigger>
          <TabsTrigger value="monitoring">Health Monitoring</TabsTrigger>
          <TabsTrigger value="metadata">Metadata Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connectors">
          <ConnectorsTab />
        </TabsContent>
        
        <TabsContent value="apis">
          <APIRegistryTab />
        </TabsContent>
        
        <TabsContent value="monitoring">
          <MonitoringTab />
        </TabsContent>
        
        <TabsContent value="metadata">
          <MetadataTab />
        </TabsContent>
      </Tabs>
      
      <Dialog open={isNewConnectorOpen} onOpenChange={setIsNewConnectorOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Connector</DialogTitle>
            <DialogDescription>
              Connect to external systems and manage their metadata
            </DialogDescription>
          </DialogHeader>
          <ConnectorForm onSubmit={addConnector} onCancel={() => setIsNewConnectorOpen(false)} />
        </DialogContent>
      </Dialog>
      
      {selectedConnector && (
        <ConnectorDetail 
          connector={selectedConnector} 
          open={isDetailOpen} 
          onOpenChange={setIsDetailOpen} 
        />
      )}
    </MainLayout>
  );
};

export default Connectors;
