"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  format,
  parseISO,
  subYears,
} from "date-fns";

import {
  MdBarChart,
  MdSearch,
  MdMenuBook,
  MdTrendingUp,
  MdAnalytics,
} from "react-icons/md";

import { getAnalyticsByStudentId } from "../../../api/studentBooksApi";
import { BooksDialog } from "@/components/other/BooksDialog";
import { MONTHS } from "@/utils/constants";
import InlineLoader from "@/components/other/InlineLoader";



// ── Types ──────────────────────────────────────────────────────────────────
interface Book {
  id: string;
  name: string;
  author: string;
  publisher: string;
  isbn: string;
  student_books: { created_at: string }[];
}




interface ChartEntry {
  month: string;
  issued: number;
  books: Book[];

  // student?: Student;
}

// interface BarClickPayload {
//   payload: ChartEntry;
// }


interface BarClickPayload {
  payload?: ChartEntry;
}




const Chart = () => {
  const [open, setOpen] = useState(false);

  const onOpenChange = () => setOpen((prev) => !prev);

  const [studentId, setStudentId] = useState("");

  const [books, setBooks] = useState<Book[]>([]);

  const [chartData, setChartData] = useState<ChartEntry[]>([]);

  const { data, isPending, mutate } = useMutation({
    mutationKey: ["analyticsData"],

    mutationFn: getAnalyticsByStudentId,

    onError: (error) =>
      toast(`❌ ${error.message}`),

    onSuccess: (data) => {
       
      // let result = {};
      let result: Record<string, ChartEntry> = {};
      console.log(data);
      

      data?.books?.forEach((book) => {
        console.log(book);

        let month = format(parseISO(book.student_books[0].created_at), "MMM");
        console.log(format(book.student_books[0].created_at, "MMM"));
        console.log(format(parseISO(book.student_books[0].created_at), "MMM"));
        // if (!result[month]) {
        if (result[month] === undefined) {
          result[month] = {
            month,
            issued: 0,
            books: [],
            // student: data.student,
          };
        }

        result[month].issued += 1;

        result[month].books.push(book);
      });

      console.log("result", result);


      setChartData(
        MONTHS.map((month) => {
          return {
            month,

            issued: result[month]?.issued || 0,

            books: result[month]?.books || [],
          };
        })
      );
    },
  });

  useEffect(() => {
    console.log(chartData, "cc");
  }, [chartData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!studentId.startsWith("STU")) {
      toast("❌ Please enter valid student id."); return;
    }

    const date = new Date();

    const previourYearDate = subYears(date, 1);

    mutate({
      studentId: studentId.split("STU")[1],

      date: {
        from: previourYearDate,
        to: date,
      },
    });
  };

  const handleClick = (data: BarClickPayload) => {
    if (!data.payload) return;
    setBooks(data.payload.books);
    onOpenChange();
  };


  // Ab — Recharts ka actual type use karo
  // const handleClick = (data: { payload?: ChartEntry }) => {
  //   if (!data.payload) return;
  //   setBooks(data.payload.books);
  //   onOpenChange();
  // };
  return (
    <div className="p-3 sm:p-5">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">

        {/* <div className="grid lg:grid-cols-[340px_1fr] min-h-[750px]"> */}
        <div className="grid xl:grid-cols-[340px_1fr] min-h-[750px]">

          {/* LEFT SIDE */}
          <div className="bg-gradient-to-b from-emerald-50 to-white border-b lg:border-b-0 lg:border-r border-gray-100 p-5 sm:p-7">

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-8">

              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center">
                <MdBarChart className="text-white text-2xl" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Chart Analytics
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Visual monthly issued  books report
                </p>
              </div>
            </div>

            {/* STATS */}
            <div className="space-y-4">

              <div className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <MdMenuBook className="text-2xl text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Total Books
                    </p>

                    <p className="text-lg font-semibold text-gray-800 mt-1">
                      {data?.books?.length || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <MdTrendingUp className="text-2xl text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Active Months
                    </p>

                    <p className="text-lg font-semibold text-gray-800 mt-1">
                      {chartData.filter((item) => item.issued > 0).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <MdAnalytics className="text-2xl text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Student
                    </p>

                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      {data?.student?.first_name || "No Data"}
                    </p>
                  </div>
                </div>
              </div>

              {/* INFO CARD */}
              <div className="bg-emerald-600 rounded-3xl p-5 text-white mt-8">
                <h3 className="text-lg font-semibold">
                  Interactive Report
                </h3>

                <p className="text-sm text-emerald-100 mt-2 leading-relaxed">
                  Click any chart bar to view detailed books issued during that month.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-5 sm:p-7">

            {/* TITLE */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Books Analytics Using Chart
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Analyze monthly issued books visually
              </p>
            </div>

            {/* FORM */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* handleSubmit */}

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Student ID
                </label>

                <div className="relative">

                  <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                  <input type="text" placeholder="Enter student id (STU101)"
                    className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm outline-none transition-all focus:border-emerald-400 focus:bg-white"
                    onChange={(event) => setStudentId(event.target.value)} />
                </div>
              </div>

              <button type="submit"
                className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium
                 tracking-wide transition-all">
                {isPending ? "Loading Analytics..." : "Get Analytics"}
              </button>
            </form>

            {/* LOADING */}
            {/* {isPending && (
              <div className="mt-6 border border-emerald-100 bg-emerald-50 rounded-2xl p-4">
                <p className="text-sm text-emerald-700 font-medium">
                  Preparing chart data...
                </p>
              </div>
            )} */}

            {isPending && <InlineLoader text="Preparing chart data..." />}

            {/* CHART */}
            {/* {data?.books?.length > 0 && ( */}
            {data?.books && data.books.length > 0 && (
              <div className="mt-8 border border-gray-200 rounded-3xl p-3 sm:p-5 bg-white">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Monthly Book Issue Report
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">
                      Click any bar to  view books
                    </p>
                  </div>

                  <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium">
                    Last 12 Months
                  </div>
                </div>

                <div className="w-full h-[420px]">

                  <ResponsiveContainer width="100%" height="100%" >
                    <BarChart data={chartData} margin={{ top: 20, right: 10, left: -15, bottom: 5 }}>

                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} />

                      <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />

                      <Tooltip contentStyle={{
                        borderRadius: "16px", border: "1px solid #E5E7EB",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
                      }} />

                      <Bar dataKey="issued" radius={[10, 10, 0, 0,]} onClick={handleClick}>
                        {chartData.map(
                          (entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.issued > 0 ? "#059669" : "#D1D5DB"} className="cursor-pointer" />)
                        )}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* LEGEND */}
                <div className="flex flex-wrap items-center gap-5 mt-5 border-t border-gray-100 pt-5">

                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-emerald-600"></div>

                    <span className="text-sm text-gray-600">
                      Issued Books
                    </span>
                  </div>

                  <div className="text-sm text-gray-400">
                    Click bars for
                    details
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DIALOG */}
      <BooksDialog open={open} onOpenChange={onOpenChange}
        books={books} studentName={data?.student?.first_name} />
    </div>
  );
};

export default Chart;












