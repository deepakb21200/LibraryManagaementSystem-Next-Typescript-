// "use client";

// import { useEffect, useState } from "react";
// import { MdDelete, MdEdit, MdMenuBook, MdPerson, MdSearch } from "react-icons/md";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { getStudentByBookId } from "../../../api/studentsApi";
// import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
// import { deleteBook, getBooks, } from "../../../api/booksApi";
// import StudentDialog from "@/components/other/StudentDialog";
// import useUser from "@/components/custom-hooks/UseUser";

// function Dashboard() {
//   const [searchTerm, setSearchTerm] = useState("");

//   const [open, setOpen] = useState(false);

//   const toggleDialog = () => setOpen(!open);

//   const router = useRouter();

//   const queryClient = useQueryClient();

//   const { isPending: isAuthPending, isAuthenticated, } = useUser();

//   // ✅ FIXED
//   useEffect(() => {
//     if (!isAuthPending && !isAuthenticated) {
//       router.push("/login");
//     }
//   }, [isAuthPending, isAuthenticated, router]);

//   const { mutate } = useMutation({
//     mutationKey: ["deletebook"],

//     mutationFn: deleteBook,

//     onSuccess: () => {
//       toast("✅ Book is deleted successfully.");

//       queryClient.invalidateQueries({
//         queryKey: ["books"],
//       });
//     },

//     onError: (error: Error) => toast(`❌ ${error.message}`),
//   });

//   const { data: books, error } = useQuery({
//     queryKey: ["books"],
//     queryFn: getBooks
//   });

//   const { data: student, mutate: getStudentInfo } = useMutation({
//     mutationKey: ["studentByBookId"],

//     mutationFn: getStudentByBookId,

//     onSuccess: () => toggleDialog(),

//     onError: (error: Error) => toast(`❌ ${error.message}`),
//   });

//   if (isAuthPending) {
//     return (
//       <p className="text-center text-2xl font-medium tracking-wide text-gray-600 py-10">
//         Loading...
//       </p>
//     );
//   }

//   // ✅ important
//   if (!isAuthenticated) {
//     return null;
//   }

//   const filteredBooks = books?.filter((book) => {
//     const values = Object.values(book).join(" ").toLowerCase();

//     return values.includes(searchTerm.toLowerCase());
//   }
//   );

//   return (
//     <div className="p-3 sm:p-5">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
//         <div>
//           <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-800">
//             Books List
//           </h2>

//           <p className="text-sm text-gray-400 mt-1">
//             Manage all available books
//           </p>
//         </div>

//         <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl">
//           <p className="text-xs text-gray-500">
//             Total Books
//           </p>

//           <p className="text-xl font-semibold text-emerald-700">
//             {books?.length || 0}
//           </p>
//         </div>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl px-4 py-3 text-sm mb-4">
//           {error.message}
//         </div>
//       )}

//       {/* Main */}
//       <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm">
//         {/* Search */}
//         <div className="relative max-w-md mb-5">
//           <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

//           <input type="text" placeholder="Search by any field..."
//             className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition-all
//              focus:border-emerald-400 focus:bg-white"
//             onChange={(event) => setSearchTerm(event.target.value)} />
//         </div>

//         {/* Desktop Table */}
//         <div className="hidden xl:block overflow-x-auto rounded-xl border border-gray-200">
//           <table className="w-full border-collapse">
//             <thead className="bg-gray-50">
//               <tr>
//                 {["Book", "Author", "Publisher", "ISBN", "Assigned To", "Actions",].map((heading) => (
//                   <th key={heading} className="text-left text-xs font-semibold tracking-wide uppercase
//                    text-gray-500 px-5 py-4">
//                     {heading}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {filteredBooks?.map((book, index) => (
//                 <tr key={book.id}
//                   className={`border-t border-gray-100 hover:bg-gray-50 transition-all
//                       ${index % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
//                   {/* Book */}
//                   <td className="px-5 py-4">
//                     <div className="flex items-start gap-3">
//                       <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
//                         <MdMenuBook className="text-emerald-600 text-2xl" />
//                       </div>

//                       <div>
//                         <p className="text-sm font-medium text-gray-800">
//                           {book.name}
//                         </p>

