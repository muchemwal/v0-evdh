
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApprovalStatus } from "@/lib/types";

interface WorkflowCardProps {
  title: string;
  assetType: string;
  status: ApprovalStatus;
  currentStep: string;
  assignee: string;
  dueDate: string;
}

const WorkflowCard = ({
  title,
  assetType,
  status,
  currentStep,
  assignee,
  dueDate,
}: WorkflowCardProps) => {
  const statusColors: Record<ApprovalStatus, string> = {
    [ApprovalStatus.DRAFT]: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    [ApprovalStatus.PENDING_REVIEW]: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    [ApprovalStatus.UNDER_REVIEW]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    [ApprovalStatus.APPROVED]: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    [ApprovalStatus.REJECTED]: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge className={statusColors[status]}>{status}</Badge>
        </div>
        <p className="text-xs text-muted-foreground">{assetType}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Current step:</span>
            <span className="font-medium">{currentStep}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Assignee:</span>
            <span className="font-medium">{assignee}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Due date:</span>
            <span className="font-medium">{dueDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button size="sm" variant="outline">View Details</Button>
        <Button size="sm">Take Action</Button>
      </CardFooter>
    </Card>
  );
};

export default WorkflowCard;
