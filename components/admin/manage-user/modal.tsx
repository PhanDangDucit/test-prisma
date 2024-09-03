"use client"
import React from "react"
import { User } from "@/helpers/definitions";
import { useRouter } from 'next/navigation'

export function Modal({
    user,
    children
} : {
    user: User,
    children: React.ReactNode
}) {
    const router = useRouter();
    return (
        <div className="mt-5 flex justify-center">
            <button 
                data-modal-target={`edit-modal-${user.id}`}
                data-modal-toggle={`edit-modal-${user.id}`} 
                className="font-medium text-blue-600 dark:text-blue-500"
                type="button"
                title={`edit-user ${user.id}`}
                // onClick={() => {
                //     router.back()
                // }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </button>
            <div id={`edit-modal-${user.id}`} tabIndex={-user.id} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                {children}
            </div>
        </div>
    )
}