
// "use client";

// import Link from "next/link";
// import { MdMenuBook } from "react-icons/md";

// function Header() {
//   return (
//     <header className="w-full border-b border-gray-100 bg-white px-4 sm:px-6 py-4">
//       <div className="flex items-center justify-between">
//         <Link
//           href="/"
//           className="flex items-center gap-3 group"
//         >
//           {/* Logo */}
//           <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-all duration-200">
//             <MdMenuBook className="text-white text-2xl" />
//           </div>

//           {/* Text */}
//           <div>
//             <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-800">
//               LibraryMS
//             </h1>

//             <p className="text-[11px] sm:text-xs text-gray-400 tracking-wider uppercase">
//               Management System
//             </p>
//           </div>
//         </Link>

//         {/* Status */}
//         <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
//           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>

//           <p className="text-xs font-medium text-emerald-700">
//             System Active
//           </p>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;








"use client";

import Link from "next/link";
import { MdMenuBook } from "react-icons/md";

function Header() {
  return (
    <header className="h-20 w-full border-b border-gray-100 bg-white px-4 sm:px-6">
      <div className="h-full flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-all duration-200">
            <MdMenuBook className="text-white text-2xl" />
          </div>

          <div>
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-800">
              LibraryMS
            </h1>

            <p className="text-[11px] sm:text-xs text-gray-400 tracking-wider uppercase">
              Management System
            </p>
          </div>
        </Link>

        <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>

          <p className="text-xs font-medium text-emerald-700">
            System Active
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;