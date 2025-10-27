"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import React, { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

const LOGIN_REDIRECT_URL = "/"
const LOGOUT_REDIRECT_URL = "/login"
const LOGIN_REQUIRED_URL = "/login"

const LOCAL_STORAGE_KEY = "is-logged-in"
const LOCAL_USERNAME_KEY = "username"


export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        // restore auth state from localStorage (keeps UX simple for this example)
        const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (storedAuthStatus) {
            const storedAuthStatusInt = parseInt(storedAuthStatus)
            setIsAuthenticated(storedAuthStatusInt === 1)
        }
        const storedUn = localStorage.getItem(LOCAL_USERNAME_KEY)
        if (storedUn) {
            setUsername(storedUn)
        }
    }, [])

    const login = (username = null) => {
        setIsAuthenticated(true)
        // if (userObj) setUser(userObj)
        localStorage.setItem(LOCAL_STORAGE_KEY, "1")
        if (username) {
            localStorage.setItem(LOCAL_USERNAME_KEY, `${username}`)
            setUsername(username)
        } else {
            localStorage.removeItem(LOCAL_USERNAME_KEY)
        }
        const nextUrl = searchParams.get("next")
        const invalidNextUrl = ["/login", "/logout"]
        const nextUrlValid = nextUrl && nextUrl.startsWith("/") && !invalidNextUrl.includes(nextUrl)
        if (nextUrlValid) router.replace(nextUrl)
        else router.replace(LOGIN_REDIRECT_URL)
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUser(null)
        localStorage.setItem(LOCAL_STORAGE_KEY, "0")
        router.replace(LOGOUT_REDIRECT_URL)
    }

    const loginRequiredRedirect = () => {
        setIsAuthenticated(false)
        setUser(null)
        localStorage.setItem(LOCAL_STORAGE_KEY, "0")
        let loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathname}`
        if (LOGIN_REQUIRED_URL === pathname) {
            loginWithNextUrl = `${LOGIN_REQUIRED_URL}`
        }
        console.log("Redirecting to login page: ", loginWithNextUrl)
        router.replace(loginWithNextUrl)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout, loginRequiredRedirect }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}