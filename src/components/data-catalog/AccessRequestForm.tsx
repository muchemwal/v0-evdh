import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { DataAsset } from "@/lib/governance-types";
import { WorkflowStatus } from "@/lib/governance-types";

const accessLevels = [
  { id: "read", name: "Read Only" },
  { id: "write", name: "Read/Write" },
  { id: "admin", name: "Administrative" },
];

const formSchema = z.object({
  purpose: z.string().min(10, "Purpose must be at least 10 characters"),
  accessLevel: z.string().min(1, "Access level is required"),
  duration: z.string().min(1, "Duration is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface AccessRequestFormProps {
  asset: DataAsset;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AccessRequestForm({ asset, onClose, onSuccess }: AccessRequestFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purpose: "",
      accessLevel: "read",
      duration: "30",
    },
  });

  const handleRequestAccess = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + parseInt(values.duration));

      const { data, error } = await supabase
        .from("workflows")
        .insert([
          {
            title: `Access Request: ${asset.title}`,
            description: `Request for ${values.accessLevel} access to ${asset.title} - ${values.purpose}`,
            status: "pending",
            owner_id: user.id,
            owner_name: user.email?.split("@")[0] || "Unknown",
            asset_id: asset.id,
            workflow_type: "access",
            due_date: expirationDate.toISOString(),
          }
        ]);
      if (error) throw error;

      toast({
        title: "Access Request Submitted",
        description: "Your access request has been submitted and is awaiting approval.",
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Error submitting access request:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit access request",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRequestAccess)} className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Request Access to {asset.title}</h3>
          <p className="text-sm text-muted-foreground">
            Complete this form to request access to this data asset.
          </p>
        </div>

        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Purpose</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Explain why you need access to this data asset..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="accessLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Access Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {accessLevels.map((level) => (
                      <SelectItem key={level.id} value={level.id}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (days)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Request Access"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
