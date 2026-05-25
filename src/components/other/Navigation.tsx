







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







 