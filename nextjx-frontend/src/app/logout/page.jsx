"use client"
import { useAuth } from "@/components/authProvider"
const LOGOUT_URL = "/api/logout/"

export default function Page(){
    const auth = useAuth()

    async function handleClick(event){
        console.log("Form submitted")
        event.preventDefault() //stop from being redirected.
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: ""
        }
        const response = await fetch(LOGOUT_URL, requestOptions)
        //console.log("Response from login API: ", data)
        if (response.ok){
            console.log("logout successful")
            auth.logout()
        }
    }


    return  <div className="h-[95vh]">
            <div className='max-w-md mx-auto py-5'>
            <h1>Are you sure you want to logout?</h1>
            <button onClick={handleClick} type="submit" className='bg-red-500 text-white px-4 py-2 rounded'>Logout</button>
            </div>
    </div>


}