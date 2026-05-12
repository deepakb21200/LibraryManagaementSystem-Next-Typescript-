





// "use client";

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
// } from "react-icons/md";

// const navItems = [
//   {
//     section: "Overview",
//     links: [
//       { label: "Dashboard", href: "/dashboard", icon: MdDashboard },
//       { label: "Analytics", href: "/analytics", icon: MdBarChart },
//       { label: "Chart", href: "/chart", icon: MdShowChart },
//     ],
//   },
//   {
//     section: "Books",
//     links: [
//       { label: "All Books", href: "/dashboard", icon: MdBook },
//       { label: "Add Book", href: "/addBook", icon: MdLibraryAdd },
//       { label: "Issue Book", href: "/issueBook", icon: MdCallMade },
//       { label: "Return Book", href: "/returnBook", icon: MdCallReceived },
//     ],
//   },
//   {
//     section: "Students",
//     links: [
//       { label: "Students List", href: "/studentsList", icon: MdPeople },
//       { label: "Add Student", href: "/addStudent", icon: MdPersonAdd },
//     ],
//   },
// ];

// export default function Navigation() {
//   const pathname = usePathname();

//   return (
//     <div className="flex flex-col h-full">
      
     

//       {/* Nav links */}
//       <nav className="flex-1 py-3">
//         {navItems.map((group) => (
//           <div key={group.section} className="mb-2">
//             <p className="text-[10px] uppercase tracking-widest font-medium text-gray-400 px-5 py-2">
//               {group.section}
//             </p>
//             {group.links.map(({ label, href, icon: Icon }) => {
//               const isActive = pathname === href;
//               return (
//                 <Link
//                   key={href + label}
//                   href={href}
//                   className={`flex items-center gap-2.5 px-5 py-2.5 text-[13.5px] border-l-2 transition-all duration-150 ${
//                     isActive
//                       ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-medium"
//                       : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800"
//                   }`}
//                 >
//                   <Icon className={`text-lg flex-shrink-0 ${isActive ? "text-emerald-600" : "text-gray-400"}`} />
//                   {label}
//                 </Link>
//               );
//             })}
//           </div>
//         ))}
//       </nav>
//     </div>
//   );
// }









"use client";

import { menuItems } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

 

// icon mapping
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

  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 py-3">
        {menuItems.map((item) => {
          const Icon = iconMap[item.title];

          const isActive =
            item.path && pathname === item.path;

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
                    isActive
                      ? "text-emerald-600"
                      : "text-gray-400"
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







 