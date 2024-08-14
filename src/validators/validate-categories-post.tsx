import { z } from "zod";

const FormSchema = z.object({
    id:z.string(),
    name_post_type:z.string(),
    priority:z.coerce.number(),
    created_at: z.string(),
    icon: z.string()
});

export const CreatePostCategory = FormSchema.omit({ 
    id: true,
    created_at: true,
});

export const UpdatePostCategory = FormSchema.omit({ 
    id: true,
    created_at: true,
});

export type PostCategoryState = {
    errors?: {
        name_post_type?: string[],
        priority?: string[],
        icon?: string[]
    };
    message?: string | null;
}
// Type action of post category
type ActionPostCategories = typeof CreatePostCategory | typeof UpdatePostCategory

/**
 * Validate employee by zod
 * @param action 
 * @param formData
 * @returns 
 */
export function validatedPostCategory(action: ActionPostCategories, formData: FormData) {
    return action.safeParse({
        name_post_type: formData.get('name_post_type'),
        priority: formData.get('priority'),
        icon: formData.get('icon'),
    });
}