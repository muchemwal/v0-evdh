
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataSourceType } from "@/lib/types";
import { Cable, Database, FileText, Wifi, Calendar, Server, Coffee, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface ConnectorCardProps {
  id?: string;
  name: string;
  type: DataSourceType;
  description: string;
  status: "active" | "inactive" | "error";
  connectionDetails: any;
  lastSync?: string;
  frequency?: string;
  tags?: string[];
  onClick?: () => void;
}

const ConnectorCard = ({
  id = "",
  name,
  type,
  description,
  status,
  connectionDetails,
  lastSync,
  frequency,
  tags = [],
  onClick,
}: ConnectorCardProps) => {
  const [hasSchemaChanges, setHasSchemaChanges] = useState(false);

  // Query for schema changes
  const { data: schemaChanges } = useQuery({
    queryKey: ['schemaChanges', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('schema_changes')
        .select('*')
        .eq('connector_id', id)
        .order('detected_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });
  
  useEffect(() => {
    if (schemaChanges && schemaChanges.length > 0) {
      setHasSchemaChanges(true);
    }
    
    // Set up realtime subscription for schema changes
    if (!id) return;
    
    const channel = supabase.channel(`connector-schema-${id}`);
    
    const subscription = channel
      .on('broadcast', 
        { event: 'schema_change' },
        () => {
          setHasSchemaChanges(true);
        }
      )
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [id, schemaChanges]);

  const getIcon = () => {
    switch (type) {
      case DataSourceType.DATABASE:
        return <Database className="h-5 w-5" />;
      case DataSourceType.API:
        return <Cable className="h-5 w-5" />;
      case DataSourceType.FILE_SYSTEM:
        return <FileText className="h-5 w-5" />;
      case DataSourceType.SaaS:
        return <Coffee className="h-5 w-5" />;
      case DataSourceType.STREAMING:
        return <Server className="h-5 w-5" />;
      default:
        return <Wifi className="h-5 w-5" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "";
    }
  };

  return (
    <Card className="h-full cursor-pointer hover:border-primary/50 transition-colors" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-md bg-secondary/50">
              {getIcon()}
            </div>
            <CardTitle className="text-base relative">
              {name}
              {hasSchemaChanges && (
                <span className="absolute -right-6 -top-1">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </span>
              )}
            </CardTitle>
          </div>
          <Badge className={getStatusColor()}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="text-xs p-2 bg-secondary/30 rounded border border-border mb-3">
          <code className="break-all">{JSON.stringify(connectionDetails)}</code>
        </div>
        
        {(lastSync || frequency) && (
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
            {lastSync && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Last sync: {lastSync}</span>
              </div>
            )}
            {frequency && (
              <div className="flex items-center gap-1">
                <span>Frequency: {frequency}</span>
              </div>
            )}
          </div>
        )}
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge variant="outline" className="capitalize">{type}</Badge>
        <Button size="sm" variant="outline">Configure</Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectorCard;
