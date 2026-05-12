"use client";

import { useEffect, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  MdLibraryBooks,
  MdMenuBook,
  MdPerson,
  MdArrowForward,
} from "react-icons/md";

import { toast } from "sonner";

import { getUnassignedBooks } from "../../../api/booksApi";
import { getStudents } from "../../../api/studentsApi";
import { issueBook } from "../../../api/studentBooksApi";
import Dropdown from "@/components/other/DropDown";

interface DropdownItem {
  id: string;
  value: string;

}

interface Selection {
  book?: string;
  student?: string;
}

// type Book = {
//   id: string;
//   name: string;
// };

// type Student = {
//   id: string;
//   first_name: string;
//   middle_name?: string;
//   last_name: string;
// };


type Book = {
  id: string;
  name: string;
  author: string;
  isbn: string;
};

type Student = {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  class: string;
};



function IssueBook() {
  const queryClient = useQueryClient();

  const [selection, setSelection] =
    useState<Selection>({});

  /* BOOKS QUERY */

  const {
    data: books,
    isPending,
    error,
  } = useQuery<
    Book[],
    Error,
    DropdownItem[]
  >({
    queryKey: ["unassignedBooks"],

    queryFn: getUnassignedBooks,


    // select: (data) =>
    //   data.map((book) => ({
    //     id: book.id,
    //     value: book.name,
    //     author: book.author,
    //     isbn: book.isbn,
    //   })),

    select: (data) =>
      data.map((book) => ({
        id: book.id,
        value: book.name,
        label: book.name,
        author: book.author,
        isbn: book.isbn,
      })),


  });

  /* STUDENTS QUERY */

  const {
    data: students,
    isPending: isStudentsPending,
    error: studentError,
  } = useQuery<
    Student[],
    Error,
    DropdownItem[]
  >({
    queryKey: ["students"],

    queryFn: getStudents,



    // select: (data) =>
    //   data.map(
    //     ({
    //       id,
    //       first_name,
    //       middle_name,
    //       last_name,
    //       class: studentClass,
    //     }) => ({
    //       id,

    //       value: `${first_name} ${middle_name || ""
    //         } ${last_name}`,

    //       class: studentClass,
    //     })
    //   ),

    select: (data) =>
  data.map(
    ({
      id,
      first_name,
      middle_name,
      last_name,
      class: studentClass,
    }) => ({
      id,

      value: `${first_name} ${
        middle_name || ""
      } ${last_name}`,

      label: `${first_name} ${
        middle_name || ""
      } ${last_name}`,

      class: studentClass,
    })
  ),


  });


  console.log(students, "ss");


  /* UPDATE SELECTION */

  const updateSelection = (
    selectedValue: Selection
  ) => {
    setSelection((prev) => ({
      ...prev,
      ...selectedValue,
    }));
  };


  useEffect(() => {
    console.log(selection);

  }, [selection])
  /* MUTATION */

  const {
    isPending: issuePending,
    mutate,
  } = useMutation({
    mutationKey: ["issueBook"],

    mutationFn: issueBook,

    onSuccess: () => {
      setSelection({});

      toast(
        "✅ Book is successfully issued."
      );

      queryClient.invalidateQueries({
        queryKey: ["unassignedBooks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["assignedBooks"],
      });
    },

    onError: (error: Error) =>
      toast(`❌ ${error.message}`),
  });

  const handleIssueBook = () => {
    if (
      !selection.book ||
      !selection.student
    )
      return;

    mutate({
      student_id: selection.student,
      book_id: selection.book,
    });
  };

  const selectedBook = books?.find(
    (book) => String(book.id) === String(selection.book)
  );

  const selectedStudent = students?.find(
    (student) =>
      String(student.id) === String(selection.student)
  );
  return (
    <div className="p-3 sm:p-5">
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="grid lg:grid-cols-[320px_1fr] min-h-[650px]">

          {/* LEFT SIDE */}
          <div className="bg-gradient-to-b from-emerald-50 to-white border-b lg:border-b-0 lg:border-r border-gray-100 p-5 sm:p-7">

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center">
                <MdLibraryBooks className="text-white text-2xl" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Issue Book
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Assign books to students
                </p>
              </div>
            </div>

            {/* INFO CARDS */}
            <div className="space-y-4">

              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <MdMenuBook className="text-2xl text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Selected Book
                    </p>

                    <p className="text-sm font-semibold text-gray-700 mt-1 truncate">
                      {selection.book
                        ? "Book Selected"
                        : "No Book"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <MdPerson className="text-2xl text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Selected Student
                    </p>

                    <p className="text-sm font-semibold text-gray-700 mt-1 truncate">
                      {selection.student
                        ? "Student Selected"
                        : "No Student"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-600 rounded-3xl p-5 text-white mt-8">
                <h3 className="text-lg font-semibold">
                  Library Management
                </h3>

                <p className="text-sm text-emerald-100 mt-2 leading-relaxed">
                  Easily manage and assign
                  books to students with a
                  clean and organized workflow.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-5 sm:p-7 flex flex-col">

            {/* TITLE */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Assign Book
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Select a book and assign it
                to a student
              </p>
            </div>

            {/* LOADING */}
            {(isPending ||
              isStudentsPending) && (
                <div className="border border-emerald-100 bg-emerald-50 rounded-2xl p-4 mb-5">
                  <p className="text-sm text-emerald-700 font-medium">
                    Loading data...
                  </p>
                </div>
              )}

            {/* ERRORS */}
            {error && (
              <div className="border border-red-100 bg-red-50 rounded-2xl p-4 mb-5">
                <p className="text-sm text-red-600 font-medium">
                  {error.message}
                </p>
              </div>
            )}

            {studentError && (
              <div className="border border-red-100 bg-red-50 rounded-2xl p-4 mb-5">
                <p className="text-sm text-red-600 font-medium">
                  {studentError.message}
                </p>
              </div>
            )}

            {/* FORM */}
            <div className="space-y-6 flex-1">

              {/* BOOK DROPDOWN */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Select Book
                </label>

                <Dropdown
                  data={books}
                  title="book"
                  updateSelection={
                    updateSelection
                  }
                  value={selection.book}
                />
              </div>

              {selectedBook && (
                <div className="mt-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 space-y-2">

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-wider text-gray-400">
                      Book Name
                    </span>

                    <span className="text-sm font-semibold text-gray-700 text-right">
                      {selectedBook.value}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-wider text-gray-400">
                      Author
                    </span>

                    <span className="text-sm font-semibold text-gray-700 text-right">
                      {selectedBook.author}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-wider text-gray-400">
                      ISBN
                    </span>

                    <span className="text-sm font-semibold text-gray-700 text-right">
                      {selectedBook.isbn}
                    </span>
                  </div>
                </div>
              )}

              {/* STUDENT DROPDOWN */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Select Student
                </label>

                <Dropdown
                  data={students}
                  title="student"
                  updateSelection={
                    updateSelection
                  }
                  value={selection.student}
                />
              </div>

              {selectedStudent && (
                <div className="mt-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 space-y-2">

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-wider text-gray-400">
                      Student Name
                    </span>

                    <span className="text-sm font-semibold text-gray-700 text-right">
                      {selectedStudent.value}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-wider text-gray-400">
                      Class
                    </span>

                    <span className="text-sm font-semibold text-gray-700 text-right">
                      {selectedStudent.class}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-wider text-gray-400">
                      Student ID
                    </span>

                    <span className="text-sm font-semibold text-gray-700 text-right">
                      STU{selectedStudent.id}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* BUTTON */}
            <button
              disabled={
                !selection.book ||
                !selection.student ||
                issuePending
              }
              onClick={handleIssueBook}
              className="mt-8 w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <span>
                {issuePending
                  ? "Issuing..."
                  : "Issue Book"}
              </span>

              {!issuePending && (
                <MdArrowForward className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueBook;