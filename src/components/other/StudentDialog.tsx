"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { getBooksByStudentId } from "@/api/booksApi";
import { StudentTable } from "./StudentTable";
import { BooksDialog } from "./BooksDialog";
 
// ── Types ──────────────────────────────────────────────────────────────────
interface Student {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  class: string;
  address: string;
  city: string;
  phone: string;
  state: string;
  pincode: string | number;
}

interface StudentDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  student?: Student;
}
// ──────────────────────────────────────────────────────────────────────────

const StudentDialog = ({ open, onOpenChange, student }: StudentDialogProps) => {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const toggleOpen = () => setIsBookOpen((prev) => !prev);
  const [isMounted, setIsMounted] = useState(open);
 

  useEffect(() => {
    if (open) setIsMounted(true);
    else {
      setTimeout(() => setIsMounted(false), 200);
    }
  }, [open]);

  // close on outside click
 

  const { data: books, isPending, mutate } = useMutation({
    mutationKey: ["booksByStudent"],
    mutationFn: getBooksByStudentId,
    onError: (error: Error) => toast(`❌ ${error.message}`),
  });

  if (!isMounted) return null;

  return (
    <>
    <div  onClick={() => onOpenChange(false)}
      className={`fixed inset-0 z-50 flex rounded-2xl items-center justify-center p-4 transition-all duration-200   
       ${open ? "bg-black/40 backdrop-blur-sm" : "bg-black/0"}`}>
      {/* Modal Box  bg-white*/}
      <div onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-7xl  bg-white rounded-2xl shadow-xl p-6 relative transition-all duration-200 ${open
          ? "opacity-100 scale-100 translate-y-0": "opacity-0 scale-95 translate-y-4"} `}>
 
        <div className="flex items-center  mb-5  ">

          <div className="flex flex-1  justify-center  md:flex-row flex-col items-center">
  
            <h2 className="text-lg font-semibold text-gray-800">
              Student Information- {"  "}
            </h2>
            {student && (
              <p className="text-lg font-semibold text-gray-800  ">
                {student.first_name}{" "}
                {student.middle_name ? `${student.middle_name}` : "-"}
                {student.last_name}
              </p>
            )}
          </div>

          {/* Close Button */}
          <button  onClick={() => onOpenChange(false)}  className="w-8 h-8 flex items-center justify-center rounded-xl
           border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all
            text-base cursor-pointer">
            ✕
          </button>
        </div>

        {/* Student Table */}
        {!student ? (
          <p className="text-center text-gray-400 py-6">Loading...</p>
        ) : (
          <StudentTable student={student} />
        )}

        {/* Books Button */}
        <button
          type="button"
          onClick={() => {
            if (!student) return;
            mutate(student.id, { onSuccess: toggleOpen });
          }}
          className="mt-5 w-full cursor-pointer h-11 rounded-xl border border-emerald-200 text-emerald-700 text-sm font-medium hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
        >
          {isPending ? (
            <span className="text-gray-400">Loading books...</span>
          ) : (
            <>

              <span>View books assigned to {student?.first_name}</span>
              <span className="text-emerald-500">→</span>

            </>
          )}
        </button>

        {/* Books Dialog — unchanged as requested */}
        <BooksDialog
          open={isBookOpen}
          onOpenChange={toggleOpen}
          studentName={student?.first_name}
          books={books || []}
        />

        
      </div>

          {/* <BooksDialog
          open={isBookOpen}
          onOpenChange={toggleOpen}
          studentName={student?.first_name}
          books={books || []}
        /> */}

 
      
    </div>

     
    </>

  );
};

export default StudentDialog;











 