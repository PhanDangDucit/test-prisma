
export default  function DetailPostPageSkeleton() {
    return (
        <>
            {/* Main */}
            <div className="skeleton grid grid-cols-3 gap-3">
                <ContentMainDetailPostSkeleton/>
                <ManyViewsPostsSkeleton/>
            </div>
            <hr className="w-full h-1 mx-auto my-12 bg-gray-300 border-0 rounded md:my-8 dark:bg-gray-300"/>
            <div className="grid grid-cols-3 gap-3 mt-5 pt-6">
                {/* Comment */}
                <div className="col-start-1 col-end-3">
                    <h1 className="my-5 text-orange-600 text-2xl border-b-2 border-orange-200 inline-block p-1"></h1>
                    <NewCommentMainSkeleton/>
                    <CommentListSkeleton/>
                </div>
                {/* Posts with other topics*/}
                    <TheBestViewPostSkeleton/>
            </div>
        </>
    )
}

export const PostRelatedSkeleton = () => {
    return (
        <div className="bg-gray-100 p-4 mt-12">
            <div className="flex p-4 bg-white rounded-2xl relative">
                <div className="w-48 h-48 relative">
                    <div className="object-cover"></div>
                </div>
                <div className="p-2">
                    <h3 className="text-gray-600 mb-3 font-medium"></h3>
                    <div
                        className="text-gray-500" 
                    />
                </div>
            </div>
        </div>
    );
}

export function ContentMainDetailPostSkeleton() {
    return (
        <div className="col-start-1 col-end-3">
            <div className="flex justify-between">
                <h4 className="text-orange-400 uppercase"></h4>
                <h5 className="text-orange-400"></h5>
            </div>
            <h1 
                className="text-gray-700 dark:text-gray-400 font-medium text-3xl mt-6"
            >
            </h1>
            <div className="mb-1 text-gray-700 dark:text-gray-400 mt-5 pr-12"/>
            {/* Auth */}
            <div>
                <div className="text-end uppercase text-black font-bold -translate-x-[50px]"></div>
            </div>
            <PostRelatedSkeleton/>
        </div>
    )
}

export function ManyViewsPostsSkeleton() {
    return (
        <div className="">
            <h1 className="my-5 text-orange-600 text-2xl border-b-2 border-orange-200 inline-block p-1">Popular Post</h1>
            <div 
                className="relative mb-2 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                <div className="relative w-24 h-24">
                    <div></div>
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white"></h5>
                </div>
            </div>
        </div>
    )
}

export function NewCommentMainSkeleton() {
    return (
        <div className="p-4">
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <div className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <div className="w-5 h-5"></div>
                </div>
                <div 
                    className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                </div>
                <div 
                    className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                    <div className="w-5 h-5 rotate-90 rtl:-rotate-90"></div>
                </div>
            </div>
        </div>
    )
}

export function CommentParentItem() {
    return (
        <div className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            <div className="pb-3 sm:pb-4">
                <div>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse py-4">
                        <div className="flex-shrink-0">
                            <div 
                                className="w-8 h-8 rounded-full"
                            ></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Neil Sims
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Hello.....
                            </p>
                        </div>
                    </div>
                    <div className="pl-10">
                        <ul className="flex">
                            <li className="flex cursor-pointer hover:text-orange-500">
                                <div className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                </div>
                            </li>
                            <li className="px-4 flex cursor-pointer hover:text-orange-500">
                                <div className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                </div>
                            </li>
                            <li className="flex cursor-pointer px-4 hover:text-orange-500">
                                <div 
                                    className=""
                                >
                                    Reply
                                </div>
                            </li>
                            <div className="px-4 cursor-pointer hover:text-orange-500">
                                <div className="w-6 h-6"></div>
                            </div>
                        </ul>
                    </div>
                </div>
                {/* List-subcomment */}
                <div className="pl-24 mt-2">
                   <div id="list-sub-comment" className="border-l-2 border-gray-400">
                        {/* Sub-comment-item */}
                        <div id="sub-comment-item-2" className="pb-3 sm:pb-4 pl-4 py-4">
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="flex-shrink-0">
                                    <div 
                                        className="w-8 h-8 rounded-full"
                                    ></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    </p>
                                </div>
                            </div>
                            {/*  */}
                            {/* action of sub-comment*/}
                            <div className="pl-10">
                                <ul className="flex">
                                    <li className="flex cursor-pointer hover:text-orange-500">
                                        <div className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                        </div>
                                    </li>
                                    <li className="px-4 flex cursor-pointer hover:text-orange-500">
                                        <div className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                        </div>
                                    </li>
                                    <li className="flex cursor-pointer px-4 hover:text-orange-500">
                                        <div 
                                            className=""
                                        >
                                        </div>
                                    </li>
                                    <li className="px-4 cursor-pointer hover:text-orange-500">
                                        <div className="w-6 h-6">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>
    );
}

export function CommentListSkeleton() {
    return (
        <>
            <CommentParentItem/>
        </>
    )
}

export const TheBestViewPostSkeleton = () => {
    return (
        <div className="">
            <h1 className="my-5 text-orange-600 text-2xl border-b-2 border-orange-200 inline-block p-1"></h1>
            <div
                className="relative mb-2 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                <div className="w-24 h-24 relative">
                    <div
                        className="object-cover p-2"
                    ></div>
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white"></h5>
                </div>
            </div>
        </div>
    );
}