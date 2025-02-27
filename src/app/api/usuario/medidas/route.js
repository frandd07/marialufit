import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yyygruoaphtgzslboctz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc";
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para guardar el peso del usuario
export async function SAVE_MEASURE(user_id, peso, fecha) {
  const { data, error } = await supabase
    .from("medida")
    .insert([{ user_id: user_id, peso: peso, fecha: fecha }]);

  if (error) return { error };
  return { data };
}

// Función para obtener las medidas del usuario
export async function GET_MEASURES(user_id) {
  const { data, error } = await supabase
    .from("medida")
    .select("peso, fecha")
    .eq("user_id", user_id)
    .order("fecha", { ascending: false });

  if (error) return { error };
  return { data };
}
