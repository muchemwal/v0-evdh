
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WorkflowStatus, Workflow } from "@/lib/governance-types";

interface ApprovalActionsProps {
  workflow: Workflow;
  onActionComplete?: () => void;
}

export default function ApprovalActions({ workflow, onActionComplete }: ApprovalActionsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState("");
  const { toast } = useToast();

  const handleApproval = async (approved: boolean) => {
    try {
      setIsSubmitting(true);
      
      const status: WorkflowStatus = approved ? "completed" : "rejected";
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      // Update the workflow status
      const { error } = await supabase
        .from("workflows")
        .update({
          status,
          reviewer_id: user.id,
          reviewer_name: user.email?.split("@")[0] || "Unknown",
        })
        .eq("id", workflow.id);
        
      if (error) throw error;
      
      toast({
        title: approved ? "Request Approved" : "Request Rejected",
        description: `The workflow has been ${approved ? "approved" : "rejected"}.`,
      });
      
      if (onActionComplete) {
        onActionComplete();
      }
    } catch (error) {
      console.error("Error processing workflow action:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process your action",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="comments">Comments (optional)</Label>
        <Textarea
          id="comments"
          placeholder="Add any comments about your decision..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => handleApproval(false)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <X className="mr-2 h-4 w-4" /> Reject
            </>
          )}
        </Button>
        
        <Button
          onClick={() => handleApproval(true)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> Approve
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
