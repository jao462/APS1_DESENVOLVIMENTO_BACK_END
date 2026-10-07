import supabase from "../config/supabase.js";

export class CategoryRepository {
  async findAll() {
    const { data, error } = await supabase.from("categories").select("*").order("name");
    if (error) throw error;
    return data;
  }

  async findById(id: string) {
    const { data, error } = await supabase.from("categories").select("*").eq("id", id).single();
    if (error && error.code === "PGRST116") return null;
    if (error) throw error;
    return data;
  }

  async create(category: { name: string; description?: string; active?: boolean }) {
    const { data, error } = await supabase.from("categories").insert(category).select().single();
    if (error) throw error;
    return data;
  }

  async update(id: string, category: { name?: string; description?: string; active?: boolean }) {
    const { data, error } = await supabase.from("categories").update(category).eq("id", id).select().single();
    if (error && error.code === "PGRST116") return null;
    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { data, error } = await supabase.from("categories").delete().eq("id", id).select().single();
    if (error && error.code === "PGRST116") return null;
    if (error) throw error;
    return data;
  }
}
