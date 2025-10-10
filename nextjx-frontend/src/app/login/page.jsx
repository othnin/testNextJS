"use client"
import { useAuth } from "@/components/authProvider"
const LOGIN_URL = "/api/login/"

export default function Page(){
    const auth = useAuth()


    async function handleSubmit(event){
        console.log("Form submitted")
        event.preventDefault() //stop from being redirected.
        console.log(event, event.target)
        const formData = new FormData(event.target)
        const objectFromForm = Object.fromEntries(formData)
        const jsonData = JSON.stringify(objectFromForm)
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        }
        const response = await fetch(LOGIN_URL, requestOptions)
        const data = await response.json()
        if (response.ok){
            console.log("Login successful")
            auth.login()
        }
    }


    return  <div className="h-[95vh]">
            <div className='max-w-md mx-auto py-5'>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name='username' placeholder='Your name' className='w-full mb-2 p-2 border border-gray-300 rounded'/>
                    <input type="password" name='password' placeholder='Your password' className='w-full mb-2 p-2 border border-gray-300 rounded'/>
                <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded'>Login</button>
            </form>
            </div>
    </div>


}