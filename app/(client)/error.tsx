'use client'
import Image from "next/image";
import { BoxError, ButtonResetError } from "@/app/ui/button"
import errorImage from "@/public/error-image.svg";
 
import { useEffect } from 'react';
import { ApiResponseCLientError } from "@/helpers/exception.helper";
import Link from "next/link";

export type TError = {
    error: ApiResponseCLientError & { digest?: string }
    reset: () => void
}

export default function Error({
    error,
    reset
}: TError) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        // <div>
        //     <h2>{error.message}</h2>
        
        // </div>
        <div className="bg-indigo-900 relative overflow-hidden h-screen">
            <Image
                src={errorImage} 
                className="absolute h-full w-full object-cover"
                alt=""
                width={80}
                height={80}
            />
            <div className="inset-0 bg-black opacity-25 absolute"></div>
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                <div className="w-full font-mono flex flex-col items-center">
                    <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                        {error.message}
                    </h1>
                    <p className="font-extrabold text-8xl my-44 text-white animate-bounce">
                        {error.status}
                    </p>
                </div>
                <BoxError>
                    <ButtonResetError
                        onClick={
                            () => reset()
                        }
                    >
                        Try again
                    </ButtonResetError>
                </BoxError>
            </div>
        </div>
    )
}