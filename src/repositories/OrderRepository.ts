import supabase from "../config/supabase.js";

export class OrderRepository {
  async findAll() {
    const { data, error } = await supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  }

  async findById(id: string) {
    const { data, error } = await supabase.from("orders").select("*, order_items(*)").eq("id", id).single();
    if (error && error.code === "PGRST116") return null;
    if (error) throw error;
    return data;
  }

  async create(order: { customer_name: string; status?: string }) {
    const { data, error } = await supabase.from("orders").insert(order).select().single();
    if (error) throw error;
    return data;
  }

  async update(id: string, order: { customer_name?: string; status?: string }) {
    const { data, error } = await supabase.from("orders").update(order).eq("id", id).select().single();
    if (error && error.code === "PGRST116") return null;
    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { data, error } = await supabase.from("orders").delete().eq("id", id).select().single();
    if (error && error.code === "PGRST116") return null;
    if (error) throw error;
    return data;
  }
}
