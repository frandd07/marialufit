import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yyygruoaphtgzslboctz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc";
const supabase = createClient(supabaseUrl, supabaseKey);

// Obtener entrenos asignados a un usuario filtrados por mes y año
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const usuario_id = searchParams.get("id");
  const mes = searchParams.get("mes");
  const año = searchParams.get("año");

  const { data, error } = await supabase
    .from("entreno")
    .select("*")
    .eq("usuario_id", usuario_id)
    .eq("mes", mes)
    .eq("año", año);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}

// Asignar nuevo entreno
export async function POST(request) {
  const body = await request.json();
  const {
    usuario_id,
    semana,
    dia,
    mes,
    año,
    nombre,
    grupo_muscular,
    series,
    repes,
    repeticiones_usuario,
    tut,
    rir,
    descanso,
    pesos,
    observaciones,
  } = body;

  const { data, error } = await supabase.from("entreno").insert([
    {
      usuario_id,
      semana,
      dia,
      mes,
      año,
      nombre,
      grupo_muscular,
      series,
      repes,
      repeticiones_usuario,
      tut,
      rir,
      descanso,
      pesos,
      observaciones,
    },
  ]);

  if (error) {
    console.error("Error al insertar entreno:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ data }), { status: 201 });
}

// Actualizar entreno existente
export async function PUT(request) {
  const body = await request.json();
  const { id, ...updateFields } = body;

  const { data, error } = await supabase
    .from("entreno")
    .update(updateFields)
    .eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}
