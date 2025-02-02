import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yyygruoaphtgzslboctz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const user_uuid = searchParams.get("user_uuid");
  console.log("UUID recibido:", user_uuid);

  if (!user_uuid) {
    return new Response(JSON.stringify({ error: "Usuario no autenticado" }), {
      status: 401,
    });
  }

  // Verificar si existe el usuario con ese UUID
  const { data: usuarioData, error: usuarioError } = await supabase
    .from("usuario")
    .select("id, correo, fk_id")
    .eq("fk_id", user_uuid)
    .single();

  console.log("Datos del usuario encontrados:", usuarioData);

  if (usuarioError || !usuarioData) {
    console.error("Error buscando el usuario:", usuarioError?.message);
    return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
      status: 404,
    });
  }

  // Verificar que existan dietas asociadas al id del usuario
  const { data: dietasData, error: dietasError } = await supabase
    .from("dieta")
    .select("*")
    .eq("usuario_id", usuarioData.id);

  console.log("Dietas encontradas:", dietasData);

  if (dietasError) {
    console.error("Error buscando las dietas:", dietasError.message);
    return new Response(JSON.stringify({ error: dietasError.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(dietasData), { status: 200 });
}
