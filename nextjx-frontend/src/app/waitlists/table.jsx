"use client"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useSWR from "swr"
import { useAuth } from "@/components/authProvider"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const WAITLIST_API_URL = "/api/waitlists/"

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

export default function WaitListTable() {
    const router = useRouter()
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
    console.log(data)
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, idx) => (
          <TableRow key={`item-${idx}`} onClick ={e => router.push(`/waitlists/${item.id}`)} className="cursor-pointer hover:bg-muted">
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell className="font-medium">{item.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