//                         <p className="text-xs text-gray-400 mt-1">
//                           Library Collection
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   {/* Author */}
//                   <td className="px-5 py-4 text-sm text-gray-600">
//                     {book.author}
//                   </td>

//                   {/* Publisher */}
//                   <td className="px-5 py-4 text-sm text-gray-600">
//                     {book.publisher}
//                   </td>

//                   {/* ISBN */}
//                   <td className="px-5 py-4">
//                     <span className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
//                       {book.isbn}
//                     </span>
//                   </td>

//                   {/* Assigned */}
//                   <td className="px-5 py-4">
//                     <button className="text-sm text-emerald-700 hover:text-emerald-800 font-medium
//                        underline underline-offset-2"
//                       onClick={() => getStudentInfo(book.id)}>View Student</button>
//                   </td>

//                   {/* Actions */}
//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-3">
//                       <button onClick={() => router.push(`/books/${book.id}`)}
//                         className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center
//                            text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-100 transition-all">
//                         <MdEdit className="text-lg" />
//                       </button>

//                       <button onClick={() => {
//                         const shouldDelete = window.confirm("Are you sure you want to delete the selected book?")

//                         if (shouldDelete) {
//                           mutate({
//                             id: book.id,
//                             image: book.image,
//                           });
//                         }
//                       }}
//                         className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-100 transition-all"
//                       >
//                         <MdDelete className="text-lg" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden">
//           {filteredBooks?.map((book) => (
//             <div key={book.id}
//               className="border border-gray-200 rounded-2xl p-4 bg-white hover:border-emerald-200 transition-all">
//               {/* Top */}
//               <div className="flex items-start gap-3">
//                 <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
//                   <MdMenuBook className="text-emerald-600 text-2xl" />
//                 </div>

//                 <div className="flex-1">
//                   <h3 className="text-sm font-semibold text-gray-800">
//                     {book.name}
//                   </h3>

//                   <p className="text-xs text-gray-400 mt-1">
//                     ISBN : {book.isbn}
//                   </p>
//                 </div>
//               </div>

//               {/* Details */}
//               <div className="mt-5 space-y-3">
//                 <div>
//                   <p className="text-[11px] uppercase tracking-wider text-gray-400">
//                     Author
//                   </p>

//                   <p className="text-sm text-gray-600 mt-1">
//                     {book.author}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-[11px] uppercase tracking-wider text-gray-400">
//                     Publisher
//                   </p>

//                   <p className="text-sm text-gray-600 mt-1">
//                     {book.publisher}
//                   </p>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
//                 <button
//                   onClick={() => getStudentInfo(book.id)}
//                   className="flex items-center gap-1.5 text-sm text-emerald-700 font-medium"
//                 >
//                   <MdPerson className="text-lg" />
//                   Student
//                 </button>

//                 <div className="flex items-center gap-2">
//                   <button onClick={() => router.push(`/books/${book.id}`)}
//                     className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500
//                      hover:bg-emerald-50 hover:text-emerald-700 transition-all">
//                     <MdEdit className="text-lg" />
//                   </button>

//                   <button onClick={() => {
//                     const shouldDelete = window.confirm("Are you sure you want to delete the selected book?");

//                     if (shouldDelete) {
//                       mutate({
//                         id: book.id,
//                         image: book.image,
//                       });
//                     }
//                   }}
//                     className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-red-500
//                      hover:bg-red-50 transition-all">
//                     <MdDelete className="text-lg" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty */}
//         {filteredBooks?.length === 0 && (
//           <div className="py-16 flex flex-col items-center justify-center text-center">
//             <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
//               <MdSearch className="text-3xl text-gray-400" />
//             </div>

//             <h3 className="text-lg font-semibold text-gray-700">
//               No books found
//             </h3>

//             <p className="text-sm text-gray-400 mt-1">
//               Try searching with another
//               keyword
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Dialog */}
//       <StudentDialog
//         open={open}
//         onOpenChange={toggleDialog}
//         student={student}
//       />
//     </div>
//   );
// }

// export default Dashboard;




























"use client";

import { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdMenuBook, MdPerson, MdSearch } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getStudentByBookId } from "../../../api/studentsApi";
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import { deleteBook, getBooks, } from "../../../api/booksApi";
import StudentDialog from "@/components/other/StudentDialog";
import useUser from "@/components/custom-hooks/UseUser";
import CommonTable from "./DataTable";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);

  const toggleDialog = () => setOpen(!open);

  const router = useRouter();

  const queryClient = useQueryClient();

  const { isPending: isAuthPending, isAuthenticated, } = useUser();

  // ✅ FIXED
  useEffect(() => {
    if (!isAuthPending && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthPending, isAuthenticated, router]);

  const { mutate } = useMutation({
    mutationKey: ["deletebook"],

    mutationFn: deleteBook,

    onSuccess: () => {
      toast("✅ Book is deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },

    onError: (error: Error) => toast(`❌ ${error.message}`),
  });

  const { data: books, error } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks
  });

  const { data: student, mutate: getStudentInfo } = useMutation({
    mutationKey: ["studentByBookId"],

    mutationFn: getStudentByBookId,

    onSuccess: () => toggleDialog(),

    onError: (error: Error) => toast(`❌ ${error.message}`),
  });

  if (isAuthPending) {
    return (
      <p className="text-center text-2xl font-medium tracking-wide text-gray-600 py-10">
        Loading...
      </p>
    );
  }

  // ✅ important
  if (!isAuthenticated) {
    return null;
  }

  const filteredBooks = books?.filter((book) => {
    const values = Object.values(book).join(" ").toLowerCase();

    return values.includes(searchTerm.toLowerCase());
  }
  );

  return (
    <div className="p-3 sm:p-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-800">
            Books List
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Manage all available books
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl">
          <p className="text-xs text-gray-500">
            Total Books
          </p>

          <p className="text-xl font-semibold text-emerald-700">
            {books?.length || 0}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl px-4 py-3 text-sm mb-4">
          {error.message}
        </div>
      )}

      {/* Main */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm">
        {/* Search */}
        <div className="relative max-w-md mb-5">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

          <input type="text" placeholder="Search by any field..."
            className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition-all
             focus:border-emerald-400 focus:bg-white"
            onChange={(event) => setSearchTerm(event.target.value)} />
        </div>

        <CommonTable
          data={filteredBooks || []}
          type="books"
          onView={(book) => getStudentInfo(book.id)}
          onEdit={(book) =>router.push(`/books/${book.id}`) }
          onDelete={(book) => {
            const shouldDelete = window.confirm(
              "Are you sure you want to delete the selected book?"
            );

            if (shouldDelete) {
              mutate({
                id: book.id,
                image: book.image,
              });
            }
          }}
        />

        {/* Mobile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden">
          {filteredBooks?.map((book) => (
            <div key={book.id}
              className="border border-gray-200 rounded-2xl p-4 bg-white hover:border-emerald-200 transition-all">
              {/* Top */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <MdMenuBook className="text-emerald-600 text-2xl" />
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {book.name}
                  </h3>

                  <p className="text-xs text-gray-400 mt-1">
                    ISBN : {book.isbn}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="mt-5 space-y-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400">
                    Author
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {book.author}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400">
                    Publisher
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {book.publisher}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => getStudentInfo(book.id)}
                  className="flex items-center gap-1.5 text-sm text-emerald-700 font-medium"
                >
                  <MdPerson className="text-lg" />
                  Student
                </button>

                <div className="flex items-center gap-2">
                  <button onClick={() => router.push(`/books/${book.id}`)}
                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500
                     hover:bg-emerald-50 hover:text-emerald-700 transition-all">
                    <MdEdit className="text-lg" />
                  </button>

                  <button onClick={() => {
                    const shouldDelete = window.confirm("Are you sure you want to delete the selected book?");

                    if (shouldDelete) {
                      mutate({
                        id: book.id,
                        image: book.image,
                      });
                    }
                  }}
                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-red-500
                     hover:bg-red-50 transition-all">
                    <MdDelete className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty */}
        {filteredBooks?.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <MdSearch className="text-3xl text-gray-400" />
            </div>

            <h3 className="text-lg font-semibold text-gray-700">
              No books found
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              Try searching with another
              keyword
            </p>
          </div>
        )}
      </div>

      {/* Dialog */}
      <StudentDialog
        open={open}
        onOpenChange={toggleDialog}
        student={student}
      />
    </div>
  );
}

export default Dashboard;









