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
      anomalies: {
        Row: {
          id: string
          property_id: string
          owner_id: string
          type: Database["public"]["Enums"]["anomaly_type"]
          reservation_a_id: string | null
          reservation_b_id: string | null
          description: string
          status: Database["public"]["Enums"]["anomaly_status"]
          resolved_at: string | null
          resolved_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          owner_id?: string
          type: Database["public"]["Enums"]["anomaly_type"]
          reservation_a_id?: string | null
          reservation_b_id?: string | null
          description: string
          status?: Database["public"]["Enums"]["anomaly_status"]
          resolved_at?: string | null
          resolved_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          owner_id?: string
          type?: Database["public"]["Enums"]["anomaly_type"]
          reservation_a_id?: string | null
          reservation_b_id?: string | null
          description?: string
          status?: Database["public"]["Enums"]["anomaly_status"]
          resolved_at?: string | null
          resolved_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "anomalies_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anomalies_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anomalies_reservation_a_id_fkey"
            columns: ["reservation_a_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anomalies_reservation_b_id_fkey"
            columns: ["reservation_b_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anomalies_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cleaning_tasks: {
        Row: {
          id: string
          reservation_id: string | null
          property_id: string
          owner_id: string
          assigned_to: string | null
          type: Database["public"]["Enums"]["task_type"]
          status: Database["public"]["Enums"]["task_status"]
          scheduled_date: string
          scheduled_time: string | null
          started_at: string | null
          completed_at: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reservation_id?: string | null
          property_id: string
          owner_id?: string
          assigned_to?: string | null
          type: Database["public"]["Enums"]["task_type"]
          status?: Database["public"]["Enums"]["task_status"]
          scheduled_date: string
          scheduled_time?: string | null
          started_at?: string | null
          completed_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reservation_id?: string | null
          property_id?: string
          owner_id?: string
          assigned_to?: string | null
          type?: Database["public"]["Enums"]["task_type"]
          status?: Database["public"]["Enums"]["task_status"]
          scheduled_date?: string
          scheduled_time?: string | null
          started_at?: string | null
          completed_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cleaning_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cleaning_tasks_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cleaning_tasks_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cleaning_tasks_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      issues: {
        Row: {
          id: string
          task_id: string | null
          property_id: string
          owner_id: string
          reported_by: string
          type: Database["public"]["Enums"]["issue_type"]
          description: string
          photo_path: string | null
          status: Database["public"]["Enums"]["issue_status"]
          resolved_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          task_id?: string | null
          property_id: string
          owner_id?: string
          reported_by?: string
          type: Database["public"]["Enums"]["issue_type"]
          description: string
          photo_path?: string | null
          status?: Database["public"]["Enums"]["issue_status"]
          resolved_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          task_id?: string | null
          property_id?: string
          owner_id?: string
          reported_by?: string
          type?: Database["public"]["Enums"]["issue_type"]
          description?: string
          photo_path?: string | null
          status?: Database["public"]["Enums"]["issue_status"]
          resolved_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "issues_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "issues_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "issues_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "issues_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "cleaning_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      message_templates: {
        Row: {
          id: string
          owner_id: string
          trigger_event: string
          subject: string
          body: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          trigger_event: string
          subject: string
          body: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          trigger_event?: string
          subject?: string
          body?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_templates_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: Database["public"]["Enums"]["notification_type"]
          title: string
          body: string
          data: Json
          is_read: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: Database["public"]["Enums"]["notification_type"]
          title: string
          body: string
          data?: Json
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: Database["public"]["Enums"]["notification_type"]
          title?: string
          body?: string
          data?: Json
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string
          avatar_url: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          owner_id: string | null
          push_token: string | null
          preferences: Json
          is_active: boolean
          created_at: string
          updated_at: string
          last_login_at: string | null
        }
        Insert: {
          id: string
          email: string
          display_name: string
          avatar_url?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          owner_id?: string | null
          push_token?: string | null
          preferences?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          display_name?: string
          avatar_url?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          owner_id?: string | null
          push_token?: string | null
          preferences?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          id: string
          owner_id: string
          name: string
          address: string
          city: string | null
          postal_code: string | null
          country: string
          access_code: string | null
          wifi_ssid: string | null
          wifi_password: string | null
          instructions: string | null
          max_guests: number | null
          ical_airbnb_url: string | null
          ical_booking_url: string | null
          imap_host: string | null
          imap_email: string | null
          check_in_mode: Database["public"]["Enums"]["check_in_mode"]
          imap_configured: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id?: string
          name: string
          address: string
          city?: string | null
          postal_code?: string | null
          country?: string
          access_code?: string | null
          wifi_ssid?: string | null
          wifi_password?: string | null
          instructions?: string | null
          max_guests?: number | null
          ical_airbnb_url?: string | null
          ical_booking_url?: string | null
          imap_host?: string | null
          imap_email?: string | null
          check_in_mode?: Database["public"]["Enums"]["check_in_mode"]
          imap_configured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          address?: string
          city?: string | null
          postal_code?: string | null
          country?: string
          access_code?: string | null
          wifi_ssid?: string | null
          wifi_password?: string | null
          instructions?: string | null
          max_guests?: number | null
          ical_airbnb_url?: string | null
          ical_booking_url?: string | null
          imap_host?: string | null
          imap_email?: string | null
          check_in_mode?: Database["public"]["Enums"]["check_in_mode"]
          imap_configured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "properties_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_checklists: {
        Row: {
          id: string
          property_id: string
          owner_id: string
          type: Database["public"]["Enums"]["task_type"]
          items: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          owner_id?: string
          type: Database["public"]["Enums"]["task_type"]
          items?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          owner_id?: string
          type?: Database["public"]["Enums"]["task_type"]
          items?: Json
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_checklists_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_checklists_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          id: string
          property_id: string
          owner_id: string
          platform: Database["public"]["Enums"]["reservation_platform"]
          platform_ref_id: string | null
          status: Database["public"]["Enums"]["reservation_status"]
          source: Database["public"]["Enums"]["reservation_source"]
          guest_name: string | null
          guest_email: string | null
          nb_guests: number
          check_in: string
          check_out: string
          check_in_time: string | null
          check_out_time: string | null
          arrival_time: string | null
          guest_message: string | null
          special_requests: string | null
          checkin_token: string | null
          amount: number | null
          reconciliation_status: Database["public"]["Enums"]["reconciliation_status"]
          reconciliation_confidence: number | null
          ical_uid: string | null
          email_message_id: string | null
          raw_ical_data: Json | null
          raw_email_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          owner_id?: string
          platform: Database["public"]["Enums"]["reservation_platform"]
          platform_ref_id?: string | null
          status?: Database["public"]["Enums"]["reservation_status"]
          source?: Database["public"]["Enums"]["reservation_source"]
          guest_name?: string | null
          guest_email?: string | null
          nb_guests?: number
          check_in: string
          check_out: string
          check_in_time?: string | null
          check_out_time?: string | null
          arrival_time?: string | null
          guest_message?: string | null
          special_requests?: string | null
          checkin_token?: string | null
          amount?: number | null
          reconciliation_status?: Database["public"]["Enums"]["reconciliation_status"]
          reconciliation_confidence?: number | null
          ical_uid?: string | null
          email_message_id?: string | null
          raw_ical_data?: Json | null
          raw_email_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          owner_id?: string
          platform?: Database["public"]["Enums"]["reservation_platform"]
          platform_ref_id?: string | null
          status?: Database["public"]["Enums"]["reservation_status"]
          source?: Database["public"]["Enums"]["reservation_source"]
          guest_name?: string | null
          guest_email?: string | null
          nb_guests?: number
          check_in?: string
          check_out?: string
          check_in_time?: string | null
          check_out_time?: string | null
          arrival_time?: string | null
          guest_message?: string | null
          special_requests?: string | null
          checkin_token?: string | null
          amount?: number | null
          reconciliation_status?: Database["public"]["Enums"]["reconciliation_status"]
          reconciliation_confidence?: number | null
          ical_uid?: string | null
          email_message_id?: string | null
          raw_ical_data?: Json | null
          raw_email_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      sent_messages: {
        Row: {
          id: string
          reservation_id: string | null
          template_id: string | null
          trigger_event: string | null
          channel: string
          recipient_email: string | null
          status: string
          error_message: string | null
          sent_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reservation_id?: string | null
          template_id?: string | null
          trigger_event?: string | null
          channel?: string
          recipient_email?: string | null
          status?: string
          error_message?: string | null
          sent_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reservation_id?: string | null
          template_id?: string | null
          trigger_event?: string | null
          channel?: string
          recipient_email?: string | null
          status?: string
          error_message?: string | null
          sent_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sent_messages_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_invitations: {
        Row: {
          id: string
          owner_id: string
          email: string | null
          token: string
          status: Database["public"]["Enums"]["invitation_status"]
          accepted_by: string | null
          expires_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id?: string
          email?: string | null
          token?: string
          status?: Database["public"]["Enums"]["invitation_status"]
          accepted_by?: string | null
          expires_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          email?: string | null
          token?: string
          status?: Database["public"]["Enums"]["invitation_status"]
          accepted_by?: string | null
          expires_at?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_invitations_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_invitations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sync_logs: {
        Row: {
          id: string
          property_id: string
          owner_id: string
          source: Database["public"]["Enums"]["sync_source"]
          status: Database["public"]["Enums"]["sync_status"]
          events_processed: number
          events_created: number
          events_updated: number
          error_message: string | null
          duration_ms: number | null
          synced_at: string
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          owner_id: string
          source: Database["public"]["Enums"]["sync_source"]
          status: Database["public"]["Enums"]["sync_status"]
          events_processed?: number
          events_created?: number
          events_updated?: number
          error_message?: string | null
          duration_ms?: number | null
          synced_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          owner_id?: string
          source?: Database["public"]["Enums"]["sync_source"]
          status?: Database["public"]["Enums"]["sync_status"]
          events_processed?: number
          events_created?: number
          events_updated?: number
          error_message?: string | null
          duration_ms?: number | null
          synced_at?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sync_logs_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sync_logs_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      task_checklist_items: {
        Row: {
          id: string
          task_id: string
          label: string
          is_completed: boolean
          is_done: boolean
          position: number
          sort_order: number
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          task_id: string
          label: string
          is_completed?: boolean
          is_done?: boolean
          position?: number
          sort_order?: number
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          label?: string
          is_completed?: boolean
          is_done?: boolean
          position?: number
          sort_order?: number
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_checklist_items_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "cleaning_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_photos: {
        Row: {
          id: string
          task_id: string
          checklist_item_id: string | null
          storage_path: string
          caption: string | null
          uploaded_at: string
          created_at: string
        }
        Insert: {
          id?: string
          task_id: string
          checklist_item_id?: string | null
          storage_path: string
          caption?: string | null
          uploaded_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          checklist_item_id?: string | null
          storage_path?: string
          caption?: string | null
          uploaded_at?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_photos_checklist_item_id_fkey"
            columns: ["checklist_item_id"]
            isOneToOne: false
            referencedRelation: "task_checklist_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_photos_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "cleaning_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      welcome_guides: {
        Row: {
          id: string
          property_id: string
          owner_id: string
          slug: string
          content: Json
          qr_code_url: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          owner_id?: string
          slug: string
          content?: Json
          qr_code_url?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          owner_id?: string
          slug?: string
          content?: Json
          qr_code_url?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "welcome_guides_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "welcome_guides_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_invitation: {
        Args: {
          email?: string
        }
        Returns: Json
      }
      get_public_welcome_guide: {
        Args: {
          slug: string
        }
        Returns: Json
      }
      mark_all_notifications_read: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      validate_invitation: {
        Args: {
          token: string
        }
        Returns: Json
      }
    }
    Enums: {
      anomaly_status: "pending" | "resolved" | "false_positive"
      anomaly_type:
        | "double_reservation"
        | "missing_reservation"
        | "date_mismatch"
        | "sync_failure"
      check_in_mode: "self_checkin" | "staff_checkin"
      invitation_status: "pending" | "accepted" | "expired"
      issue_status: "open" | "acknowledged" | "resolved"
      issue_type: "leak" | "breakage" | "missing" | "other"
      notification_type:
        | "new_reservation"
        | "cancellation"
        | "anomaly"
        | "task_assigned"
        | "task_completed"
        | "issue_reported"
        | "sync_failure"
        | "daily_digest"
      reconciliation_status: "pending" | "matched" | "conflict" | "manual"
      reservation_platform: "airbnb" | "booking" | "manual"
      reservation_source: "ical" | "email" | "manual"
      reservation_status: "pending" | "confirmed" | "modified" | "cancelled"
      sync_source: "ical_airbnb" | "ical_booking" | "email_imap"
      sync_status: "success" | "partial" | "failure"
      task_status: "pending" | "in_progress" | "completed"
      task_type: "checkin_prep" | "checkout_clean" | "check_in_greeting" | "ad_hoc"
      user_role: "owner" | "cleaning_staff" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
