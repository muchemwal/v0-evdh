import { createClient } from "@supabase/supabase-js";
import { DataClassification } from "./types";

// Define data to seed
const seedData = {
  connectors: [
    {
      name: "Customer Database",
      description: "Primary customer database with purchase history and profiles",
      type: "database",
      status: "active",
      connection_details: { 
        host: "customer-db.example.com", 
        port: 5432,
        database: "customers",
        last_connected: "2025-04-18T15:30:00Z"
      },
      last_sync: new Date().toISOString(),
      tags: ["customer", "sales", "production"],
      sync_frequency: "daily"
    },
    {
      name: "Marketing Analytics API",
      description: "API for campaign performance metrics",
      type: "api",
      status: "active",
      connection_details: { 
        url: "https://api.analytics.example.com/v2", 
        auth_type: "oauth2",
        last_connected: "2025-04-19T10:15:00Z"
      },
      last_sync: new Date().toISOString(),
      tags: ["marketing", "analytics", "campaigns"],
      sync_frequency: "hourly"
    },
    {
      name: "Vehicle Telemetry Stream",
      description: "Real-time vehicle sensor data stream",
      type: "stream",
      status: "active",
      connection_details: { 
        broker: "kafka.example.com:9092", 
        topics: ["vehicle_sensors", "battery_metrics", "location"],
        last_connected: "2025-04-20T08:45:00Z"
      },
      last_sync: new Date().toISOString(),
      tags: ["vehicle", "telemetry", "real-time"],
      sync_frequency: "continuous"
    }
  ],

  data_assets: [
    {
      title: "Customer Data",
      description: "Core customer information database with detailed profiles and purchase history",
      type: "database",
      domain: "Sales",
      classification: [DataClassification.PII, DataClassification.CONFIDENTIAL],
      cloud_platform: "aws",
      owner_name: "Sarah Johnson",
      last_updated: new Date().toISOString()
    },
    {
      title: "Vehicle Telemetry Stream",
      description: "Real-time vehicle sensor data capturing performance metrics and diagnostics",
      type: "stream",
      domain: "Engineering",
      classification: [DataClassification.TELEMETRY, DataClassification.OPERATIONAL],
      cloud_platform: "azure",
      owner_name: "Mike Chen",
      last_updated: new Date().toISOString()
    },
    {
      title: "Marketing Analytics",
      description: "Campaign performance metrics and customer engagement analysis",
      type: "dataset",
      domain: "Marketing",
      classification: [DataClassification.OPERATIONAL, DataClassification.CONFIDENTIAL],
      cloud_platform: "gcp",
      owner_name: "Jessica Wong",
      last_updated: new Date().toISOString()
    },
    {
      title: "Battery Performance API",
      description: "Battery charging and usage statistics for fleet management",
      type: "api",
      domain: "Engineering",
      classification: [DataClassification.PUBLIC],
      cloud_platform: "palantir",
      owner_name: "Alex Rivera",
      last_updated: new Date().toISOString()
    },
    {
      title: "Sales Dashboard Dataset",
      description: "Consolidated sales metrics for executive dashboards and reporting",
      type: "dataset",
      domain: "Sales",
      classification: [DataClassification.FINANCIAL, DataClassification.CONFIDENTIAL],
      cloud_platform: "aws",
      owner_name: "David Miller",
      last_updated: new Date(Date.now() - 86400000 * 3).toISOString() // 3 days ago
    },
    {
      title: "Customer Feedback API",
      description: "API integration with customer feedback and review platforms",
      type: "api",
      domain: "Customer Support",
      classification: [DataClassification.PUBLIC],
      cloud_platform: "gcp",
      owner_name: "Emily Taylor",
      last_updated: new Date(Date.now() - 86400000 * 5).toISOString() // 5 days ago
    },
    {
      title: "Production Metrics Stream",
      description: "Real-time manufacturing and production line telemetry",
      type: "stream",
      domain: "Manufacturing",
      classification: [DataClassification.OPERATIONAL],
      cloud_platform: "azure",
      owner_name: "Robert Johnson",
      last_updated: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
    }
  ],

  workflows: [
    {
      title: "Vehicle Data Access Request",
      description: "Request for access to vehicle telemetry data for research purposes",
      status: "in-progress",
      owner_name: "Alex Rivera",
      created_at: "2025-04-15T00:00:00Z",
      due_date: "2025-04-22T00:00:00Z",
      workflow_type: "access"
    },
    {
      title: "Customer Data Migration Approval",
      description: "Approval for migrating customer data to new cloud storage",
      status: "pending",
      owner_name: "Sarah Johnson",
      created_at: "2025-04-16T00:00:00Z",
      due_date: "2025-04-25T00:00:00Z",
      workflow_type: "approval"
    },
    {
      title: "Battery Analytics Model Registration",
      description: "Register new machine learning model for battery life prediction",
      status: "completed",
      owner_name: "Emma Wilson",
      created_at: "2025-04-10T00:00:00Z",
      workflow_type: "governance"
    },
    {
      title: "Marketing Data Access Request",
      description: "Request access to campaign analytics for quarterly review",
      status: "pending",
      owner_name: "Jessica Wong",
      created_at: "2025-04-18T00:00:00Z",
      due_date: "2025-04-24T00:00:00Z", 
      workflow_type: "access"
    },
    {
      title: "Production Data Quality Review",
      description: "Review of data quality metrics for manufacturing datasets",
      status: "in-progress",
      owner_name: "Robert Johnson", 
      created_at: "2025-04-17T00:00:00Z",
      due_date: "2025-04-26T00:00:00Z",
      workflow_type: "governance"
    }
  ],

  data_classifications: [
    {
      field_name: "email",
      field_type: "string",
      classification: "PII",
      confidence: 0.98
    },
    {
      field_name: "phone_number",
      field_type: "string",
      classification: "PII",
      confidence: 0.97
    },
    {
      field_name: "vehicle_id",
      field_type: "string",
      classification: "INTERNAL",
      confidence: 0.95
    },
    {
      field_name: "battery_level",
      field_type: "float",
      classification: "PUBLIC",
      confidence: 0.99
    }
  ],

  schema_changes: [
    {
      connector_name: "Customer Database",
      changes_count: 3,
      changes: [
        { field: "customer_preferences", type: "json", change: "New field added" },
        { field: "email", type: "string", change: "Length increased from 128 to 256" },
        { field: "last_purchase", type: "timestamp", change: "Index added" }
      ],
      detected_at: new Date().toISOString()
    },
    {
      connector_name: "Vehicle Telemetry Stream",
      changes_count: 2,
      changes: [
        { field: "battery_temperature", type: "float", change: "New field added" },
        { field: "location_precision", type: "float", change: "Default value changed from 0.1 to 0.01" }
      ],
      detected_at: new Date().toISOString()
    }
  ]
};

