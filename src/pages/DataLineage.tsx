
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DataLineage = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Lineage</h1>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Data Flow Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">
              Data lineage visualization will be implemented here to show data flows and dependencies between systems.
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DataLineage;
