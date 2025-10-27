"use client"
import { LoginForm } from "@/components/login-form"
import { useAuth } from "@/components/authProvider"
const LOGIN_URL = "/api/login/"

export default function Page() {
 const auth = useAuth()

 async function handleSubmit(event){
   event.preventDefault() //stop from being redirected.
   try {
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

    // Some endpoints may return an empty body (204 or errors). Read text first
    // and only attempt to parse JSON when there's content.
    const text = await response.text()
    let data = null
    if (text) {
      try {
        data = JSON.parse(text)
      } catch (err) {
        console.warn('Response was not valid JSON:', err)
        // keep data as null
      }
      }

    if (!response.ok) {
      console.error('Login request failed', response.status, response.statusText, data, text)
      // Optionally show an error message in the UI here
      return
    }

    // success
    console.log('Logged in')
    auth.login(data?.username)
   } catch (err) {
     console.error('Network or unexpected error during login:', err)
   }
 }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
