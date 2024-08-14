'use client'
import DepartmentSelect from "./department-select";
import AvatarUploadPage from "./upload-image";
import { DepartmentType } from "@/helpers/definitions";
// import { list } from '@vercel/blob';
import React, { useContext, useState } from "react";
import { createEmployee } from "@/lib/actions-employee";
import ThemeContext from "@/app/store/hooks";
import { useFormState } from "react-dom";
import { initialState } from "@/configs/constants";
import { State } from "@/validators/validate-employee";
export default function FormCreateEmployee({
    departments,
}:{
    departments:DepartmentType[],
}) {
    const [email, setEmail] = useState<string>('');
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    }
    const theme = useContext(ThemeContext);
    // const [state, dispatch] = useFormState(createEmployee, initialState);
    return (
       <>
            <form className="max-w-md mx-auto text-black mt-5" 
                action={createEmployee}
            >
                {/* First name */}
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text" 
                        name="first_name" 
                        id="first_name" 
                        className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " 
                        required 
                    />
                    <label
                        htmlFor="first_name" 
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        First Name
                    </label>
                </div>
                {/* Last name */}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="last_name" id="lastname" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="lastname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Last Name
                    </label>
                </div>
                {/* Email */}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="email" id="email"
                        onChange={(e)=> handleChangeEmail(e)} 
                        className="text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                    />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Email
                    </label>
                </div>
                {/* Department */}
               <DepartmentSelect departments={departments}/>
                {/* Phone */}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Phone
                    </label>
                </div>
                {/* Image */}
                <div className="relative z-0 w-full mb-5 group">
                    <AvatarUploadPage email={email}/>
                    {/* <input type="text" name="image_url" id="image" 
                        className="text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                    /> */}
                    {/* {
                        response.blobs.map((blob) => (
                            <a key={blob.pathname} href={blob.url}>
                                {blob.url}
                            </a>
                        ))
                    } */}
                </div>
            </form>
       </>
    )
}