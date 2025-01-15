import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yyygruoaphtgzslboctz.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function REGISTER({ email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });
    if (error) return { error };
    return { data };
}

export async function LOGIN({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) return { error };
    return { data };
}

