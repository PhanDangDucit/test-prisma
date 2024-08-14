"use client"
import { TCommentWithUser } from "@/helpers/definitions";
import { createContext, useContext, useState } from "react";

// type SubComments = TCommentWithUser[];

// interface SubComments {
//     subcomment: TCommentWithUser[];
// }

export type SubcommentsWithParentId = {
    parentId:number;
    subcomments:TCommentWithUser[]
}

export type SubcommentsProvider = {
    subcommentsWithParentIdList: SubcommentsWithParentId[],
    setSubcommentsWithParentIdList: React.Dispatch<React.SetStateAction<SubcommentsWithParentId[]>>
}

export const SubcommentsContext = createContext<SubcommentsProvider|{}>({});

export const SubcommentsProvider = function({
    children
}:{
    children:React.ReactNode
}) {

    const [subcommentsWithParentIdList, setSubcommentsWithParentIdList] = useState<SubcommentsWithParentId[]>([]);
    // console.log("typeof setSubcommentsWithParentIdList the first::", setSubcommentsWithParentIdList)

    return (
        <SubcommentsContext.Provider
            value={{
                subcommentsWithParentIdList,
                setSubcommentsWithParentIdList
            }}>
            {children}
        </SubcommentsContext.Provider>
    )
};


 // ---> Create a individual cope
export function useSubcommentsContext () {
    const context = useContext(SubcommentsContext) as SubcommentsProvider;
    if(!context) {
        throw new Error ("Subcomments context in subcomment-context file isn't exist!");
        
    }
    return context;
}