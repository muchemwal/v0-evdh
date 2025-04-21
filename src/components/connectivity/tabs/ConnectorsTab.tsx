
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ConnectorCard from "../ConnectorCard";
import { supabase } from "@/integrations/supabase/client";
import { DataSourceType } from "@/lib/types";

const ConnectorsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: connectors = [], isLoading, isError } = useQuery({
    queryKey: ['connectors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('connectors')
        .select('*');
      
      if (error) throw error;
      return data || [];
    }
  });
  
  const filteredConnectors = connectors.filter(connector =>
    connector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (connector.description && connector.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Map string values to enum values for type safety
  const mapConnectorDataToProps = (connector: any) => {
    // Convert string type to enum DataSourceType
    let connectorType: DataSourceType;
    switch (connector.type) {
      case "API":
        connectorType = DataSourceType.API;
        break;
      case "Database":
      case "DATABASE":
        connectorType = DataSourceType.DATABASE;
        break;
      case "File System":
      case "FILE_SYSTEM":
        connectorType = DataSourceType.FILE_SYSTEM;
        break;
      case "SaaS":
        connectorType = DataSourceType.SaaS;
        break;
      case "Streaming":
      case "STREAMING":
        connectorType = DataSourceType.STREAMING;
        break;
      default:
        connectorType = DataSourceType.API; // Default fallback
    }

    // Ensure status is one of the allowed values
    const status = (connector.status === "active" || connector.status === "error") 
      ? connector.status 
      : "inactive";
      
    return {
      id: connector.id,
      name: connector.name,
      type: connectorType,
      description: connector.description || "",
      status: status as "active" | "inactive" | "error",
      connectionDetails: connector.connection_details,
      lastSync: connector.last_sync,
      frequency: connector.sync_frequency,
      tags: connector.tags
    };
  };

  return (
    <>
      <div className="flex mb-6">
        <Input
          placeholder="Search connectors..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading connectors...</p>
        </div>
      )}
      
      {isError && (
        <div className="text-center py-12 border border-dashed border-destructive rounded-lg">
          <p className="text-destructive mb-2">Error loading connectors</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      )}
      
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnectors.map(connector => (
            <ConnectorCard
              key={connector.id}
              {...mapConnectorDataToProps(connector)}
            />
          ))}
        </div>
      )}
      
      {!isLoading && !isError && filteredConnectors.length === 0 && (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground mb-2">No connectors match your search.</p>
          <Button variant="outline" onClick={() => setSearchTerm("")}>
            Clear Search
          </Button>
        </div>
      )}
    </>
  );
};

export default ConnectorsTab;
