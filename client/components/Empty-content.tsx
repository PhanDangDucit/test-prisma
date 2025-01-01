import Link from "next/link"

export function EmptyContent({
    title = "No content!",
    message = "Let create a new object!",
    link = "/#"
} : {
    title?: string,
    link?: string,
    message?: string 
}) {
    return (
        <div>
            <div className="container flex flex-wrap justify-between items-center mx-auto bg-white rounded-md dark:bg-slate-500">
                <div className="text-center border-dashed border-2 border-slate-200 dark:border-slate-100 rounded-md w-full p-20">
                    <i className="bx bxs-contact bx-lg mb-5 dark:text-white" />
                    <p className="text-xl mb-2 uppercase font-bold dark:text-white">{title}</p>
                    <span 
                        className="text-m text-slate-400 block mb-10 dark:text-slate-50"
                    >
                        {message}
                    </span>
                    <Link
                        href={link} 
                        className="bg-blue-400 rounded-full px-5 py-3 text-white hover:bg-blue-500 w-52"
                        role="button"
                    >
                        Create
                    </Link>
                </div>
            </div>
        </div>
    )
}