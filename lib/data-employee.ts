

import { unstable_noStore as noCache } from 'next/cache';
import moment from 'moment';
// import { DepartmentType, EmployeeType } from '../helpers/definitions';
import prisma from "@/prisma/client";

// Fetch all employees
export async function fetchAllEmployees() {
    noCache();
    try {
        const allEmployees = await prisma.employee.findMany();
        await prisma.$disconnect();
        return allEmployees;
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Get all employees failed! " + error);
    }
}


// Fetch all departments
export async function fetchAllDepartments() {
    noCache();
    try {
        const allDepartments = await prisma.department.findMany();
        await prisma.$disconnect();
        return allDepartments;
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Get all department failed!");
    }
}

// Fetch an employee by id

export async function fetchEmployeeById(id: string) {
    noCache();
    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id: Number(id)
            },
          })
        await prisma.$disconnect();
        return {
            ...employee,
            created_at:moment(employee?.created_at).format('MMMM d, YYYY')
        };
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Get one employee failed!");
    }
}

// Get image url
export async function updateAvatarEmployee(email:string, image_url: string) {
    try {
        await prisma.employee.update({
            where: {
              email,
            },
            data: {
              image_url,
            },
        })
    } catch (error) {
        throw new Error("Get image url faild! " + error);
    }
}