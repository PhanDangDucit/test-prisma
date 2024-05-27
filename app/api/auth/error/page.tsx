import { BoxError, ButtonResetError } from "@/app/ui/button";
import { ApiResponseElements } from "@/helpers/exception.helper";
import errorImage from "@/public/error-image.svg";
import Image from "next/image";

export default function ErrorPage() {
    
    return (
        <div className="flex mt-[100px] h-screen">
            <div className="relative overflow-hidden h-screen w-4/5 m-auto">
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
                            {ApiResponseElements[1].status}
                        </h1>
                        <p className="font-extrabold text-8xl my-44 text-white animate-bounce">
                            {ApiResponseElements[1].message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}