import supabase from "../config/supabase.js";

export class ProductRepository {
  async findAll() {
    const { data, error } = await supabase.from("products").select("*").order("title");
    if (error) throw error;
    return data;
  }

  async findById(id: string) {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (error && error.code === "PGRST116") return null;
    if (error) throw error;
    return data;
  }

  async create(product: {
    category_id: string; title: string; description: string; price: number;
    image?: string; available?: boolean; active?: boolean;
  }) {
    const { data, error } = await supabase.from("products").insert(product).select().single();
    if (error) throw error;
    return data;
  }

  async update(id: string, product: Partial<{
    category_id: string; title: string; description: string; price: number;
    image: string; available: boolean; active: boolean;
  }>) {
    const { data, error } = await supabase.from("products").update(product).eq("id", id).select().single();
    if (error && error.code === "PGRST116") return null;
    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { data, error } = await supabase.from("products").delete().eq("id", id).select().single();
    if (error && error.code === "PGRST116") return null;
    if (error) throw error;
    return data;
  }
}
