import { Activity, Database, FileCheck, ShieldCheck, Users } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import ConnectorStatusCard from "@/components/dashboard/ConnectorStatusCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApprovalStatus, DataClassification } from "@/lib/types";
import WorkflowCard from "@/components/governance/WorkflowCard";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TranslatedText from "@/components/ui/translated-text";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          <TranslatedText textEn="EV Data Hub Dashboard" textAr="لوحة تحكم مركز بيانات EV" />
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Data Assets"
          value={1342}
          icon={<Database className="h-5 w-5 text-primary" />}
          trend={{ value: 4.5, isPositive: true }}
          description="52 new in last 30 days"
        />
        <StatCard
          title="Pending Approvals"
          value={8}
          icon={<ShieldCheck className="h-5 w-5 text-accent" />}
          trend={{ value: 12, isPositive: false }}
        />
        <StatCard
          title="Architecture Models"
          value={24}
          icon={<FileCheck className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Active Users"
          value={86}
          icon={<Users className="h-5 w-5 text-accent" />}
          trend={{ value: 12, isPositive: true }}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              <TranslatedText textEn="Recent Activity" textAr="النشاط الحديث" />
            </CardTitle>
            <CardDescription>
              <TranslatedText 
                textEn="Latest activity across EV Data Hub" 
                textAr="أحدث الأنشطة عبر مركز بيانات EV" 
              />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="relative pl-6 border-l border-border">
                <div className="absolute left-[-5px] top-1 h-2 w-2 rounded-full bg-primary"></div>
                <p className="text-sm font-medium">Vehicle Telemetry Schema Updated</p>
                <p className="text-xs text-muted-foreground">Jane Smith updated the schema 15 minutes ago</p>
              </div>
              <div className="relative pl-6 border-l border-border">
                <div className="absolute left-[-5px] top-1 h-2 w-2 rounded-full bg-primary"></div>
                <p className="text-sm font-medium">New Architecture Model Added</p>
                <p className="text-xs text-muted-foreground">Ahmed Hassan created "Battery Data Flow" model 2 hours ago</p>
              </div>
              <div className="relative pl-6 border-l border-border">
                <div className="absolute left-[-5px] top-1 h-2 w-2 rounded-full bg-green-500"></div>
                <p className="text-sm font-medium">Customer Database Connector Approved</p>
                <p className="text-xs text-muted-foreground">Maria Garcia approved the connector 3 hours ago</p>
              </div>
              <div className="relative pl-6 border-l border-border">
                <div className="absolute left-[-5px] top-1 h-2 w-2 rounded-full bg-yellow-500"></div>
                <p className="text-sm font-medium">Data Classification Updated</p>
                <p className="text-xs text-muted-foreground">System updated classification tags 5 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <ConnectorStatusCard />
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-4">
          <TranslatedText 
            textEn="Pending Approval Workflows" 
            textAr="سير العمل المعلقة للموافقة" 
          />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <WorkflowCard 
            title="Battery Telemetry Dataset"
            assetType="Data Asset"
            status={ApprovalStatus.PENDING_REVIEW}
            currentStep="Data Steward Review"
            assignee="Maria Garcia"
            dueDate="Tomorrow at 5:00 PM"
          />
          <WorkflowCard 
            title="Customer Support API"
            assetType="Connection"
            status={ApprovalStatus.UNDER_REVIEW}
            currentStep="Data Owner Review"
            assignee="John Smith"
            dueDate="Today at 12:00 PM"
          />
          <WorkflowCard 
            title="Vehicle Analytics Model"
            assetType="Architecture Model"
            status={ApprovalStatus.DRAFT}
            currentStep="Creator Draft"
            assignee="You"
            dueDate="No due date"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
