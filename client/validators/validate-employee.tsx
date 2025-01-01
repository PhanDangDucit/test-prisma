import { z } from "zod";

const FormSchema = z.object({
    id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    image_url: z.string(),
    phone: z.string(),
    department_id: z.string(),
    email: z.string(),
    updated_at: z.string(),
    created_at: z.string(),
});
 
export const CreateEmployee = FormSchema.omit({ 
    id: true,
    image_url: true,
    updated_at: true,
    created_at: true,
});

export const UpdateEmployee = FormSchema.omit({ 
    id: true,
    image_url: true,
    updated_at: true,
});

export type State = {
    errors?: {
        first_name: string[];
        last_name: string[];
        phone: string[];
        department_id: string[];
        email: string[];
    };
    message?: string | null;
}

/**
 * Validate employee by zod
 * @param action 
 * @param formData 
 * @returns 
 */
export function validatedEmployee(action: typeof CreateEmployee | typeof UpdateEmployee, formData: FormData) {
    return action.safeParse({
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        phone: formData.get('phone'),
        department_id: formData.get('department_id'),
        email: formData.get('email')
    });
}
