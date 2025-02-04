// route.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yyygruoaphtgzslboctz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return Response.json({ error: "Falta el ID del usuario" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("dieta")
    .select("*")
    .eq("usuario_id", userId)
    .order("semana", { ascending: true })
    .order("dia", { ascending: true })
    .order("momento", { ascending: true });

  if (error) return Response.json({ error }, { status: 500 });

  return Response.json({ data }, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { usuario_id, comida, ingredientes, momento, semana, dia } = body;

    if (!usuario_id || !comida || !momento || !semana || !dia) {
      return Response.json(
        { error: "Datos incompletos", received: body },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("dieta").insert([
      {
        usuario_id,
        comida,
        ingredientes,
        momento,
        semana,
        dia,
      },
    ]);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data }, { status: 201 });
  } catch (err) {
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, comida, ingredientes, momento, semana, dia } = body;

    if (!id) {
      return Response.json(
        { error: "Falta el ID de la dieta para actualizar" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("dieta")
      .update({ comida, ingredientes, momento, semana, dia })
      .eq("id", id);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data }, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return Response.json(
        { error: "Falta el ID de la dieta para eliminar" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("dieta").delete().eq("id", id);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data }, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
