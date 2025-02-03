import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yyygruoaphtgzslboctz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function REGISTER({ email, password, clave }) {
  // Verificar si la clave (id) existe en la tabla 'clave'
  const { data: claveData, error: claveError } = await supabase
    .from("clave")
    .select("id")
    .eq("id", clave)
    .single();

  if (claveError || !claveData) {
    return { error: { message: "Clave inválida. No puedes registrarte." } };
  }

  // Registro en Supabase Authentication
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return { error };

  const uid = data.user.id;

  // Insertar en la tabla "admin"
  await supabase.from("admin").insert([{ email, admin: false }]);

  // Insertar en la tabla "usuario"
  const { error: insertError } = await supabase
    .from("usuario")
    .insert([{ correo: email, fk_id: uid }]);

  if (insertError) return { error: insertError };

  return { data };
}

export async function LOGIN({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error };

  // Consultar si el usuario es administrador
  const { data: adminData, error: adminError } = await supabase
    .from("admin")
    .select("admin")
    .eq("email", email)
    .single();

  if (adminError) return { data };

  return { data, admin: adminData?.admin };
}
