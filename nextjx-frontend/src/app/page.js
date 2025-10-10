"use client"

import { useAuth } from "@/components/authProvider"
import useSWR from "swr";   

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const auth = useAuth()
  const { data, error, isLoading } = useSWR('http://127.0.0.1:8001/api/hello', fetcher)
  if (error) return <div>Failed to load data from Django API</div>
  if (isLoading) return <div>Loading...</div>


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          {auth.isAuthenticated ? "Hello User" : "Hellow guest"}
        </div>
        <div>Data from Django API: {JSON.stringify(data)}</div>



      </main>

    </div>
  );
}
