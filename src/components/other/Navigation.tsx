







// "use client";

// import { menuItems } from "@/utils/constants";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import {
//   MdDashboard,
//   MdBarChart,
//   MdShowChart,
//   MdBook,
//   MdLibraryAdd,
//   MdCallMade,
//   MdCallReceived,
//   MdPeople,
//   MdPersonAdd,
//   MdLogout,
// } from "react-icons/md";

 

// // icon mapping
// const iconMap: Record<string, React.ElementType> = {
//   Dashboard: MdDashboard,
//   "Add Book": MdLibraryAdd,
//   "Students List": MdPeople,
//   "Add Student": MdPersonAdd,
//   "Issue Book": MdCallMade,
//   "Return Book": MdCallReceived,
//   "Student Analytics": MdBarChart,
//   "Books Chart": MdShowChart,
//   Logout: MdLogout,
//   "All Books": MdBook,
// };

// export default function Navigation() {
//   const pathname = usePathname();

//   return (
//     <div className="flex flex-col h-full">
//       <nav className="flex-1 py-3">
//         {menuItems.map((item) => {
//           const Icon = iconMap[item.title];

//           const isActive =
//             item.path && pathname === item.path;

//           return (
//             <Link
//               key={item.title}
//               href={item.path || "#"}
//               className={`flex items-center gap-2.5 px-5 py-2.5 text-[13.5px] border-l-2 transition-all duration-150 ${
//                 isActive
//                   ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-medium"
//                   : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800"
//               }`}
//             >
//               {Icon && (
//                 <Icon
//                   className={`text-lg flex-shrink-0 ${
//                     isActive
//                       ? "text-emerald-600"
//                       : "text-gray-400"
//                   }`}
//                 />
//               )}

//               {item.title}
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// }







 








"use client";

import { menuItems } from "@/utils/constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  MdDashboard,
  MdBarChart,
  MdShowChart,
  MdBook,
  MdLibraryAdd,
  MdCallMade,
  MdCallReceived,
  MdPeople,
  MdPersonAdd,
  MdLogout,
} from "react-icons/md";

import { logoutUser } from "@/api/auth";

const iconMap: Record<string, React.ElementType> = {
  Dashboard: MdDashboard,
  "Add Book": MdLibraryAdd,
  "Students List": MdPeople,
  "Add Student": MdPersonAdd,
  "Issue Book": MdCallMade,
  "Return Book": MdCallReceived,
  "Student Analytics": MdBarChart,
  "Books Chart": MdShowChart,
  Logout: MdLogout,
  "All Books": MdBook,
};

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const { mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast("✅ Logged out successfully.");
      router.push("/login");
    },
    onError: (error: Error) => toast(`❌ ${error.message}`),
  });

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to sign out?"
    );
    if (confirmed) {
      logout();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 py-3">
        {menuItems.map((item) => {
          const Icon = iconMap[item.title];
          const isLogout = item.title === "Logout";
          const isActive = item.path && pathname === item.path;

          // Logout — button hai, Link nahi
          if (isLogout) {
            return (
              <button
                key={item.title}
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-5 py-2.5 text-[13.5px] border-l-2 border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all duration-150"
              >
                {Icon && (
                  <Icon className="text-lg flex-shrink-0 text-gray-400" />
                )}
                {item.title}
              </button>
            );
          }

          return (
            <Link
              key={item.title}
              href={item.path || "#"}
              className={`flex items-center gap-2.5 px-5 py-2.5 text-[13.5px] border-l-2 transition-all duration-150 ${
                isActive
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-medium"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              {Icon && (
                <Icon
                  className={`text-lg flex-shrink-0 ${
                    isActive ? "text-emerald-600" : "text-gray-400"
                  }`}
                />
              )}
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}