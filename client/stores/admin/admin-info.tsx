"use client"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type TAdminInfoContext = {
    adminInfo: Partial<User>;
    changeAdminInfo: (user: User) => void
}
export const AdminInfoContext = createContext<TAdminInfoContext>({
    adminInfo: {},
    changeAdminInfo: () => {}
});

export const AdminInfoContextProvider = function({
    children
}:{
    children:React.ReactNode,
}) {
    const [adminInfo, setAdminInfo] = useState<Partial<User>>({});

    const changeAdminInfo = useCallback((user: User) => {
        setAdminInfo(user)
    }, [])

    const context = useMemo(() => {
        return {
            adminInfo,
            changeAdminInfo
        }
    }, [
        adminInfo,
        changeAdminInfo
    ]) 

    return (
        <AdminInfoContext.Provider value={context}>
            {children}
        </AdminInfoContext.Provider>
    )
};


export function useAdminInfoContext () {
    return useContext(AdminInfoContext);
}