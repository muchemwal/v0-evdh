
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simple placeholder for architecture model visualization
// In a real implementation, this would use a proper graph visualization library
const ModelViewer = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Enterprise Architecture Model</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border border-border rounded-md h-[500px] flex items-center justify-center bg-secondary/20">
          <div className="text-center px-4">
            <p className="mb-2 font-medium">Architecture Visualization</p>
            <p className="text-sm text-muted-foreground">
              This component will render interactive TOGAF-compliant architecture models using a graph visualization library.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelViewer;
