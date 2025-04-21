export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      connectors: {
        Row: {
          connection_details: Json
          created_at: string | null
          description: string | null
          id: string
          last_sync: string | null
          name: string
          status: string
          sync_frequency: string | null
          tags: string[] | null
          type: string
          updated_at: string | null
        }
        Insert: {
          connection_details: Json
          created_at?: string | null
          description?: string | null
          id?: string
          last_sync?: string | null
          name: string
          status?: string
          sync_frequency?: string | null
          tags?: string[] | null
          type: string
          updated_at?: string | null
        }
        Update: {
          connection_details?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          last_sync?: string | null
          name?: string
          status?: string
          sync_frequency?: string | null
          tags?: string[] | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      data_assets: {
        Row: {
          classification: string[]
          cloud_platform: string
          created_at: string | null
          description: string | null
          domain: string
          id: string
          last_updated: string | null
          owner_id: string | null
          owner_name: string | null
          title: string
          type: string
        }
        Insert: {
          classification: string[]
          cloud_platform: string
          created_at?: string | null
          description?: string | null
          domain: string
          id?: string
          last_updated?: string | null
          owner_id?: string | null
          owner_name?: string | null
          title: string
          type: string
        }
        Update: {
          classification?: string[]
          cloud_platform?: string
          created_at?: string | null
          description?: string | null
          domain?: string
          id?: string
          last_updated?: string | null
          owner_id?: string | null
          owner_name?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      data_classifications: {
        Row: {
          classification: string
          confidence: number
          connector_id: string | null
          created_at: string | null
          field_name: string
          field_type: string
          id: string
        }
        Insert: {
          classification: string
          confidence: number
          connector_id?: string | null
          created_at?: string | null
          field_name: string
          field_type: string
          id?: string
        }
        Update: {
          classification?: string
          confidence?: number
          connector_id?: string | null
          created_at?: string | null
          field_name?: string
          field_type?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_classifications_connector_id_fkey"
            columns: ["connector_id"]
            isOneToOne: false
            referencedRelation: "connectors"
            referencedColumns: ["id"]
          },
        ]
      }
      schema_changes: {
        Row: {
          changes: Json
          changes_count: number
          connector_id: string | null
          connector_name: string
          detected_at: string | null
          id: string
        }
        Insert: {
          changes: Json
          changes_count: number
          connector_id?: string | null
          connector_name: string
          detected_at?: string | null
          id?: string
        }
        Update: {
          changes?: Json
          changes_count?: number
          connector_id?: string | null
          connector_name?: string
          detected_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "schema_changes_connector_id_fkey"
            columns: ["connector_id"]
            isOneToOne: false
            referencedRelation: "connectors"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          asset_id: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          owner_id: string | null
          owner_name: string | null
          status: string
          title: string
          workflow_type: string
        }
        Insert: {
          asset_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          owner_id?: string | null
          owner_name?: string | null
          status?: string
          title: string
          workflow_type: string
        }
        Update: {
          asset_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          owner_id?: string | null
          owner_name?: string | null
          status?: string
          title?: string
          workflow_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflows_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "data_assets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
