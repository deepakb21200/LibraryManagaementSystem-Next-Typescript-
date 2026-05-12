// "use client";

// import { BooksTable } from "./BooksTable";

 

// export  const BooksDialog = ({ open, onOpenChange, books, studentName }) => {

//   // ❌ agar open false hai to render hi mat karo
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center    p-4">
      
//       {/* Modal Box */}
//       <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
        
//         {/* Close Button */}
//         <button
//           onClick={() => onOpenChange(false)}
//           className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl cursor-pointer"
//         >
//           ✕
//         </button>

//         {/* Title */}
//         <h2 className="text-center text-2xl font-semibold tracking-wide mb-4">
//           List of Books assigned to {studentName}
//         </h2>

//         {/* Table */}
//         <BooksTable books={books} />
//       </div>
//     </div>
//   );
// };


"use client";

import { BooksTable } from "./BooksTable";
import { useEffect, useState } from "react";

export const BooksDialog = ({ open, onOpenChange, books, studentName }) => {
  const [isMounted, setIsMounted] = useState(open);

  useEffect(() => {
    if (open) setIsMounted(true);
    else {
      setTimeout(() => setIsMounted(false), 200); // animation duration
    }
  }, [open]);

  if (!isMounted) return null;
  

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200`}>
      {/* Modal Box */}
      <div
        className={`w-full max-w-7xl bg-white rounded-2xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto transition-all duration-200 ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold tracking-wide mb-4">
          List of Books assigned to {studentName}
        </h2>

        {/* Table */}
        <BooksTable books={books} />
      </div>
    </div>
  );
};

