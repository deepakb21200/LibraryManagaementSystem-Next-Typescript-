// "use client";
// import useUser from "@/components/custom-hooks/UseUser";
// import { redirect } from "next/navigation";

// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated, isPending } = useUser();

//   if (isPending) return <p className="text-center text-3xl my-2 tracking-wider">Loading...</p>
//   if (isAuthenticated) redirect("/dashboard"); // next/navigation se

//   return <>
//   <div>{children}</div>
  
//   </>;
// }










"use client";

import useUser from "@/components/custom-hooks/UseUser";
import { redirect } from "next/navigation";
 

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isPending } = useUser();

  // if (isPending) {
  //   return (
  //     <p className="text-center text-3xl my-2 tracking-wider">
  //       Loading...
  //     </p>
  //   );
  // }

  // if (isAuthenticated) {
  //   redirect("/dashboard");
  // }

  return (
    <>
     

      
       
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-4 flex items-center justify-center">
          {children}
        </div>
       
    </>
  );
}