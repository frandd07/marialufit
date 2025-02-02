// Backend actualizado para filtrar por mes y año
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yyygruoaphtgzslboctz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const user_uuid = searchParams.get("id");
  const mes = searchParams.get("mes");
  const año = searchParams.get("año");

  const { data: userData, error: userError } = await supabase
    .from("usuario")
    .select("id")
    .eq("fk_id", user_uuid)
    .single();

  if (userError || !userData) {
    console.error("Usuario no encontrado:", userError?.message);
    return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
      status: 404,
    });
  }

  const usuario_id = userData.id;

  const { data: entrenos, error: entrenoError } = await supabase
    .from("entreno")
    .select("*")
    .eq("usuario_id", usuario_id)
    .eq("mes", mes)
    .eq("año", año);

  if (entrenoError) {
    console.error("Error al obtener entrenos:", entrenoError.message);
    return new Response(JSON.stringify({ error: entrenoError.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ data: entrenos }), { status: 200 });
}
