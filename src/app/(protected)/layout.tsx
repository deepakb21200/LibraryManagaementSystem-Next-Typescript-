import Navigation from "@/components/other/Navigation";

 

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="flex-[1.8] ring-1 ring-slate-200 min-h-screen">
        <Navigation/>
      </div>
      <div className="flex-[10.2] min-h-screen">
        {children}          {/* Outlet ki jagah children aata hai Next.js me */}
      </div>
    </div>
  )
}


//35.46 resume

// supabase new project password= jDf99J7HhOPJ2nYj