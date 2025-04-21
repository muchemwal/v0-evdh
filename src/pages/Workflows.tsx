import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle, Database, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { AccessRequestStatus } from "@/lib/governance-types";
import CloudProviderSelector from "@/components/data-catalog/CloudProviderSelector";
import { WorkflowStatus, WorkflowType, Workflow } from "@/lib/governance-types";

const sampleWorkflows: Workflow[] = [
  {
    id: "wf-001",
    title: "Vehicle Data Access Request",
    description: "Request for access to vehicle telemetry data for research purposes",
    status: "in-progress",
    owner: "Alex Rivera",
    createdAt: "2025-04-15",
    dueDate: "2025-04-22",
    assetId: "1",
    assetName: "Vehicle Telemetry Stream",
    cloudPlatform: "azure",
    workflowType: "access"
  },
  {
    id: "wf-002",
    title: "Customer Data Migration Approval",
    description: "Approval for migrating customer data to new cloud storage",
    status: "pending",
    owner: "Sarah Johnson",
    createdAt: "2025-04-16",
    dueDate: "2025-04-25",
    assetId: "2",
    assetName: "Customer Data",
    cloudPlatform: "aws",
    workflowType: "approval"
  },
  {
    id: "wf-003",
    title: "Battery Analytics Model Registration",
    description: "Register new machine learning model for battery life prediction",
    status: "completed",
    owner: "Emma Wilson",
    createdAt: "2025-04-10",
    assetId: "3",
    assetName: "Battery Performance API",
    cloudPlatform: "gcp",
    workflowType: "governance"
  },
  {
    id: "wf-004",
    title: "Sales Data Schema Change",
    description: "Proposed changes to sales transaction database schema",
    status: "rejected",
    owner: "Michael Chen",
    createdAt: "2025-04-12",
    assetId: "4",
    assetName: "Sales Analytics",
    cloudPlatform: "palantir",
    workflowType: "governance"
  },
  {
    id: "wf-005",
    title: "Charging Station API Integration",
    description: "New API integration with third-party charging station network",
    status: "in-progress",
    owner: "Lisa Thompson",
    createdAt: "2025-04-14",
    dueDate: "2025-04-29",
    assetId: "5",
    assetName: "Charging Network API",
    cloudPlatform: "aws",
    workflowType: "approval"
  }
];

const Workflows = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [workflows, setWorkflows] = useState<Workflow[]>(sampleWorkflows);
  const { toast } = useToast();
  
  useEffect(() => {
    // Fetch workflows from Supabase
    const fetchWorkflows = async () => {
      try {
        const { data, error } = await supabase
          .from('workflows')
          .select(`
            *,
            assets:data_assets(id, title, cloud_platform)
          `)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Transform data to match our workflow format
          const transformedData = data.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            status: item.status as WorkflowStatus,
            owner: item.owner_name,
            createdAt: item.created_at,
            dueDate: item.due_date,
            assetId: item.assets?.id,
            assetName: item.assets?.title,
            cloudPlatform: item.assets?.cloud_platform,
            workflowType: item.workflow_type as WorkflowType
          }));
          
          setWorkflows(transformedData);
        }
      } catch (error) {
        console.error("Error fetching workflows:", error);
      }
    };
    
    fetchWorkflows();
  }, [supabase]);
  
  const filteredWorkflows = activeTab === "all" 
    ? workflows
    : workflows.filter(wf => wf.status === activeTab);
    
  const getStatusIcon = (status: WorkflowStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };
  
  const getStatusBadge = (status: WorkflowStatus) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>;
    }
  };

  const getWorkflowTypeIcon = (type: string) => {
    switch (type) {
      case "access":
        return <Users className="h-4 w-4 text-blue-500" />;
      case "approval":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "governance":
        return <Database className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Workflows</h1>
        <Button>+ Create Workflow</Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Workflows</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4">
            {filteredWorkflows.map(workflow => (
              <Card key={workflow.id} className="cursor-pointer hover:bg-accent/5">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(workflow.status)}
                          {getWorkflowTypeIcon(workflow.workflowType)}
                        </div>
                        <h3 className="text-lg font-medium">{workflow.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {workflow.description}
                      </p>

                      {workflow.assetName && (
                        <div className="flex items-center gap-2 mb-2 text-sm">
                          <span className="text-muted-foreground">Related asset:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium">{workflow.assetName}</span>
                            {workflow.cloudPlatform && (
                              <CloudProviderSelector 
                                provider={workflow.cloudPlatform}
                                size="sm" 
                              />
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span>Owner: {workflow.owner}</span>
                        <span>Created: {new Date(workflow.createdAt).toLocaleDateString()}</span>
                        {workflow.dueDate && (
                          <span>Due: {new Date(workflow.dueDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col gap-2 items-end">
                      {getStatusBadge(workflow.status)}
                      
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        {(workflow.status === "pending" || workflow.status === "in-progress") && (
                          <Button size="sm">Take Action</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredWorkflows.length === 0 && (
              <div className="text-center py-12 border border-dashed border-border rounded-lg mt-6">
                <p className="text-muted-foreground">No workflows found.</p>
                <Button variant="link" onClick={() => setActiveTab("all")}>
                  View all workflows
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Workflows;
