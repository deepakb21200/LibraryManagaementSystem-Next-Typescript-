// app/providers.jsx
'use client'   // <-- yeh zaroori hai

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'


interface ProviderProps{
    children:React.ReactNode
}

export default function Providers({ children }:ProviderProps) {
  // useState isliye use karte hain taaki har request pe
  // naya QueryClient na bane — ek hi instance rahe
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}