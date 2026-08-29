import { getSupabaseClient } from "./supabase";

export async function listRows<T>(table: string, orderBy?: string, ascending = false): Promise<T[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  let query = supabase.from(table).select("*");
  if (orderBy) query = query.order(orderBy, { ascending });
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as T[];
}

export async function getRow<T>(table: string, id: string): Promise<T | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase.from(table).select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data as T | null;
}

export async function upsertRow<T extends { id?: string }>(table: string, row: T): Promise<T> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase não está configurado.");
  const { data, error } = await supabase.from(table).upsert(row).select().single();
  if (error) throw new Error(error.message);
  return data as T;
}

export async function deleteRow(table: string, id: string): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase não está configurado.");
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function uploadImage(file: File): Promise<string> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase não está configurado.");
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("nkentu-media").upload(path, file, { upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from("nkentu-media").getPublicUrl(path);
  return data.publicUrl;
}
