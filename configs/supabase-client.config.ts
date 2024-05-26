
"use client"
import { createBrowserClient } from '@supabase/ssr'

type TENV_SUPABASE = {
    url: string,
    "anon-key": string
}

export const ENV_SUPABASE:TENV_SUPABASE = {
    url:process.env.NEXT_PUBLIC_SUPABASE_URL!,
    "anon-key":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
}

export function createClient() {
    return createBrowserClient(
        ENV_SUPABASE.url,
        ENV_SUPABASE['anon-key']
    )
}