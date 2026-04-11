"use client"
import { getBooks } from '@/api/booksApi';
import { useQuery } from '@tanstack/react-query';
 

function page() {
   const {data, isPending,error}=useQuery({
    queryKey:["books"],
    queryFn:getBooks
  })

  console.log({data}); 
  
  return (
    <div>Dashboard</div>
  )
}

export default page