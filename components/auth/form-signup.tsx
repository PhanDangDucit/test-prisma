'use client'
// react-hot-toast
import { createNewAccount } from "@/lib/actions-user";
import { useEffect, useState } from "react";
import { useFormState } from 'react-dom';
const FormSignUp = () => {
    const [password, setPassword] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    const initialState = { message: null, errors: {}};
    const [state, dispatch] = useFormState(createNewAccount, initialState);
    // const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=> {
    //     if(password != repeatPass) {
    //         e.preventDefault();
    //     }
    // }
    // const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPassword(e.target.value);
    // }
    // const handleChangeRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setRepeatPass(e.target.value);
    // }

    return (
        <form className="max-w-sm mx-auto"
            action={dispatch}
            // onSubmit={(e)=> handleSubmit(e)}
        >
            {/* Email */}
            <div className="mb-5">
                <label 
                    htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                >
                    Your email
                </label>
                <input 
                    type="email" id="email"
                    name="email"
                    className="shadow-sm bg-gray-500 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                    required
                    aria-describedby="email-error"
                />
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true">
                {
                    state.errors?.email &&
                    state.errors?.email.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))
                }
            </div>
            {/* Password */}
            <div className="mb-5 mt-2">
                <label 
                    htmlFor="password" 
                    className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                >
                    Your password
                </label>
                <input 
                    // onChange={(e) => handleChangePassword(e)}
                    // value={password}
                    type="password" id="password"
                    name="password"
                    className="shadow-sm bg-gray-500 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                    aria-describedby="password-error"
                />
            </div>
            <div id="password-error" aria-live="polite" aria-atomic="true">
                {
                    state.errors?.password &&
                    state.errors?.password.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))
                }
            </div>
            {/* Repeat password */}
            <div className="mb-5 mt-2">
                <label 
                    htmlFor="repeat-password" 
                    className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                >
                    Repeat password
                </label>
                <input 
                    type="password" id="repeat-password"
                    // value={repeatPass}
                    // onChange={(e) => handleChangeRepeatPassword(e)}
                    className="shadow-sm bg-gray-500 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                />
            </div>
            {/* Policy */}
            <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                    <input 
                        id="terms" type="checkbox" 
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-500 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
                        required 
                    />
                </div>
                <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-200 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
            </div>
            {/* Button */}
            <button 
                type="submit" 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Register new account
            </button>
        </form>
    );
}
 
export default FormSignUp;