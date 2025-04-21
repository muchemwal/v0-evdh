
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MonitoringTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connector Health Monitoring</CardTitle>
        <CardDescription>
          Real-time monitoring of data source connections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border border-border rounded-md h-[500px] flex items-center justify-center bg-secondary/20">
          <div className="text-center px-4">
            <p className="mb-2 font-medium">Health Monitoring Dashboard</p>
            <p className="text-sm text-muted-foreground">
              This section will contain a real-time dashboard of connector health metrics.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonitoringTab;
