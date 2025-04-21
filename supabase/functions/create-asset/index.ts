
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CreateAssetRequest {
  name: string;
  description: string;
  type: string;
  cloud: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get supabase client and env variables
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify user is authenticated
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get request data
    const { name, description, type, cloud } = await req.json() as CreateAssetRequest;

    // Simulate creating a resource in the chosen cloud platform
    // In a real implementation, this would use SDKs for the respective cloud providers
    const resourceId = `${cloud}-${type}-${Date.now()}`;
    
    // Insert into data_assets table
    const { data, error } = await supabase
      .from("data_assets")
      .insert([
        {
          title: name,
          description: description,
          type: type,
          domain: "Default",
          classification: ["PUBLIC"],
          cloud_platform: cloud,
          owner_id: user.id,
          owner_name: user.email || "Unknown",
          last_updated: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("DB Error:", error);
      return new Response(JSON.stringify({ error: "Failed to create asset in database" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: `Asset created in ${cloud}`,
      resourceId,
      assetId: data[0].id
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
