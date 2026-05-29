
"use client";

import { useState } from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  MdAssignmentReturn,
  MdMenuBook,
  MdCheckCircle,
  MdArrowForward,
} from "react-icons/md";

import { toast } from "sonner";

import { getAssignedBooks } from "@/api/booksApi";

import { returnBook } from "@/api/studentBooksApi";

import Dropdown from "./DropDown";

// ─────────────────────────────



interface Selection {
  book?: string;
}


function ReturnBook() {
  const queryClient = useQueryClient();

  const [selection, setSelection] = useState<Selection>({})
  /* BOOKS QUERY */

  const {
    data: books,
    isPending,
    error,
  } = useQuery({
    queryKey: ["assignedBooks"],

    queryFn: getAssignedBooks,
  });

  /* DROPDOWN DATA */

  const dropdownBooks = books?.map((book) => ({ id: book.id, value: book.name })) || [];



  const selectedBookData = books?.find((book) => String(book.id) === String(selection.book));
  /* RETURN MUTATION */

  const { isPending: isReturning, mutate } = useMutation({
    mutationKey: ["returnBook"],

    mutationFn: returnBook,

    onSuccess: () => {
      setSelection({});

      toast( "✅ Book is successfully returned." );

      queryClient.invalidateQueries({
        queryKey: ["assignedBooks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["unassignedBooks"],
      });
    },

    onError: (error: Error) =>
      toast(`❌ ${error.message}`),
  });

  /* UPDATE SELECTION */

  const updateSelection = (selectedValue: Selection) => {
    setSelection((prev) => ({
      ...prev,
      ...selectedValue,
    }));
  };

  /* HANDLE RETURN */

  const handleReturnBook = () => {
    if (!selection.book) return;

    mutate({
      book_id: selection.book,
    });
  };

  return (
    <div className="p-3 sm:p-5">
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">

        <div className="grid lg:grid-cols-[320px_1fr] min-h-[600px]">

          {/* LEFT SIDE */}
          <div className="bg-gradient-to-b from-emerald-50 to-white border-b lg:border-b-0 lg:border-r border-gray-100 p-5 sm:p-7">

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center">
                <MdAssignmentReturn className="text-white text-2xl" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Return Book
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Return assigned books
                </p>
              </div>
            </div>

            {/* STATUS CARD */}
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
                      : "No Book Selected"}
                  </p>
                </div>
              </div>
            </div>

            {/* INFO BOX */}
            <div className="bg-emerald-600 rounded-3xl p-5 text-white mt-8">

              <div className="flex items-center gap-2 mb-3">
                <MdCheckCircle className="text-2xl" />

                <h3 className="text-lg font-semibold">
                  Return Management
                </h3>
              </div>

              <p className="text-sm text-emerald-100 leading-relaxed">
                Manage returned books quickly
                and keep your library inventory
                updated in real-time.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-5 sm:p-7 flex flex-col">

            {/* TITLE */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Return Assigned Book
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Select a book that you want to
                return from a student
              </p>
            </div>

            {/* LOADING */}
            {isPending && (
              <div className="border border-emerald-100 bg-emerald-50 rounded-2xl p-4 mb-5">
                <p className="text-sm text-emerald-700 font-medium">
                  Loading books...
                </p>
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="border border-red-100 bg-red-50 rounded-2xl p-4 mb-5">
                <p className="text-sm text-red-600 font-medium">
                  {error.message}
                </p>
              </div>
            )}

            {/* FORM AREA */}
            <div className="flex-1 space-y-6">

              {/* DROPDOWN */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Select Book
                </label>

                <Dropdown
                  data={dropdownBooks}
                  title="book"
                  updateSelection={updateSelection}
                  value={selection.book}
                />

                {/* DETAILS UI YOU WILL ADD HERE */}
                {selectedBookData && (
                  <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 space-y-4">

                    {/* BOOK DETAILS */}
                    <div>
                      <h3 className="text-sm font-semibold text-emerald-700 mb-3">
                        Book Details
                      </h3>

                      <div className="space-y-2 text-sm text-gray-700">
                        <p>
                          <span className="font-semibold">
                            Book Name:
                          </span>{" "}
                          {selectedBookData.name}
                        </p>

                        <p>
                          <span className="font-semibold">
                            Book Author:
                          </span>{" "}
                          {selectedBookData.author}
                        </p>

                        <p>
                          <span className="font-semibold">
                            Book ISBN:
                          </span>{" "}
                          {selectedBookData.isbn}
                        </p>
                      </div>
                    </div>

                    {/* ASSIGNED STUDENT */}
                    <div className="border-t border-emerald-100 pt-4">
                      <p className="text-sm font-semibold text-emerald-700 mb-3">
                        This book is assigned to:
                      </p>

                      <div className="space-y-2 text-sm text-gray-700">

                        <p>
                          <span className="font-semibold">
                            Student Name:
                          </span>{" "}
                          {selectedBookData.student.first_name}{" "}
                          {selectedBookData.student.middle_name}{" "}
                          {selectedBookData.student.last_name}
                        </p>

                        <p>
                          <span className="font-semibold">
                            Student Class:
                          </span>{" "}
                          {selectedBookData.student.class}
                        </p>

                        <p>
                          <span className="font-semibold">
                            Student ID:
                          </span>{" "}
                          STU{selectedBookData.student.id}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* BUTTON */}
            <button
              disabled={
                !selection.book ||
                isReturning
              }
              onClick={handleReturnBook}
              className="mt-8 w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <span>
                {isReturning
                  ? "Returning..."
                  : "Return Book"}
              </span>

              {!isReturning && (
                <MdArrowForward className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReturnBook;