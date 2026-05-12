"use client";

import { useState } from "react";

import {
  useMutation,
} from "@tanstack/react-query";

import {
  MdSearch,
  MdAnalytics,
  MdDateRange,
  MdMenuBook,
  MdPerson,
  MdClass,
  MdBadge,
} from "react-icons/md";

import { toast } from "sonner";

import { subMonths } from "date-fns";

 
import { getFormattedDate } from "../../../utils/functions";
 
import DatePicker from "./DatePicker";
import { getAnalyticsByStudentId } from "@/api/studentBooksApi";

function Analytics() {
  const [studentId, setStudentId] =
    useState("");

  const [date, setDate] = useState({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });

  const updateDate = (date) => {
    setDate(date);
  };

  const {
    data,
    isPending,
    mutate,
  } = useMutation({
    mutationKey: ["analyticsData"],

    mutationFn: getAnalyticsByStudentId,

    onError: (error) =>
      toast(`❌ ${error.message}`),
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!studentId.startsWith("STU")) {
      toast(
        `❌ Please enter a valid student id.`
      );

      return;
    }

    if (
      studentId &&
      date.from &&
      date.to
    ) {
      mutate({
        studentId:
          studentId.split("STU")[1],

        date,
      });
    } else {
      toast(
        `❌ Please enter student id and date.`
      );
    }
  };

  const {
    first_name,
    middle_name,
    last_name,
    class: className,
    id,
  } = data?.student || {};

  return (
    <div className="p-3 sm:p-5">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        
        <div className="grid lg:grid-cols-[340px_1fr] min-h-[750px]">
          
          {/* LEFT SIDE */}
          <div className="bg-gradient-to-b from-emerald-50 to-white border-b lg:border-b-0 lg:border-r border-gray-100 p-5 sm:p-7">
            
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-8">
              
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center">
                <MdAnalytics className="text-white text-2xl" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Analytics
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Student issued books data
                </p>
              </div>
            </div>

            {/* STUDENT INFO */}
            <div className="space-y-4">
              
              <div className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <MdPerson className="text-2xl text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Student
                    </p>

                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      {data?.student
                        ? `${first_name} ${
                            middle_name || ""
                          } ${last_name}`
                        : "No Student"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <MdClass className="text-2xl text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Class
                    </p>

                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      {className || "--"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <MdBadge className="text-2xl text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Student ID
                    </p>

                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      {id ? `STU${id}` : "--"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-600 rounded-3xl p-5 text-white mt-8">
                <h3 className="text-lg font-semibold">
                  Smart Analytics
                </h3>

                <p className="text-sm text-emerald-100 mt-2 leading-relaxed">
                  Track student book issue
                  history with date-based
                  filtering and organized
                  records.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-5 sm:p-7 flex flex-col">
            
            {/* TITLE */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Student Analytics
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Search issued books by
                student ID and date range
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              
              {/* SEARCH */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Student ID
                </label>

                <div className="relative">
                  
                  <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                  <input
                    type="text"
                    placeholder="Enter student id (STU101)"
                    className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm outline-none transition-all focus:border-emerald-400 focus:bg-white"
                    onChange={(event) =>
                      setStudentId(
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>

              {/* DATE */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Select Date Range
                </label>

                <div className="relative">
                  
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <MdDateRange className="text-xl text-gray-400" />
                  </div>

                  <DatePicker
                    date={date}
                    updateDate={updateDate}
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium tracking-wide transition-all"
              >
                {isPending
                  ? "Loading Analytics..."
                  : "Get Analytics"}
              </button>
            </form>

            {/* LOADING */}
            {isPending && (
              <div className="mt-6 border border-emerald-100 bg-emerald-50 rounded-2xl p-4">
                <p className="text-sm text-emerald-700 font-medium">
                  Fetching analytics data...
                </p>
              </div>
            )}

            {/* TABLE */}
            {data?.books?.length > 0 && (
              <div className="mt-8 overflow-hidden border border-gray-200 rounded-3xl">
                
                {/* TABLE HEADER */}
                <div className="overflow-x-auto">
                  
                  <table className="w-full min-w-[750px]">
                    
                    <thead className="bg-emerald-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-5 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                          Book
                        </th>

                        <th className="text-left px-5 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                          Issued Date
                        </th>

                        <th className="text-left px-5 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                          Author
                        </th>

                        <th className="text-left px-5 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                          Publisher
                        </th>

                        <th className="text-left px-5 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                          ISBN
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.books.map(
                        (book, index) => (
                          <tr
                            key={book.id}
                            className={`border-b border-gray-100 hover:bg-gray-50 transition-all ${
                              index % 2 === 0
                                ? "bg-white"
                                : "bg-gray-50/40"
                            }`}
                          >
                            
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                  <MdMenuBook className="text-xl text-emerald-600" />
                                </div>

                                <div>
                                  <p className="text-sm font-semibold text-gray-800">
                                    {book.name}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-5 py-4 text-sm text-gray-600">
                              {getFormattedDate(
                                book
                                  .student_books?.[0]
                                  ?.created_at
                              )}
                            </td>

                            <td className="px-5 py-4 text-sm text-gray-600">
                              {book.author}
                            </td>

                            <td className="px-5 py-4 text-sm text-gray-600">
                              {book.publisher}
                            </td>

                            <td className="px-5 py-4 text-sm font-medium text-gray-700">
                              {book.isbn}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;