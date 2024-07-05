import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { SUPABASE_ENV } from '@/configs/constants'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code');
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const cookieStore = cookies()
        const supabase = createServerClient(
            SUPABASE_ENV.url,
            SUPABASE_ENV['anon-key'],
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        cookieStore.set({ name, value, ...options })
                    },
                    remove(name: string, options: CookieOptions) {
                        cookieStore.delete({ name, ...options })
                    },
                },
            }
        )
        
        /**
         * - exchangeCodeForSession() return session contain access and refresh tokens
         *      + Two tokens are stored in storage medium
         *  - Whenever the "session" is "refreshed", the "auth and refresh" tokens in the shared storage medium must be "updated".
         *      + auth tokens?
         *  - Supabase client libraries provide a customizable "storage" option when a client is initiated, 
         *      allowing you to change where tokens are stored.
         */
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            return NextResponse.redirect(`${origin}${next}`)
        }
    }
    // return the user to an error page with instructions
    return NextResponse.redirect(`/api/auth/error`)
}