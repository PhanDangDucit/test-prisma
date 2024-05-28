/**
 * Event is emitted on client (UI)
 */

import { createClient } from "@/configs/supabase-client.config"

const supabase = createClient();

/**
 * Class play with "Context" rule for clients
 */
class EventAuthSupabaseApproaches {
    private _authHandleEvent: EventWrap;

    constructor(_authHandleEvent: EventWrap) {
        this._authHandleEvent = _authHandleEvent
    }
    /**
     * Set event handler
     */
    setHandleEvent(_authHandleEvent:EventWrap) {
        return this._authHandleEvent = _authHandleEvent
    }

    /**
     * 
     */
    authEventHandler() {
        return this._authHandleEvent.handleEvent();
    }
}

/**
 * Interface plays with "Strategies" rule
 */
interface EventWrap {
    handleEvent: () => void;
}

/**
 * Algorithm for signout event handlers
 *      - Clear storages
 */
class SignOutEventHandler implements EventWrap {
    handleEvent() {
        [
            window.localStorage,
            window.sessionStorage,
        ].forEach(
            (storage) => {
                Object.entries(storage).forEach(
                    ([key]) => {
                        storage.removeItem(key)
                    }
                )
            }
        )
    }
}

/**
 * Algorithm for refreshing token event handlers
 */

class TokenRefreshEventHandler implements EventWrap {
    handleEvent() {
        
    }
}

/**
 * Algorithm for sign in by "social" provider
 */
class SignInSocialProviderEventHandler implements EventWrap {
    handleEvent() {
        // Register this immediately after calling createClient!
        // Because signInWithOAuth causes a redirect, you need to fetch the
        // provider tokens from the callback.
        supabase.auth.onAuthStateChange((event, session) => {
            if (session && session.provider_token) {
                window.localStorage.setItem('oauth_provider_token', session.provider_token)
            }
        
            if (session && session.provider_refresh_token) {
                window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token)
            }
        
            if (event === 'SIGNED_OUT') {
                window.localStorage.removeItem('oauth_provider_token')
                window.localStorage.removeItem('oauth_provider_refresh_token')
            }
        })
    }
}

/**
 * Algorithm for "password recovery" event handlers
 */
class PasswordRecoveryEventHandler implements EventWrap {
    handleEvent() {

    }
}

/**
 * Algorithm for "update" user's information event handlers
 */
class UserUpdateEventHandler implements EventWrap {
    handleEvent() {

    }
}

/**
 * Algorithm for "initial session" event handlers
 */
class InitialSessionEventHandler implements EventWrap {
    handleEvent() {

    }
}

const { data } = supabase.auth.onAuthStateChange((event, session) => {
    // console.log(event, session)
    switch(event) {
        case 'INITIAL_SESSION':
            (new InitialSessionEventHandler()).handleEvent();
            break;
        case 'SIGNED_IN':
            (new SignInSocialProviderEventHandler()).handleEvent();
            break;
        case 'SIGNED_OUT':
            (new SignOutEventHandler()).handleEvent();
            break;
        case 'PASSWORD_RECOVERY':
            (new PasswordRecoveryEventHandler()).handleEvent();
            break;
        case 'TOKEN_REFRESHED':
            (new TokenRefreshEventHandler()).handleEvent();
            break;
        case 'USER_UPDATED':
            (new UserUpdateEventHandler()).handleEvent();
            break;
    }
})
  
// call unsubscribe to remove the callback
data.subscription.unsubscribe();