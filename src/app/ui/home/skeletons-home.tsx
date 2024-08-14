export const HomePageSkeleton = () => {
    return (
        <main className="min-h-screen p-24 w-full">
            <LatestPostSkeleton/>
            <TechPostsSkeleton/>
            <CategoryPostSkeleton/>
            <InterestingPostSkeleton/>
        </main>
    )
}

/**
 * 
 * @returns 
 */
export const LatestPostSkeleton = () => {
    return (
        <div>
            <h1 className="my-5 text-orange-400 text-4xl border-b-2 border-orange-200 inline-block">New Posts</h1>
            <div className="flex justify-between w-100 container">
                <LatestPostTechSkeleton/>
                <div className="">
                    <LatestPostMarketingSkeleton/>
                    <LatestPostBusinessSkeleton/>
                </div>
            </div>
        </div>
    )
}

/**
 * 
 * @returns 
 */
export const CategoryPostSkeleton = () => {
    return (
        <>
        <h1 className="my-5 text-orange-400 text-4xl border-b-2 border-orange-200 inline-block">Categories</h1>
        <div className="flex justify-between w-100 container my-5">
           <CategoryPostItemSkeleton/>
           <CategoryPostItemSkeleton/>
           <CategoryPostItemSkeleton/>
       </div>
    </>
    )
}


/**
 * 
 * @returns 
 */
export const CategoryPostItemSkeleton = () => {
    return (
        <div className="p-4 w-1/4 rounded-sm shadow-xl bg-gray-50">
            <div className="flex justify-between">
                <div className="h-6 w-24 bg-gray-100 skeleton"></div>
                <div className="w-12 h-6 bg-gray-100 skeleton"></div>
            </div>
            <div className="">
                <div className="mt-2 h-4 w-24 bg-gray-100 skeleton"></div>
                <div className="mt-2 h-4 w-24 bg-gray-100 skeleton"></div>
                <div className="mt-2 h-4 w-24 bg-gray-100 skeleton"></div>
            </div>
        </div>
    )
}
/**
 * 
 * @returns 
 */
export const LatestPostTechSkeleton = () => {
    return (
        <div className="card shadow-xl w-4/6 bg-gray-50">
            <figure className="px-10 pt-10">
                <div className="h-[420px] w-[700px] skeleton bg-gray-200"></div>
            </figure>
            <div className="ml-16 mt-2 skeleton h-4 w-24 bg-gray-100"></div>
            <div className="card-body items-center">
                <div className="card-title skeleton h-5 bg-gray-100 w-[600px]"></div>
                <div className="skeleton h-4 bg-gray-100 w-[800px]"></div>
            </div>
        </div>
    )
}

/**
 * 
 * @returns 
 */
export const LatestPostMarketingSkeleton = () => {
    return (
        <div className="card w-96 shadow-xl skeleton bg-gray-50">
            <div className="skeleton px-10 pt-10 bg-gray-50">
                <div>
                    <div className="skeleton rounded-xl h-[182px] w-[304px] bg-gray-200"></div>
                </div>
            </div>
            <div className="card-body items-center h-28 p-4">
                <div>
                    <div className="card-title skeleton bg-gray-100 w-24 h-4"></div>
                </div>
                <div className="skeleton bg-gray-100 w-24 h-4"></div>
            </div>
            <div className="skeleton ml-3 w-16 h-4 bg-gray-100"></div>
        </div>
    )
}

/**
 * 
 * @returns 
 */
export const LatestPostBusinessSkeleton = () => {
    return (
        <div className="card w-96 shadow-xl skeleton mt-3 bg-gray-50">
            <div className="skeleton px-10 pt-10 bg-gray-50">
                <div>
                    <div className="skeleton rounded-xl h-[182px] w-[304px] bg-gray-200"></div>
                </div>
            </div>
            <div className="card-body items-center h-28 p-4">
                <div>
                    <div className="card-title skeleton bg-gray-100 w-24 h-4"></div>
                </div>
                <div className="skeleton bg-gray-100 w-24 h-4"></div>
            </div>
            <div className="skeleton ml-3 w-16 h-4 bg-gray-100"></div>
        </div>
    )
}

/**
 * 
 * @returns 
 */
export const TechPostsSkeleton = () => {
    return (
        <>
            <h1 className="my-5 text-orange-400 text-4xl border-b-2 border-orange-200 inline-block">Technology</h1>
            <div className="flex justify-between w-100 containerbg-gray-200">
                <TechPostSkeleton/>
                <TechPostSkeleton/>
                <TechPostSkeleton/>
            </div>
        </>
    )
}

/**
 * 
 * @returns 
 */
export const TechPostSkeleton = () => {
    return (
        <>
            <div className="card w-96 shadow-xl relative skeleton bg-gray-50">
                <figure>
                    <div className="h-[230px] w-[384px] bg-gray-200 skeleton"></div>
                </figure>
                <div className="card-body">
                    <div className="h-4 w-24 bg-gray-100 skeleton"></div>
                    <div className="h-4 w-24 bg-gray-100 skeleton"></div>
                    <div className="h-4 w-24 bg-gray-100 skeleton"></div>
                </div>
            </div>
        </>
    )
}

/**
 * 
 * @returns 
 */
export const InterestingPostSkeleton = () => {
    return (
        <>
            <div className="card w-full shadow-xl opacity-100 relative bg-gray-50">
                <figure>
                    <div className=" w-[1280px] h-[877px] bg-gray-200 skeleton"></div>
                </figure>
                <div className="card-body absolute top-1/2 left-12">
                    <div className="card-title w-24 h-6 bg-gray-100 skeleton"></div>
                    <div className="w-24 h-4 bg-gray-400 skeleton"></div>
                </div>
            </div>
        </>
    )
}