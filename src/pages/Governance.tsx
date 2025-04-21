
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import WorkflowCard from "@/components/governance/WorkflowCard";
import { ApprovalStatus } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Governance = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Governance</h1>
        <Button>Create Workflow</Button>
      </div>
      
      <Tabs defaultValue="workflows">
        <TabsList className="mb-6">
          <TabsTrigger value="workflows">Active Workflows</TabsTrigger>
          <TabsTrigger value="policies">Governance Policies</TabsTrigger>
          <TabsTrigger value="roles">Roles & Responsibilities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="workflows">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Pending Review</h2>
              <div className="space-y-4">
                <WorkflowCard
                  title="Vehicle Telemetry Schema"
                  assetType="Data Schema"
                  status={ApprovalStatus.PENDING_REVIEW}
                  currentStep="Data Steward Review"
                  assignee="Maria Garcia"
                  dueDate="Tomorrow at 5:00 PM"
                />
                <WorkflowCard
                  title="Customer API Connection"
                  assetType="API Connection"
                  status={ApprovalStatus.PENDING_REVIEW}
                  currentStep="Security Review"
                  assignee="John Smith"
                  dueDate="Friday at 12:00 PM"
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">In Progress</h2>
              <div className="space-y-4">
                <WorkflowCard
                  title="Battery Analytics Model"
                  assetType="Data Model"
                  status={ApprovalStatus.UNDER_REVIEW}
                  currentStep="Architecture Review"
                  assignee="Ahmed Hassan"
                  dueDate="Today at 3:00 PM"
                />
                <WorkflowCard
                  title="Sales Dashboard"
                  assetType="BI Dashboard"
                  status={ApprovalStatus.UNDER_REVIEW}
                  currentStep="Data Owner Review"
                  assignee="Emma Wilson"
                  dueDate="Monday at 10:00 AM"
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Recently Completed</h2>
              <div className="space-y-4">
                <WorkflowCard
                  title="Manufacturing Database"
                  assetType="Data Source"
                  status={ApprovalStatus.APPROVED}
                  currentStep="Completed"
                  assignee="System"
                  dueDate="Completed yesterday"
                />
                <WorkflowCard
                  title="Customer Segmentation Model"
                  assetType="Analytics Model"
                  status={ApprovalStatus.REJECTED}
                  currentStep="Returned to Creator"
                  assignee="You"
                  dueDate="Action required"
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="policies">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Classification Policy</CardTitle>
                <CardDescription>Guidelines for classifying data assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="border rounded-md p-3">
                      <h3 className="text-sm font-medium">PII</h3>
                      <p className="text-xs text-muted-foreground">Personally Identifiable Information requiring strict controls</p>
                    </div>
                    <div className="border rounded-md p-3">
                      <h3 className="text-sm font-medium">PHI</h3>
                      <p className="text-xs text-muted-foreground">Protected Health Information subject to regulatory compliance</p>
                    </div>
                    <div className="border rounded-md p-3">
                      <h3 className="text-sm font-medium">Confidential</h3>
                      <p className="text-xs text-muted-foreground">Business sensitive with restricted access</p>
                    </div>
                    <div className="border rounded-md p-3">
                      <h3 className="text-sm font-medium">Public</h3>
                      <p className="text-xs text-muted-foreground">Available to all with no restrictions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Approval Workflows</CardTitle>
                <CardDescription>Standard workflow processes for data governance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute left-4 top-0 h-full w-0.5 bg-border"></div>
                    <div className="space-y-8">
                      <div className="relative pl-12">
                        <div className="absolute left-[0.4rem] top-1 h-7 w-7 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                          <span className="font-medium text-xs">1</span>
                        </div>
                        <h3 className="font-medium">Creator Submission</h3>
                        <p className="text-sm text-muted-foreground">Initial creation and documentation of data asset</p>
                      </div>
                      <div className="relative pl-12">
                        <div className="absolute left-[0.4rem] top-1 h-7 w-7 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                          <span className="font-medium text-xs">2</span>
                        </div>
                        <h3 className="font-medium">Data Steward Review</h3>
                        <p className="text-sm text-muted-foreground">Review of data quality, metadata, and classifications</p>
                      </div>
                      <div className="relative pl-12">
                        <div className="absolute left-[0.4rem] top-1 h-7 w-7 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                          <span className="font-medium text-xs">3</span>
                        </div>
                        <h3 className="font-medium">Data Owner Approval</h3>
                        <p className="text-sm text-muted-foreground">Business approval for the data asset</p>
                      </div>
                      <div className="relative pl-12">
                        <div className="absolute left-[0.4rem] top-1 h-7 w-7 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                          <span className="font-medium text-xs">4</span>
                        </div>
                        <h3 className="font-medium">Architecture Review</h3>
                        <p className="text-sm text-muted-foreground">Technical and architectural compliance review</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="roles">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Role Definitions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <h3 className="font-medium">Data Owner</h3>
                    <p className="text-sm text-muted-foreground">Accountable for the data asset and its appropriate use. Typically a business leader.</p>
                  </div>
                  <div className="border-b pb-3">
                    <h3 className="font-medium">Data Steward</h3>
                    <p className="text-sm text-muted-foreground">Responsible for data quality, metadata, and compliance with standards.</p>
                  </div>
                  <div className="border-b pb-3">
                    <h3 className="font-medium">Data Creator</h3>
                    <p className="text-sm text-muted-foreground">Subject matter expert who creates or modifies data assets.</p>
                  </div>
                  <div className="pb-3">
                    <h3 className="font-medium">Enterprise Architect</h3>
                    <p className="text-sm text-muted-foreground">Ensures alignment with technical and architectural standards.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Permission Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">Role</th>
                        <th className="text-center py-2 font-medium">View</th>
                        <th className="text-center py-2 font-medium">Edit</th>
                        <th className="text-center py-2 font-medium">Approve</th>
                        <th className="text-center py-2 font-medium">Admin</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Viewer</td>
                        <td className="text-center">✓</td>
                        <td className="text-center">-</td>
                        <td className="text-center">-</td>
                        <td className="text-center">-</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Creator</td>
                        <td className="text-center">✓</td>
                        <td className="text-center">✓</td>
                        <td className="text-center">-</td>
                        <td className="text-center">-</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Steward</td>
                        <td className="text-center">✓</td>
                        <td className="text-center">✓</td>
                        <td className="text-center">✓</td>
                        <td className="text-center">-</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Owner</td>
                        <td className="text-center">✓</td>
                        <td className="text-center">✓</td>
                        <td className="text-center">✓</td>
                        <td className="text-center">-</td>
                      </tr>
                      <tr>
                        <td className="py-2">Admin</td>
                        <td className="text-center">✓</td>
                        <td className="text-center">✓</td>
                        <td className="text-center">✓</td>
                        <td className="text-center">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Governance;
