
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DataSourceType } from "@/lib/types";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConnectorFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  connector?: any;
}

// Define the form schema using Zod
const connectorFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  type: z.nativeEnum(DataSourceType),
  connectionDetails: z.string().min(5, { message: "Connection details are required" }),
  frequency: z.string().optional(),
  tags: z.string().optional(),
});

export type ConnectorFormValues = z.infer<typeof connectorFormSchema>;

const ConnectorForm = ({ onSubmit, onCancel, connector }: ConnectorFormProps) => {
  // Initialize the form with either existing connector values or defaults
  const form = useForm<ConnectorFormValues>({
    resolver: zodResolver(connectorFormSchema),
    defaultValues: connector || {
      name: "",
      description: "",
      type: undefined,
      connectionDetails: "",
      frequency: "",
      tags: "",
    },
  });

  const handleSubmit = (data: ConnectorFormValues) => {
    // Process tags if provided
    const processedData = {
      ...data,
      status: "inactive" as const, // New connectors start as inactive
      tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : [],
    };
    
    onSubmit(processedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Connector Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Vehicle Database" {...field} />
              </FormControl>
              <FormDescription>A descriptive name for this connector</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Connector Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select connector type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(DataSourceType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>The type of system this connector interfaces with</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe what this connector does and what data it provides"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="connectionDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Connection Details</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. jdbc:postgresql://hostname:5432/dbname or https://api.example.com/v1"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Connection string, URL, or reference to a connection secret
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sync Frequency (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Daily, Hourly, Real-time" {...field} />
              </FormControl>
              <FormDescription>How often data should be synchronized</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. production, sensitive, internal (comma-separated)" {...field} />
              </FormControl>
              <FormDescription>Tags help categorize and filter connectors</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Connector</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ConnectorForm;
