import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yyygruoaphtgzslboctz.supabase.co";
const serviceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjkzMjM1OSwiZXhwIjoyMDUyNTA4MzU5fQ.7OxgILGMRO42sAAXNvFPlK8Ej6xAt6U1MBkAeB5Qd9o"; // ⚠️ Mantén esta clave en el backend

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

export async function GET_USERS() {
  const { data, error } = await supabase
    .from("usuario")
    .select("id, correo, nombre, apellido1, apellido2, activo");

  if (error) {
    return { error };
  }

  return { data };
}

export async function TOGGLE_USER_ACTIVE(userId, isActive) {
  const { data, error } = await supabase
    .from("usuario")
    .update({ activo: isActive })
    .eq("id", userId);

  if (error) {
    return { error };
  }

  return { data };
}

export async function CREATE_KEY() {
  const newKey = Math.floor(1000000000 + Math.random() * 9000000000);
  const { data, error } = await supabase.from("clave").insert([{ id: newKey }]);

  if (error) {
    return { error };
  }

  return { data: newKey };
}

// Función para obtener todas las claves
export async function GET_KEYS() {
  const { data, error } = await supabase.from("clave").select("id");

  if (error) {
    return { error };
  }

  return { data };
}

// Función para eliminar una clave
export async function DELETE_KEY(keyId) {
  const { data, error } = await supabase.from("clave").delete().eq("id", keyId);

  if (error) {
    return { error };
  }

  return { data };
}
