// "use client";

// import { useMutation } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { useState } from "react";
// import { getBooksByStudentId } from "@/api/booksApi";
// import { StudentTable } from "./StudentTable";
// import Link from "next/link";
// import { BooksDialog } from "./BooksDialog";

// const StudentDialog = ({ open, onOpenChange, student }) => {
//     const [isBookOpen, setIsBookOpen] = useState(false);
//     const toggleOpen = () => setIsBookOpen(!isBookOpen);

//     const {
//         data: books,
//         isPending,
//         mutate,
//     } = useMutation({
//         mutationKey: ["booksByStudent"],
//         mutationFn: getBooksByStudentId,
//         onError: (error) => toast(`❌ ${error.message}`),
//     });

//     // ❌ agar open false hai to render hi mat karo
//     if (!open) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 w-full">

//             {/* Modal Box */}
//             <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl p-6 relative">

//                 {/* Close Button */}
//                 <button
//                     onClick={() => onOpenChange(false)}
//                     className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl cursor-pointer"
//                 >
//                     ✕
//                 </button>

//                 {/* Title */}
//                 <h2 className="text-center text-2xl font-semibold tracking-wide mb-4">
//                     Student Information
//                 </h2>

//                 {/* Student Table */}
//                 <StudentTable student={student} />


//                 <button
//                     type="button"
//                     className="block w-full text-center text-lg text-blue-600 mt-4 underline cursor-pointer"
//                     onClick={() => {
//                         mutate(student?.id, {
//                             onSuccess: toggleOpen,
//                         });
//                     }}
//                 >
//                     List of books assigned to {student?.first_name}
//                 </button>

//                 {/* Loading */}
//                 {isPending && (
//                     <p className="text-center text-xl mt-3">Loading...</p>
//                 )}

//                 {/* Books Dialog */}
//                 <BooksDialog
//                     open={isBookOpen}
//                     onOpenChange={toggleOpen}
//                     studentName={student?.first_name}
//                     books={books}
//                 />
//             </div>
//         </div>
//     );
// };

// export default StudentDialog;








"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { getBooksByStudentId } from "@/api/booksApi";
import { StudentTable } from "./StudentTable";
import { BooksDialog } from "./BooksDialog";

const StudentDialog = ({ open, onOpenChange, student }) => {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const toggleOpen = () => setIsBookOpen(!isBookOpen);

  const [isMounted, setIsMounted] = useState(open);

  useEffect(() => {
    if (open) setIsMounted(true);
    else {
      setTimeout(() => setIsMounted(false), 200); // animation duration
    }
  }, [open]);

  const {
    data: books,
    isPending,
    mutate,
  } = useMutation({
    mutationKey: ["booksByStudent"],
    mutationFn: getBooksByStudentId,
    onError: (error) => toast(`❌ ${error.message}`),
  });

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${
        open ? "bg-black/60 backdrop-blur-sm" : "bg-black/0"
      }`}
    >
      {/* Modal Box */}
      <div
        className={`w-full max-w-7xl bg-white rounded-2xl shadow-xl p-6 relative transition-all duration-200 ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl cursor-pointer"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold tracking-wide mb-4">
          Student Information
        </h2>

        {/* Student Table */}
 
        {!student ? (
  <p className="text-center">Loading...</p>
) : (
  <StudentTable student={student} />
)}

        {/* Button */}
        <button
          type="button"
          className="block w-full text-center text-lg text-blue-600 mt-4 underline cursor-pointer"
          onClick={() => {
            mutate(student?.id, {
              onSuccess: toggleOpen,
            });
          }}
        >
          List of books assigned to {student?.first_name}
        </button>

        {/* Loading */}
        {isPending && (
          <p className="text-center text-xl mt-3">Loading...</p>
        )}

        {/* Books Dialog */}
        <BooksDialog
          open={isBookOpen}
          onOpenChange={toggleOpen}
          studentName={student?.first_name}
          books={books}
        />
      </div>
    </div>
  );
};

export default StudentDialog;