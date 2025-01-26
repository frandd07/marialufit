import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yyygruoaphtgzslboctz.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc";
const supabase = createClient(supabaseUrl, supabaseKey);
export async function GET(req) {
    const { data: entrenos, error } = await supabase
        .from("entreno")
        .select("id, nombre, tut, rir, descanso, series, repes, pesos, repeticiones, observaciones, dia");

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    // Agrupamos los entrenos por día
    const groupedByDay = entrenos.reduce((acc, entrenamiento) => {
        const { dia, ...rest } = entrenamiento;
        if (!acc[dia]) acc[dia] = [];
        acc[dia].push(rest);
        return acc;
    }, {});

    return new Response(JSON.stringify(groupedByDay), { status: 200 });
}