export async function seedSupabaseData(supabase: any) {
  console.log("Starting Supabase data seeding...");
  let user;
  try {
    const userResp = await supabase.auth.getUser();
    user = userResp?.data?.user;
  } catch (e) {
    user = null;
  }

  const userId = user?.id;
  try {
    // Check if data already exists to prevent duplicates
    const { count: connectorCount } = await supabase
      .from('connectors')
      .select('*', { count: 'exact', head: true });
      
    if (connectorCount === 0) {
      console.log("Seeding connectors...");
      
      // Insert connectors
      for (const connector of seedData.connectors) {
        const { error } = await supabase
          .from('connectors')
          .insert([connector]);
          
        if (error) {
          console.error("Error inserting connector:", error);
        }
      }
    } else {
      console.log(`Skipping connectors: ${connectorCount} records already exist`);
    }
    
    // Check for data_assets table and seed if empty
    const { count: assetsCount } = await supabase
      .from('data_assets')
      .select('*', { count: 'exact', head: true });
      
    if (assetsCount === 0 && userId) {
      console.log("Seeding data assets...");
      
      // Insert assets with owner_id set to the current user
      const assetsWithOwner = seedData.data_assets.map(asset => ({
        ...asset,
        owner_id: userId
      }));
      
      for (const asset of assetsWithOwner) {
        const { error } = await supabase
          .from('data_assets')
          .insert([asset]);
          
        if (error) {
          console.error("Error inserting data asset:", error);
        }
      }
    } else {
      console.log(`Skipping data assets: ${assetsCount} records already exist or no user ID available`);
    }
    
    // Check for workflows table and seed if empty
    const { count: workflowsCount } = await supabase
      .from('workflows')
      .select('*', { count: 'exact', head: true });
      
    if (workflowsCount === 0 && userId) {
      console.log("Seeding workflows...");
      
      // Get asset IDs to reference
      const { data: assets } = await supabase
        .from('data_assets')
        .select('id, title');
        
      if (assets && assets.length > 0) {
        const workflowsWithRefs = seedData.workflows.map((workflow, index) => {
          // Map each workflow to an asset if available
          const assetIndex = index % assets.length;
          return {
            ...workflow,
            owner_id: userId,
            asset_id: assets[assetIndex].id
          };
        });
        
        for (const workflow of workflowsWithRefs) {
          const { error } = await supabase
            .from('workflows')
            .insert([workflow]);
            
          if (error) {
            console.error("Error inserting workflow:", error);
          }
        }
      }
    } else {
      console.log(`Skipping workflows: ${workflowsCount} records already exist or no user ID available`);
    }
    
    // Seed data classifications if needed
    const { count: classificationsCount } = await supabase
      .from('data_classifications')
      .select('*', { count: 'exact', head: true });
      
    if (classificationsCount === 0) {
      console.log("Seeding data classifications...");
      
      // Get first connector ID to reference
      const { data: connectors } = await supabase
        .from('connectors')
        .select('id')
        .limit(1);
        
      if (connectors && connectors.length > 0) {
        const classificationsWithConnector = seedData.data_classifications.map(classification => ({
          ...classification,
          connector_id: connectors[0].id
        }));
        
        const { error } = await supabase
          .from('data_classifications')
          .insert(classificationsWithConnector);
          
        if (error) {
          console.error("Error inserting data classifications:", error);
        }
      }
    } else {
      console.log(`Skipping data classifications: ${classificationsCount} records already exist`);
    }
    
    // Seed schema changes if needed
    const { count: schemaChangesCount } = await supabase
      .from('schema_changes')
      .select('*', { count: 'exact', head: true });
      
    if (schemaChangesCount === 0) {
      console.log("Seeding schema changes...");
      
      // Get connector IDs to reference
      const { data: connectors } = await supabase
        .from('connectors')
        .select('id, name');
        
      if (connectors && connectors.length > 0) {
        const schemaChangesWithConnector = seedData.schema_changes.map(change => {
          // Find matching connector by name
          const connector = connectors.find(c => c.name === change.connector_name);
          return {
            ...change,
            connector_id: connector?.id
          };
        });
        
        const { error } = await supabase
          .from('schema_changes')
          .insert(schemaChangesWithConnector);
          
        if (error) {
          console.error("Error inserting schema changes:", error);
        }
      }
    } else {
      console.log(`Skipping schema changes: ${schemaChangesCount} records already exist`);
    }
    
    console.log("Completed Supabase data seeding.");
    return true;
  } catch (error) {
    console.error("Error during data seeding:", error);
    return false;
  }
}
