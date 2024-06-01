import { auth } from "@/auth";
import { createClient } from "@/configs/supabase-server.config";
import { User } from "@supabase/supabase-js";

/**
 * Strategy pattern for get user's information
 */
class UserInfoAuth {
    private userInfoApproach: UserInfo;

    constructor(userInfoApproach: UserInfo) {
        this.userInfoApproach = userInfoApproach;
    }

    /**
     * set approach to get user's infomation
     * @param userInfoApproach
     */
    setUserInfoMethod(userInfoApproach: UserInfo) {
        this.userInfoApproach = userInfoApproach;
    }

    /**
     * @returns user information
     */
    getUserInfoApproach() {
        return this.userInfoApproach.getUserInfo();
    }
}

/**
 * Interface for get user's information in app
 */
interface UserInfo {
    getUserInfo(): Promise<any>;
}

/**
 * class SpabaseUserInfo is used to getUserInfo from supabase
 */
export class SupabaseUserInfo implements UserInfo {
    async getUserInfo() {
        const supabase = createClient();
        return (await supabase.auth.getUser()).data.user;
    }
}

/**
 * 
 */
export class AuthJSUserInfo implements UserInfo {
    async getUserInfo() {
        return (await auth())?.user;
    }
}

/**
 * Get user's information with email supabase
 * @returns
 */
export const getUserInfoSupabase = function async():Promise<User> {
    const userInfoSupabaseObj = new UserInfoAuth(new SupabaseUserInfo());
    return userInfoSupabaseObj.getUserInfoApproach();
}


/**
 * Check user to redirect
 * @param email 
 * @returns
 */
export function isAdmin(email: string) {
    if(email != 'phanduc.flp@gmail.com') return 0;
    return 1;
}