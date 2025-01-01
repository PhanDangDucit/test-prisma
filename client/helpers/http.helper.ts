/**
 * @desc handle fields in url
 * @returns 
 */
export const getFielBySearchParam = ({
    searchParam, field
}: {
    searchParam:URLSearchParams, field: string
}) => {
    return searchParam.get(field) ?? "";
}

export function getURL() {
    const hostDev = process.env.NEXT_PUBLIC_HOST_DEV ?? "http://localhost:3000";
    const hostTech = process.env.NEXT_PUBLIC_HOST_TECH;
    return process.env.NEXT_PUBLIC_NODE_ENV == "development" ? hostDev : hostTech;
}