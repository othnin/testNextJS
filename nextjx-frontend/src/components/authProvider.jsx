"use client"

import next from "next";
import { useSearchParams, usePathname, useRouter } from "next/navigation"
const { createContext, useContext, useState, useEffect } = require("react");
const AuthContext = createContext(null);

const LOGIN_REDIRECT_URL = "/"
const LOGOUT_REDIRECT_URL = "/login"
const LOGIN_REQUIRED_URL = "/login"

const LOCAL_STORAGE_KEY = "is-logged-in"


export function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter() 
    const pathname = usePathname()
    const searchParams = useSearchParams()
 
    useEffect(()=>{
        //TODO: If user looses information while filling out form and then logs in, they lose their data. Fix this.
        //Maybe using a time out method to clear the next param after a certain time.
        const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (storedAuthStatus) {
            const storedAuthStatusInt = parseInt(storedAuthStatus)
            setIsAuthenticated(storedAuthStatusInt === 1)
        }
    }, [])

    const login = () => {
        setIsAuthenticated(true)
        localStorage.setItem(LOCAL_STORAGE_KEY, "1")
        const nextUrl = searchParams.get('next') 
        const invalidNextUrl = ['/login', '/logout']
        const nextUrlValid = nextUrl && nextUrl.startsWith("/") && !invalidNextUrl.includes(nextUrl)
        if (nextUrlValid) 
             router.replace(nextUrl)
        else 
            router.replace(LOGIN_REDIRECT_URL)
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.setItem(LOCAL_STORAGE_KEY, "0")
        router.replace(LOGOUT_REDIRECT_URL)
    }

    const loginRequiredRedirect = () => {
        //user is not logged in via API
        setIsAuthenticated(false)
        localStorage.setItem(LOCAL_STORAGE_KEY, "0")
        const loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathname}`
        if (LOGIN_REQUIRED_URL == pathname) {
            loginWithNextUrl = `${LOGIN_REQUIRED_URL}`
        }
        console.log("Redirecting to login page: ", loginWithNextUrl)
        router.replace(loginWithNextUrl)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, loginRequiredRedirect}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth(){
    return useContext(AuthContext)
}