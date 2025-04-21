
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MetadataTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Metadata Management</CardTitle>
        <CardDescription>
          View and manage metadata for data connectors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Vehicle Telemetry API</h3>
              <Badge variant="secondary">v1.2.3</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              REST API for vehicle telemetry data
            </p>
            <div className="text-xs p-2 bg-secondary/30 rounded border border-border">
              <code className="break-all">https://api.evdatahub.internal/telemetry/v1</code>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Customer API</h3>
              <Badge variant="secondary">v2.0.0</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              GraphQL API for customer data
            </p>
            <div className="text-xs p-2 bg-secondary/30 rounded border border-border">
              <code className="break-all">https://api.evdatahub.internal/customer/graphql</code>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetadataTab;
