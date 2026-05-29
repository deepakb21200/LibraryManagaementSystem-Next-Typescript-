
// "use client";

// import useUser from "@/components/custom-hooks/UseUser";
// import Header from "@/components/other/Header";
// import Navigation from "@/components/other/Navigation";
// import { redirect } from "next/navigation";

// export default function ProtectedLayout({ children}: {children: React.ReactNode}) {
//   const { isAuthenticated, isPending } = useUser();

//   if (isPending) {
//     return (
//       <p className="text-center text-3xl my-2 tracking-wider">
//         Loading...
//       </p>
//     );
//   }

//   if (!isAuthenticated) {
//     redirect("/login");
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       {/* FIXED HEADER */}
//       <header className="fixed top-0 left-0 right-0 z-50">
//         <Header />
//       </header>

//       <div className="flex pt-20">
        
//         {/* FIXED SIDEBAR */}
//         <aside className="hidden md:flex fixed top-20 left-0 w-60 h-[calc(100vh-5rem)] bg-white border-r border-gray-100 overflow-y-auto">
//           <Navigation />
//         </aside>

//         {/* MAIN CONTENT */}
//         <main className="flex-1 md:ml-60 min-w-0 p-4">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }








// "use client";

// import useUser from "@/components/custom-hooks/UseUser";
// import Header from "@/components/other/Header";
// import Navigation from "@/components/other/Navigation";
// import { redirect } from "next/navigation";
// import { useState } from "react";
// import { MdMenu, MdClose } from "react-icons/md";

// export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated, isPending } = useUser();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   if (isPending) {
//     return (
//       <p className="text-center text-3xl my-2 tracking-wider">
//         Loading...
//       </p>
//     );
//   }

//   if (!isAuthenticated) {
//     redirect("/login");
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* FIXED HEADER */}
//       <header className="fixed top-0 left-0 right-0 z-50">
//         <Header />
//       </header>

//       <div className="flex pt-20">

//         {/* Mobile overlay */}
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 z-30 bg-black/40 md:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* SIDEBAR — desktop always visible, mobile toggle */}
//         <aside
//           className={`fixed top-20 left-0 w-60 h-[calc(100vh-5rem)] bg-white border-r border-gray-100 overflow-y-auto z-40 
//             transition-transform duration-300   md:translate-x-0
//             ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           `}
//         >
//           {/* Mobile close button */}
//           <div className="flex justify-end px-3 pt-3 md:hidden">
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
//             >
//               <MdClose className="text-xl" />
//             </button>
//           </div>

//           <Navigation />
//         </aside>

//         {/* MAIN CONTENT */}
//         <main className="flex-1 md:ml-60 min-w-0 p-4">

//           {/* Mobile hamburger */}
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="md:hidden mb-4 p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors shadow-sm"
//           >
//             <MdMenu className="text-xl" />
//           </button>

//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }











"use client";

import useUser from "@/components/custom-hooks/UseUser";
import Header from "@/components/other/Header";
import Loader from "@/components/other/Loader";
import Navigation from "@/components/other/Navigation";
import { redirect } from "next/navigation";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isPending } = useUser();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // if (isPending) {
  //   return (
  //     <p className="my-2 text-center text-3xl tracking-wider">
  //       Loading...44444444444
  //     </p>
  //   );
  // }

if (isPending) return <Loader />;

  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="fixed left-0 right-0 top-0 z-50">
        <Header />
      </header>

      <div className="flex pt-20">

        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
            fixed top-20 left-0 z-40
            h-[calc(100vh-5rem)]
            w-60 overflow-y-auto
            border-r border-gray-100 bg-white
            transition-transform duration-300

            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }

            lg:translate-x-0
          `}
        >
          {/* CLOSE BUTTON — only mobile */}
          <div className="flex justify-end px-3 pt-3 lg:hidden">
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <MdClose className="text-xl" />
            </button>
          </div>

          <Navigation />
        </aside>

        {/* MAIN */}
        <main className="flex-1 min-w-0 p-4 lg:ml-60">

          {/* BURGER BUTTON — hidden on lg */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="mb-4 rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-800 lg:hidden"
          >
            <MdMenu className="text-xl" />
          </button>

          {children}
        </main>
      </div>
    </div>
  );
}