import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yyygruoaphtgzslboctz.supabase.co";
const serviceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjkzMjM1OSwiZXhwIjoyMDUyNTA4MzU5fQ.7OxgILGMRO42sAAXNvFPlK8Ej6xAt6U1MBkAeB5Qd9o"; // ⚠️ Mantén esta clave en el backend
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

export async function GET_USERS() {
  const { data, error } = await supabase.from("usuario").select("*");

  if (error) {
    return { error };
  }

  return { data }; // Devuelve todos los usuarios de la tabla 'usuario'
}
