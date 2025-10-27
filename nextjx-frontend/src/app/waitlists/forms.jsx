"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


const WAITLIST_API_URL = "/api/waitlists/"

export default function WaitListForm() {
 const [message, setMessage] = useState('')
 const [error, setError] = useState('')

 async function handleSubmit(event){
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

     const response = await fetch(WAITLIST_API_URL, requestOptions)
     if (response.ok) {
        setMessage("Thank you for joining the waitlist!")
     } else{
        setError("There was an error submitting the form.")
     }
 }

  return <form onSubmit={handleSubmit}>
    <div> {message && message}</div>
    <div> {error && error}</div>
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="Your email address" required />
    </div>
    <Button type="submit" className="ml-4">
        Join Waitlist
    </Button>
      </div>
    </form  >
}
