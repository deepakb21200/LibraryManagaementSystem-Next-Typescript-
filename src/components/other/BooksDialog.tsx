"use client";

import { BooksTable } from "./BooksTable";
import { useEffect, useState } from "react";

interface Book {
  id: string;
  name: string;
  author: string;
  publisher: string;
  isbn: string;
  student_books: { created_at: string }[];
}

interface BooksDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  books: Book[];
  studentName?: string;
}

export const BooksDialog = ({ open, onOpenChange, books, studentName }: BooksDialogProps) => {
  const [isMounted, setIsMounted] = useState(open);


  useEffect(() => {
    if (open) setIsMounted(true);
    else {
      setTimeout(() => setIsMounted(false), 200);
    }
  }, [open])



  if (!isMounted) return null
  return (
    <div onClick={() => onOpenChange(false)}
      className={`fixed inset-0 book_dailog z-50 rounded-2xl flex items-center justify-center transition-all duration-200 
    ${open ? "bg-black/40  backdrop-blur-sm" : "bg-black/0"}`}>

      <div onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-7xl  bg-white rounded-2xl shadow-xl p-6 relative  transition-all   
          duration-200 ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`} >


        <div className="flex items-center  mb-5  ">
          <div className="flex flex-1  justify-center  md:flex-row flex-col items-center">
            <h2>Issued Books Assigned to {studentName}</h2>
          </div>

          <button onClick={() => onOpenChange(false)} className="w-8 h-8 flex items-center justify-center rounded-xl 
          border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all text-base cursor-pointer">
            ✕
          </button>
        </div>


        <BooksTable books={books} />
      </div>

    </div>
  );
};







