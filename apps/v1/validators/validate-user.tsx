import { z } from 'zod';

const FormSchema = z.object({
    email: z.string({
        required_error: "Please type a customer."
    }).email(),
    password: z.string({
        required_error: 'Please type password.'
    }).length(8, {
        message: 'Please type password than 8 character.'
    }),
    created_at: z.string(),
    updated_at: z.string()
});

 /**
 * Type state for handle error
 */
export type CreateState = {
    errors?: {
      email?: string[];
      password?: string[];
    };
    message?: string | null;
};

export const CreateNewAccount = FormSchema.omit({
    created_at: true,
    updated_at: true
});

/**
 * validate account
 * @param action 
 * @param formData 
 * @returns 
 */
export function validatedAccount(action: typeof CreateNewAccount, formData: FormData) {
    return action.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });
}

/**
 * uodate state type
 */
// export type UpdateState = {
//     errors?: {
//         id?:number[];
//         fullname?:string[];
//         username?:string[];
//         avatar?:string[];
//         email?: string[];
//         password?: string[];
//         role?: string[];
//     };
//     message?: string | null;
// };

const FormUpdateUserRole = z.object({
    role: z.coerce.number()
});

export function validatedRoleUser(formData: FormData) {
    return FormUpdateUserRole.safeParse({
        role: formData.get('role')
    });
}
