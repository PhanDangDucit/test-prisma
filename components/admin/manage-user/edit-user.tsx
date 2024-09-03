'use client'
import Image from "next/image";
import { useState } from "react";
import { User } from "@/helpers/definitions";
import intIcon from "@/public/tree.jpg";
import { updateRoleUser } from "@/lib/actions-user";

export const EditModalUser = ({
    user
}:{
    user: User
}) => {
    const updateUserWithId = updateRoleUser.bind(null, user.id);
    // const role = user.role === 1 ? "admin" : "user";
    return (
        <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Edit user {user.id}
                    </h3>
                    <button 
                        type="button" 
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                        data-modal-toggle={`edit-modal-${user.id}`}
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* Modal body */}
                <form className="p-4 md:p-5" action={updateUserWithId}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input 
                                type="text" name="name_post_type" id="name" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                placeholder="Type post categories name" required
                                defaultValue={user.email}
                                readOnly
                            />
                        </div>
                        <label className="col-span-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="icon">Image</label>
                            <div className="col-span-2 mb-2 border-[1px] border-gray-300 rounded-xl relative w-[100px] h-[100px]">
                                <Image
                                    src={user.avatar || intIcon}
                                    alt="icon"
                                    fill
                                    priority
                                    className="rounded-xl"
                                />
                            </div>
                        <div className="col-span-2">
                            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                            <select 
                                id="role"
                                name="role"
                                defaultValue={user.role!}
                                className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="0">User</option>
                                <option value="1">Admin</option>
                            </select>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <svg 
                            className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}