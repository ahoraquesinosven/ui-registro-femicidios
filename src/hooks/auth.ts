import { createContext, useContext, useRef } from "react";
import { AccessToken } from "@/types/auth";

export interface AuthContextValue {
  token: AccessToken;
  login: (rawToken: string) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthContextProvider = AuthContext.Provider;

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

export function useAccessToken(): AccessToken {
  return useAuth().token;
}

// The access token is a deliberately imperative in-memory store, not React render
// state: the router's beforeLoad guard must read it synchronously during navigation.
// A single stable instance mutated in place means context.auth.token reflects login()
// the instant it runs, so the post-login redirect passes the guard. Lost on reload,
// as required. Nothing mounted at login time reads the token (authenticated components
// mount only after the post-login redirect), so no reactivity is needed here.
export function useAuthProviderValue(): AuthContextValue {
  const ref = useRef<AuthContextValue>();
  if (!ref.current) {
    const token = new AccessToken();
    ref.current = {
      token,
      login: (rawToken: string) => {
        token.accessToken = rawToken;
      },
    };
  }
  return ref.current;
}
