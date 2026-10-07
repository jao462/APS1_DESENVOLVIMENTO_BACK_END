import supabase from "../config/supabase.js";

export class OrderItemRepository {
  async findAll() {
    const { data, error } = await supabase.from("order_items").select("*");
    if (error) throw error;
    return data;
  }

  async findById(id: string) {
    const { data, error } = await supabase.from("order_items").select("*").eq("id", id).single();
    if (error && error.code === "PGRST116") return null;
    if (error) throw error;
    return data;
  }

  async create(item: { order_id: string; product_id: string; quantity: number; unit_price: number }) {
    const { data, error } = await supabase.from("order_items").insert(item).select().single();
    if (error) throw error;
    return data;
  }

  async update(id: string, item: Partial<{ order_id: string; product_id: string; quantity: number; unit_price: number }>) {
    const { data, error } = await supabase.from("order_items").update(item).eq("id", id).select().single();
    if (error && error.code === "PGRST116") return null;
    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { data, error } = await supabase.from("order_items").delete().eq("id", id).select().single();
    if (error && error.code === "PGRST116") return null;
    if (error) throw error;
    return data;
  }
}
