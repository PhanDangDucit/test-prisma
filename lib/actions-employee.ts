"use server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import {
    CreateEmployee,
    State,
    UpdateEmployee,
    validatedEmployee 
} from '@/validators/validate-employee';

/**
 * 
 * @param formData 
 * @returns 
 */
export async function createEmployee(formData: FormData) {
    const validatedFields = validatedEmployee(CreateEmployee, formData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Employee',
        };
    }

    // Get variables for create employee
    const image_url = '';
    const updated_at = new Date().toISOString();
    const created_at = new Date().toISOString();
    const {
        department_id
    } = validatedFields.data;
    
    // Handle logic with try catch block
    try {
        await prisma.employee.create({
            data: {
                ...validatedFields.data,
                image_url,
                updated_at,
                created_at,
                department_id: Number(department_id)
            }
        })
    } catch (error) {
        throw new Error("Create a employee failed: " + error);
    }
    
    revalidatePath('/employee');
    redirect('/employee');
    // return prev;
}

export async function updateEmployee(id: string, formData: FormData) {
    const validatedFields = validatedEmployee(UpdateEmployee, formData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Employee',
        };
    }
     // Get variables for create employee
    const updated_at = new Date().toISOString();
    const {
        department_id
    } = validatedFields.data;
    // Handle logic with try catch block
    try {
        await prisma.employee.update({
            where: {
              id: Number(id)
            },
            data: {
                ...validatedFields.data,
                updated_at,
                department_id: Number(department_id)
            }
        })
    } catch (error) {
        throw new Error("Update a employee failed: " + error);
    }

    revalidatePath('/employee');
    redirect('/employee');
}

export async function deleteEmployee(id: number) {
    try {
        await prisma.employee.delete({
            where: {
              id
            },
        })
        revalidatePath('/employee');
    } catch (error) {
        throw new Error("Delete a employee failed: " + error);
    }
}