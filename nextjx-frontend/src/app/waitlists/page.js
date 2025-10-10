"use client"
import { useAuth } from "@/components/authProvider";
import { useEffect } from "react";
import useSWR from "swr";   

const fetcher = async url => {
  const res = await fetch(url)
 
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }
 
  return res.json()
}
 
const WAITLIST_API_URL = "/api/waitlists/"

export default function Page() {
  const { data, error, isLoading } = useSWR(WAITLIST_API_URL, fetcher)
  const auth = useAuth()
  useEffect(() => {
    if (error?.status === 401) {
      // Redirect to login page or show a message
      auth.loginRequiredRedirect()
    }
  }, [error])
  if (error) return <div>Failed to load data from Django API</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <h1> app/waitilist/page.js</h1>
          {JSON.stringify(data)}
        </div>
      </main>
    </div>
  );
}
