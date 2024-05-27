import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { SUPABASE_ENV } from '@/configs/constants'
import { getUserInfoSupabase } from '@/utils/auth.utils'

/**
 * Middleware write "refreshed" cookies to storage.
 */

export async function GET(request: NextRequest) {
    const user = await getUserInfoSupabase();
    let response = NextResponse.next();
    response.cookies.set('show-banner', 'false')
    // Response will have a `Set-Cookie:show-banner=false;path=/home` header
    return response
    // let response = NextResponse.next({
    //     request: {
    //         headers: request.headers,
    //     },
    // })

    // const supabase = createServerClient(
    //     SUPABASE_ENV.url,
    //     SUPABASE_ENV['anon-key'],
    //     {
    //         cookies: {
    //             get(name: string) {
    //                 return request.cookies.get(name)?.value
    //             },
    //             set(name: string, value: string, options: CookieOptions) {
    //                 request.cookies.set({
    //                     name,
    //                     value,
    //                     ...options,
    //                 })
    //                 response = NextResponse.next({
    //                     request: {
    //                         headers: request.headers,
    //                     },
    //                 })
    //                 response.cookies.set({
    //                     name,
    //                     value,
    //                     ...options,
    //                 })
    //             },
    //             remove(name: string, options: CookieOptions) {
    //                 request.cookies.set({
    //                     name,
    //                     value: '',
    //                     ...options,
    //                 })
    //                 response = NextResponse.next({
    //                     request: {
    //                         headers: request.headers,
    //                     },
    //                 })
    //                 response.cookies.set({
    //                     name,
    //                     value: '',
    //                     ...options,
    //                 })
    //             },
    //         },
    //     }
    // )

    // await supabase.auth.getUser()

    // return response
}