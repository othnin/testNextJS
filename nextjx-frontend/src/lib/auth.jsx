const { cookies } = require('next/headers');

const TOKEN_AGE = 3600
const TOKEN_NAME = 'auth-token'
const REFRESH_TOKEN_NAME = 'auth-refresh-token'

export async function getToken(){
    // api requests - cookies() is a dynamic server API and should be awaited
    const cookieStore = await cookies();
    const myAuthToken = cookieStore.get(TOKEN_NAME)?.value ?? null;
    return myAuthToken;
}

export async function getRefreshToken(){
    const cookieStore = await cookies();
    const myAuthToken = cookieStore.get(REFRESH_TOKEN_NAME)?.value ?? null;
    return myAuthToken;
}


export async function setToken(authToken){
    // login: set cookie on the current response cookie store
    const cookieStore = await cookies();
    cookieStore.set({
        name: TOKEN_NAME,
        value: authToken,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_AGE
    });
}

export async function setRefreshToken(authRefreshToken){
    const cookieStore = await cookies();
    cookieStore.set({
        name: REFRESH_TOKEN_NAME,
        value: authRefreshToken,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_AGE
    });
}

export async function deleteToken(){
    // logout
    const cookieStore = await cookies();
    cookieStore.delete(REFRESH_TOKEN_NAME);
    cookieStore.delete(TOKEN_NAME);
}