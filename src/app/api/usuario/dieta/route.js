import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yyygruoaphtgzslboctz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc";
const supabase = createClient(supabaseUrl, supabaseKey);

// Obtener dieta de un usuario
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return Response.json({ error: "Falta el ID del usuario" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("dieta")
    .select("*")
    .eq("usuario_id", userId);

  if (error) return Response.json({ error }, { status: 500 });

  return Response.json({ data }, { status: 200 });
}

// Asignar nueva dieta a un usuario
export async function POST(request) {
  const { usuario_id, comida, momento } = await request.json();

  if (!usuario_id || !comida || !momento) {
    return Response.json({ error: "Datos incompletos" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("dieta")
    .insert([{ usuario_id, comida, momento }]);

  if (error) return Response.json({ error }, { status: 500 });

  return Response.json({ data }, { status: 201 });
}

// Editar una comida existente
export async function PUT(request) {
  const { id, comida, momento } = await request.json();

  if (!id || !comida || !momento) {
    return Response.json({ error: "Datos incompletos" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("dieta")
    .update({ comida, momento })
    .eq("id", id);

  if (error) return Response.json({ error }, { status: 500 });

  return Response.json({ data }, { status: 200 });
}

// Eliminar una comida
export async function DELETE(request) {
  const { id } = await request.json();

  if (!id) {
    return Response.json({ error: "Falta el ID" }, { status: 400 });
  }

  const { error } = await supabase.from("dieta").delete().eq("id", id);

  if (error) return Response.json({ error }, { status: 500 });

  return Response.json(
    { message: "Comida eliminada correctamente" },
    { status: 200 }
  );
}
