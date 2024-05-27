"use client"
import { createBrowserClient } from '@supabase/ssr'
import { SUPABASE_ENV } from './constants'

export function createClient() {
    return createBrowserClient(
        SUPABASE_ENV.url,
        SUPABASE_ENV['anon-key']
    )
}