// import Header from "@/components/other/Header";
// import Navigation from "@/components/other/Navigation";

 

// export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="  min-h-screen flex flex-col items-stretch">
//       <div >
//         <Header/>
//       </div>
      
//     <div className="flex flex-1  self-stretch">
//         <div className="flex-[1.8] ring-1 ring-slate-200  s"  >
//         <Navigation/>
//       </div>
//       <div className="flex-[10.2]    bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] ">
//         {children}           
//       </div>
//     </div>
//     </div>
//   )
// }









//  "use client";

// import useUser from "@/components/custom-hooks/UseUser";
// import Header from "@/components/other/Header";
// import Navigation from "@/components/other/Navigation";
// import { redirect } from "next/navigation";

 

// export default function ProtectedLayout({ children,}: { children: React.ReactNode}) {
//   const { isAuthenticated, isPending } = useUser();

//   if (isPending) return <p className="text-center text-3xl my-2 tracking-wider">Loading...</p>
//   if (!isAuthenticated) redirect("/login");

//   return (

//     <>
//       <Header/>
//        <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
       
//       <aside className="hidden md:flex w-60 min-w-[240px] flex-col bg-white border-r border-gray-100 sticky top-0 h-screen overflow-y-auto">
//         <Navigation />
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 flex flex-col min-w-0">
//         {children}
//       </main>
//     </div>
//     </>
   
//   );
// }









"use client";

import useUser from "@/components/custom-hooks/UseUser";
import Header from "@/components/other/Header";
import Navigation from "@/components/other/Navigation";
import { redirect } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isPending } = useUser();

  if (isPending) {
    return (
      <p className="text-center text-3xl my-2 tracking-wider">
        Loading...
      </p>
    );
  }

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* FIXED HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </header>

      <div className="flex pt-20">
        
        {/* FIXED SIDEBAR */}
        <aside className="hidden md:flex fixed top-20 left-0 w-60 h-[calc(100vh-5rem)] bg-white border-r border-gray-100 overflow-y-auto">
          <Navigation />
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 md:ml-60 min-w-0 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}