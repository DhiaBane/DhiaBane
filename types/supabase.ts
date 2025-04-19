export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          created_at: string
          name: string
          logo_url: string | null
          address: string | null
          contact_email: string
          contact_phone: string | null
          subscription_tier: "basic" | "premium" | "enterprise"
          subscription_status: "active" | "inactive" | "trial"
          owner_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          logo_url?: string | null
          address?: string | null
          contact_email: string
          contact_phone?: string | null
          subscription_tier?: "basic" | "premium" | "enterprise"
          subscription_status?: "active" | "inactive" | "trial"
          owner_id: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          logo_url?: string | null
          address?: string | null
          contact_email?: string
          contact_phone?: string | null
          subscription_tier?: "basic" | "premium" | "enterprise"
          subscription_status?: "active" | "inactive" | "trial"
          owner_id?: string
        }
      }
      restaurants: {
        Row: {
          id: string
          created_at: string
          name: string
          address: string
          phone: string | null
          email: string | null
          company_id: string
          manager_id: string | null
          status: "active" | "inactive" | "maintenance"
          opening_hours: Json | null
          cuisine_type: string | null
          seating_capacity: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          address: string
          phone?: string | null
          email?: string | null
          company_id: string
          manager_id?: string | null
          status?: "active" | "inactive" | "maintenance"
          opening_hours?: Json | null
          cuisine_type?: string | null
          seating_capacity?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          address?: string
          phone?: string | null
          email?: string | null
          company_id?: string
          manager_id?: string | null
          status?: "active" | "inactive" | "maintenance"
          opening_hours?: Json | null
          cuisine_type?: string | null
          seating_capacity?: number | null
        }
      }
      tables: {
        Row: {
          id: string
          created_at: string
          restaurant_id: string
          table_number: string
          capacity: number
          status: "available" | "occupied" | "reserved" | "maintenance"
          location: string | null
          qr_code_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          restaurant_id: string
          table_number: string
          capacity: number
          status?: "available" | "occupied" | "reserved" | "maintenance"
          location?: string | null
          qr_code_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          restaurant_id?: string
          table_number?: string
          capacity?: number
          status?: "available" | "occupied" | "reserved" | "maintenance"
          location?: string | null
          qr_code_url?: string | null
        }
      }
      menu_categories: {
        Row: {
          id: string
          created_at: string
          restaurant_id: string
          name: string
          description: string | null
          display_order: number
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          restaurant_id: string
          name: string
          description?: string | null
          display_order?: number
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          restaurant_id?: string
          name?: string
          description?: string | null
          display_order?: number
          is_active?: boolean
        }
      }
      menu_items: {
        Row: {
          id: string
          created_at: string
          restaurant_id: string
          category_id: string
          name: string
          description: string | null
          price: number
          image_url: string | null
          is_available: boolean
          allergens: string[] | null
          nutritional_info: Json | null
          preparation_time: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          restaurant_id: string
          category_id: string
          name: string
          description?: string | null
          price: number
          image_url?: string | null
          is_available?: boolean
          allergens?: string[] | null
          nutritional_info?: Json | null
          preparation_time?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          restaurant_id?: string
          category_id?: string
          name?: string
          description?: string | null
          price?: number
          image_url?: string | null
          is_available?: boolean
          allergens?: string[] | null
          nutritional_info?: Json | null
          preparation_time?: number | null
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          restaurant_id: string
          table_id: string | null
          customer_id: string | null
          server_id: string | null
          status: "pending" | "preparing" | "ready" | "delivered" | "completed" | "cancelled"
          total_amount: number
          payment_status: "unpaid" | "paid" | "refunded"
          payment_method: string | null
          special_instructions: string | null
          order_type: "dine-in" | "takeout" | "delivery"
        }
        Insert: {
          id?: string
          created_at?: string
          restaurant_id: string
          table_id?: string | null
          customer_id?: string | null
          server_id?: string | null
          status?: "pending" | "preparing" | "ready" | "delivered" | "completed" | "cancelled"
          total_amount: number
          payment_status?: "unpaid" | "paid" | "refunded"
          payment_method?: string | null
          special_instructions?: string | null
          order_type?: "dine-in" | "takeout" | "delivery"
        }
        Update: {
          id?: string
          created_at?: string
          restaurant_id?: string
          table_id?: string | null
          customer_id?: string | null
          server_id?: string | null
          status?: "pending" | "preparing" | "ready" | "delivered" | "completed" | "cancelled"
          total_amount?: number
          payment_status?: "unpaid" | "paid" | "refunded"
          payment_method?: string | null
          special_instructions?: string | null
          order_type?: "dine-in" | "takeout" | "delivery"
        }
      }
      order_items: {
        Row: {
          id: string
          created_at: string
          order_id: string
          menu_item_id: string
          quantity: number
          unit_price: number
          special_instructions: string | null
          status: "pending" | "preparing" | "ready" | "delivered" | "cancelled"
          modifiers: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          order_id: string
          menu_item_id: string
          quantity: number
          unit_price: number
          special_instructions?: string | null
          status?: "pending" | "preparing" | "ready" | "delivered" | "cancelled"
          modifiers?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          order_id?: string
          menu_item_id?: string
          quantity?: number
          unit_price?: number
          special_instructions?: string | null
          status?: "pending" | "preparing" | "ready" | "delivered" | "cancelled"
          modifiers?: Json | null
        }
      }
      staff: {
        Row: {
          id: string
          created_at: string
          user_id: string
          restaurant_id: string
          role: "manager" | "chef" | "server" | "host" | "bartender" | "cashier"
          status: "active" | "inactive" | "on_leave"
          hourly_rate: number | null
          hire_date: string
          emergency_contact: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          restaurant_id: string
          role: "manager" | "chef" | "server" | "host" | "bartender" | "cashier"
          status?: "active" | "inactive" | "on_leave"
          hourly_rate?: number | null
          hire_date: string
          emergency_contact?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          restaurant_id?: string
          role?: "manager" | "chef" | "server" | "host" | "bartender" | "cashier"
          status?: "active" | "inactive" | "on_leave"
          hourly_rate?: number | null
          hire_date?: string
          emergency_contact?: string | null
        }
      }
      inventory_items: {
        Row: {
          id: string
          created_at: string
          restaurant_id: string
          name: string
          category: string
          quantity: number
          unit: string
          par_level: number | null
          reorder_point: number | null
          supplier_id: string | null
          cost_per_unit: number | null
          last_ordered_date: string | null
          expiration_date: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          restaurant_id: string
          name: string
          category: string
          quantity: number
          unit: string
          par_level?: number | null
          reorder_point?: number | null
          supplier_id?: string | null
          cost_per_unit?: number | null
          last_ordered_date?: string | null
          expiration_date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          restaurant_id?: string
          name?: string
          category?: string
          quantity?: number
          unit?: string
          par_level?: number | null
          reorder_point?: number | null
          supplier_id?: string | null
          cost_per_unit?: number | null
          last_ordered_date?: string | null
          expiration_date?: string | null
        }
      }
      suppliers: {
        Row: {
          id: string
          created_at: string
          company_id: string
          name: string
          contact_name: string | null
          contact_email: string | null
          contact_phone: string | null
          address: string | null
          payment_terms: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          company_id: string
          name: string
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          payment_terms?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          company_id?: string
          name?: string
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          payment_terms?: string | null
          notes?: string | null
        }
      }
      reservations: {
        Row: {
          id: string
          created_at: string
          restaurant_id: string
          customer_id: string | null
          table_id: string | null
          reservation_date: string
          party_size: number
          status: "confirmed" | "pending" | "cancelled" | "completed" | "no-show"
          special_requests: string | null
          customer_name: string
          customer_email: string | null
          customer_phone: string
        }
        Insert: {
          id?: string
          created_at?: string
          restaurant_id: string
          customer_id?: string | null
          table_id?: string | null
          reservation_date: string
          party_size: number
          status?: "confirmed" | "pending" | "cancelled" | "completed" | "no-show"
          special_requests?: string | null
          customer_name: string
          customer_email?: string | null
          customer_phone: string
        }
        Update: {
          id?: string
          created_at?: string
          restaurant_id?: string
          customer_id?: string | null
          table_id?: string | null
          reservation_date?: string
          party_size?: number
          status?: "confirmed" | "pending" | "cancelled" | "completed" | "no-show"
          special_requests?: string | null
          customer_name?: string
          customer_email?: string | null
          customer_phone?: string
        }
      }
      customers: {
        Row: {
          id: string
          created_at: string
          user_id: string | null
          name: string
          email: string | null
          phone: string | null
          address: string | null
          preferences: Json | null
          loyalty_points: number
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id?: string | null
          name: string
          email?: string | null
          phone?: string | null
          address?: string | null
          preferences?: Json | null
          loyalty_points?: number
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string | null
          name?: string
          email?: string | null
          phone?: string | null
          address?: string | null
          preferences?: Json | null
          loyalty_points?: number
          notes?: string | null
        }
      }
      user_roles: {
        Row: {
          id: string
          created_at: string
          user_id: string
          role: "platform_admin" | "company_admin" | "restaurant_manager" | "staff" | "customer"
          company_id: string | null
          restaurant_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          role: "platform_admin" | "company_admin" | "restaurant_manager" | "staff" | "customer"
          company_id?: string | null
          restaurant_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          role?: "platform_admin" | "company_admin" | "restaurant_manager" | "staff" | "customer"
          company_id?: string | null
          restaurant_id?: string | null
        }
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
  }
}
