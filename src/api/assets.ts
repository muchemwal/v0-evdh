
// Fix supabase type issues for new tables
import { supabase } from "@/integrations/supabase/client";
import { CloudProvider, AssetType } from "@/lib/governance-types";

interface CreateAssetParams {
  name: string;
  description: string;
  type: AssetType;
  cloud: CloudProvider;
}

export async function createAsset({ name, description, type, cloud }: CreateAssetParams) {
  try {
    // Get the session for auth
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('User is not authenticated');
    }
    
    // Call the Supabase Edge Function (leave this for special cloud logic), or insert directly if not set up
    // You may implement edge functions to actually create cloud resources if desired.
    // Fallback to direct insert:
    const insertResp = await supabase
      .from("data_assets")
      .insert([
        {
          title: name,
          description,
          type,
          cloud_platform: cloud,
          domain: "General",
          classification: ["Public"], // Default classification
          owner_id: session.user.id,
          owner_name: session.user.email || "Anonymous User",
        }
      ]);
      
    if (insertResp.error) {
      console.error('Error creating asset:', insertResp.error);
      throw new Error(insertResp.error.message || 'Failed to create asset');
    }
    return insertResp.data;
  } catch (error) {
    console.error('Exception creating asset:', error);
    throw error;
  }
}

export async function listAssets() {
  try {
    // Type-safe fetch from data_assets
    const { data, error } = await supabase
      .from("data_assets")
      .select("*")
      .order("last_updated", { ascending: false });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error listing assets:', error);
    throw error;
  }
}

export async function getAssetById(id: string) {
  try {
    const { data, error } = await supabase
      .from("data_assets")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error(`Error fetching asset ${id}:`, error);
    throw error;
  }
}
