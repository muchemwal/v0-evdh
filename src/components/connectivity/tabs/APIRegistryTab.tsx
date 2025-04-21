
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const APIRegistryTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>API Registry</CardTitle>
          <CardDescription>
            Manage APIs that connect to external systems
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
      
      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>
            OpenAPI and GraphQL schema documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <a href="#" className="block border rounded-md p-4 hover:bg-secondary/20">
              <div className="flex justify-between">
                <h3 className="font-medium">Vehicle Telemetry API</h3>
                <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded">OpenAPI</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                REST API documentation with endpoints and schemas
              </p>
            </a>
            
            <a href="#" className="block border rounded-md p-4 hover:bg-secondary/20">
              <div className="flex justify-between">
                <h3 className="font-medium">Customer API</h3>
                <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded">GraphQL</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                GraphQL schema and query documentation
              </p>
            </a>
            
            <a href="#" className="block border rounded-md p-4 hover:bg-secondary/20">
              <div className="flex justify-between">
                <h3 className="font-medium">Analytics API</h3>
                <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded">gRPC</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Protobuf definitions for analytics streaming
              </p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIRegistryTab;
