"use server"
import { createClient } from "@/configs/supabase-server.config";
import { 
    CreateNewAccount,
    CreateState,
    validatedAccount, 
    validatedRoleUser
} from "@/validators/validate-user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';

/**
 * Create new account
 * @param validatedFields 
 * @returns 
 */
async function addNewUser(validatedFields: z.SafeParseSuccess<{
    email: string;
    password: string;
}>) {
    // Get variables for create employee
    const updated_at = new Date().toISOString();
    const created_at = new Date().toISOString();
    try {
        await prisma.user.create({
            data: {
                ...validatedFields.data,
                updated_at,
                created_at
            }
        })
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create User::' + error
        };
    }
}

/**
 * 
 * @param prevState 
 * @param formData 
 * @returns 
 */
export async function createNewAccount(prevState: CreateState, formData: FormData) {
    const validatedFields =  validatedAccount(CreateNewAccount, formData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create User',
        };
    }
    addNewUser(validatedFields);
    redirect('/');
    return prevState;
}

/**
 * 
 * @param userId 
 * @param formData 
 */
export async function updateRoleUser(userId: string, formData: FormData) {
    const supabase = createClient();
    try {
        const validatedFields = validatedRoleUser(formData);
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Missing Fields. Failed to Create User',
            };
        }

        await supabase
            .from('User_Profile')
            .update({ role: validatedFields.data.role })
            .eq('id', userId)
        
    } catch (error) {
        throw new Error("Update role for user is failed:: " + error);
    }
    revalidatePath('/manage-user');
    redirect('/manage-user');
}


export async function getUserById(id: number) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user;
    } catch (error) {
        throw new Error("Find user is failed:: " + error);
    }
}

/**
 * Get user by email
 * @param email 
 * @returns 
 */
export async function getUserByEmail(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user;
    } catch (error) {
        throw new Error("Find user is failed:: " + error);
    }
}
