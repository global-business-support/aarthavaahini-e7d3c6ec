export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          activity_type: string
          created_at: string
          created_by: string | null
          customer_id: string | null
          id: string
          lead_id: string | null
          notes: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          id?: string
          lead_id?: string | null
          notes?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          id?: string
          lead_id?: string | null
          notes?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          aadhaar: string | null
          address: string | null
          created_at: string
          customer_name: string
          email: string | null
          id: string
          income: number | null
          lead_id: string | null
          mobile: string | null
          occupation: string | null
          pan: string | null
        }
        Insert: {
          aadhaar?: string | null
          address?: string | null
          created_at?: string
          customer_name: string
          email?: string | null
          id?: string
          income?: number | null
          lead_id?: string | null
          mobile?: string | null
          occupation?: string | null
          pan?: string | null
        }
        Update: {
          aadhaar?: string | null
          address?: string | null
          created_at?: string
          customer_name?: string
          email?: string | null
          id?: string
          income?: number | null
          lead_id?: string | null
          mobile?: string | null
          occupation?: string | null
          pan?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          customer_id: string | null
          document_type: string
          file_url: string
          id: string
          uploaded_at: string
        }
        Insert: {
          customer_id?: string | null
          document_type: string
          file_url: string
          id?: string
          uploaded_at?: string
        }
        Update: {
          customer_id?: string | null
          document_type?: string
          file_url?: string
          id?: string
          uploaded_at?: string
        }
        Relationships: []
      }
      employee_schedules: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          duration_minutes: number
          employee_id: string
          id: string
          location: string | null
          priority: string
          scheduled_for: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration_minutes?: number
          employee_id: string
          id?: string
          location?: string | null
          priority?: string
          scheduled_for: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration_minutes?: number
          employee_id?: string
          id?: string
          location?: string | null
          priority?: string
          scheduled_for?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      insurance_cases: {
        Row: {
          created_at: string
          customer_id: string | null
          id: string
          insurer: string | null
          policy_status: string
          policy_type: string
          premium: number | null
          renewal_date: string | null
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          id?: string
          insurer?: string | null
          policy_status?: string
          policy_type: string
          premium?: number | null
          renewal_date?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          id?: string
          insurer?: string | null
          policy_status?: string
          policy_type?: string
          premium?: number | null
          renewal_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insurance_cases_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          aadhaar: string | null
          amount: number | null
          assigned_to: string | null
          city: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          lead_name: string | null
          lead_source: string | null
          message: string | null
          pan: string | null
          phone: string
          product_name: string | null
          product_type: string
          state: string | null
          status: string
        }
        Insert: {
          aadhaar?: string | null
          amount?: number | null
          assigned_to?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          lead_name?: string | null
          lead_source?: string | null
          message?: string | null
          pan?: string | null
          phone: string
          product_name?: string | null
          product_type: string
          state?: string | null
          status?: string
        }
        Update: {
          aadhaar?: string | null
          amount?: number | null
          assigned_to?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          lead_name?: string | null
          lead_source?: string | null
          message?: string | null
          pan?: string | null
          phone?: string
          product_name?: string | null
          product_type?: string
          state?: string | null
          status?: string
        }
        Relationships: []
      }
      loan_cases: {
        Row: {
          created_at: string
          customer_id: string | null
          disbursement_amount: number | null
          id: string
          lender_name: string | null
          loan_amount: number | null
          loan_type: string
          sanction_amount: number | null
          stage: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          disbursement_amount?: number | null
          id?: string
          lender_name?: string | null
          loan_amount?: number | null
          loan_type: string
          sanction_amount?: number | null
          stage?: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          disbursement_amount?: number | null
          id?: string
          lender_name?: string | null
          loan_amount?: number | null
          loan_type?: string
          sanction_amount?: number | null
          stage?: string
        }
        Relationships: [
          {
            foreignKeyName: "loan_cases_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      mutual_funds: {
        Row: {
          created_at: string
          customer_id: string | null
          fund_name: string
          id: string
          investment_type: string | null
          sip_amount: number | null
          status: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          fund_name: string
          id?: string
          investment_type?: string | null
          sip_amount?: number | null
          status?: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          fund_name?: string
          id?: string
          investment_type?: string | null
          sip_amount?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "mutual_funds_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string
          related_customer_id: string | null
          related_lead_id: string | null
          status: string
          task_type: string | null
          title: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          related_customer_id?: string | null
          related_lead_id?: string | null
          status?: string
          task_type?: string | null
          title: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          related_customer_id?: string | null
          related_lead_id?: string | null
          status?: string
          task_type?: string | null
          title?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role:
        | "admin"
        | "user"
        | "manager"
        | "sales_executive"
        | "operations"
        | "insurance_executive"
        | "mf_executive"
        | "customer"
        | "partner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "user",
        "manager",
        "sales_executive",
        "operations",
        "insurance_executive",
        "mf_executive",
        "customer",
        "partner",
      ],
    },
  },
} as const
