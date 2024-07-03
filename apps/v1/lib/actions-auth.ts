'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/configs/supabase-server.config'
import { hosting } from '@/configs/constants'
import { isAdmin } from '@/utils/auth.utils'

export async function login(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    /**
     * 
     */
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) {
        // console.log("error of login with supabase::", error);
        redirect('/api/auth/error')
        // return;
    }
    if(!error) {
        if(isAdmin(data.email)) {
            revalidatePath('/')
            redirect('/')
        } else {
            revalidatePath('/');
            redirect('/dashboad');
        }
    }
}

export async function signup(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/api/auth/error')
    }

    if(!error) {
        if(isAdmin(data.email)) {
            revalidatePath('/')
            redirect('/')
        } else {
            revalidatePath('/');
            redirect('/dashboad');
        }
    }
}

export async function signupGoogleProvider(formData: FormData) {
    const supabase = createClient()
    // type-casting here for convenience
    // in practice, you should validate your inputs

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
            /**
             * Redirect "callbak" after sign in complete, but tokens are not sent
             *  to avoid prefetching that user is authenticated
             */
            redirectTo: `${hosting}api/auth/callback`
        }
    })

    if(error) {
        redirect('/api/auth/error');
    }
    
    if (data.url) {
        /**
         * use the "redirect API" for your server framework:
         *      - authenticate with google
         */
        redirect(data.url)
    }
}

export async function signOut() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut({ scope: 'local' });

    if(error) {
        redirect("/api/auth/error");
    }
    redirect("/")
}
