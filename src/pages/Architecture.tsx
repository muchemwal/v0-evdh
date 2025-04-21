
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModelViewer from "@/components/architecture/ModelViewer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArchitectureLayer } from "@/lib/types";

const Architecture = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Architecture Governance</h1>
      </div>
      
      <Tabs defaultValue="models">
        <TabsList className="mb-6">
          <TabsTrigger value="models">Architecture Models</TabsTrigger>
          <TabsTrigger value="capabilities">Capability Map</TabsTrigger>
          <TabsTrigger value="standards">Standards & Principles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="models">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {Object.values(ArchitectureLayer).map(layer => (
              <Card key={layer}>
                <CardHeader>
                  <CardTitle>{layer} Architecture</CardTitle>
                  <CardDescription>
                    {getLayerDescription(layer)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {getModelsByLayer(layer).map((model, index) => (
                      <div key={index} className="flex items-center p-2 border rounded-md hover:bg-secondary/20">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span className="text-sm">{model}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <ModelViewer />
        </TabsContent>
        
        <TabsContent value="capabilities">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Enterprise Capability Map</CardTitle>
              <CardDescription>
                TOGAF-compliant capability mapping across the organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-border rounded-md h-[500px] flex items-center justify-center bg-secondary/20">
                <div className="text-center px-4">
                  <p className="mb-2 font-medium">Capability Map Visualization</p>
                  <p className="text-sm text-muted-foreground">
                    This section will contain an interactive capability heat map.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="standards">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Architecture Principles</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {architecturePrinciples.map((principle, index) => (
                    <li key={index} className="border-b pb-4 last:border-0">
                      <h3 className="font-medium">{principle.name}</h3>
                      <p className="text-sm text-muted-foreground">{principle.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Technology Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {technologyStandards.map((standard, index) => (
                    <li key={index} className="border-b pb-4 last:border-0">
                      <h3 className="font-medium">{standard.category}</h3>
                      <div className="text-sm text-muted-foreground space-y-1 mt-1">
                        <div><strong>Preferred:</strong> {standard.preferred}</div>
                        {standard.acceptable && (
                          <div><strong>Acceptable:</strong> {standard.acceptable}</div>
                        )}
                        {standard.deprecated && (
                          <div><strong>Deprecated:</strong> {standard.deprecated}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

// Helper functions to provide sample data
const getLayerDescription = (layer: ArchitectureLayer) => {
  switch (layer) {
    case ArchitectureLayer.BUSINESS:
      return "Models representing business processes and organizational structures";
    case ArchitectureLayer.APPLICATION:
      return "Models representing software applications and their interactions";
    case ArchitectureLayer.DATA:
      return "Models representing data structures, flows, and relationships";
    case ArchitectureLayer.TECHNOLOGY:
      return "Models representing technical infrastructure and platforms";
    default:
      return "";
  }
};

const getModelsByLayer = (layer: ArchitectureLayer) => {
  switch (layer) {
    case ArchitectureLayer.BUSINESS:
      return ["Vehicle Manufacturing Process", "Customer Journey Map", "Service Operations"];
    case ArchitectureLayer.APPLICATION:
      return ["EV Management Platform", "Customer Portal", "Manufacturing Systems", "Analytics Platform"];
    case ArchitectureLayer.DATA:
      return ["Data Lake Architecture", "Customer Data Model", "Vehicle Telemetry Model"];
    case ArchitectureLayer.TECHNOLOGY:
      return ["Cloud Infrastructure", "Network Topology", "IoT Platform", "Security Architecture"];
    default:
      return [];
  }
};

const architecturePrinciples = [
  {
    name: "API-First Design",
    description: "All new systems must expose capabilities through well-defined APIs before implementing UI components."
  },
  {
    name: "Data Classification Required",
    description: "All data assets must be classified according to sensitivity and business domain before use."
  },
  {
    name: "Cloud-Native Preference",
    description: "Systems should be designed for cloud-native deployment with containerization where applicable."
  },
  {
    name: "Reuse Before Build",
    description: "Existing services and components should be reused or extended before new ones are created."
  }
];

const technologyStandards = [
  {
    category: "API Technologies",
    preferred: "GraphQL, REST with OpenAPI 3.0",
    acceptable: "gRPC",
    deprecated: "SOAP, XML-RPC"
  },
  {
    category: "Data Persistence",
    preferred: "PostgreSQL, MongoDB, S3-compatible storage",
    acceptable: "MySQL, DynamoDB",
    deprecated: "Oracle DB"
  },
  {
    category: "Authentication",
    preferred: "OAuth 2.0 + OIDC",
    acceptable: "SAML 2.0",
    deprecated: "Basic Auth, Custom Token Systems"
  },
  {
    category: "Event Streaming",
    preferred: "Kafka, MQTT",
    acceptable: "RabbitMQ, AWS Kinesis",
    deprecated: "JMS"
  }
];

export default Architecture;
