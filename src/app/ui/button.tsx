import Link from "next/link"
import React from "react"


export function getButtonErrorProps<T> (props:T) {
    return {
        ...props,
        className:"text-white bg-orange-400 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
    }
}

// type TProps = ReturnType<typeof getButtonErrorProps>;
type TProps = {
    onClick: () => void,
    children:React.ReactNode,
    type?: "button"|"submit",
    className?:string
}

export function ButtonResetError(props: TProps) {
    return (
        <button 
            {...getButtonErrorProps<TProps>(props)}
        >
            {props.children}
        </button>
    )
}

export function BoxError ({children}:{children:React.ReactNode}) {
    return (
        <div className="absolute left-1/2 -translate-x-1/2 min-w-20 justify-between ">
            {children}
            <Link
                href="/"
                className="z-10 cursor-pointer text-white bg-orange-400 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
                Home
            </Link>
        </div>
    )
}