// "use client"

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { getBooksByStudentId } from "../../../api/booksApi";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   MdSearch,
//   MdEdit,
//   MdDelete,
//   MdMenuBook,
// } from "react-icons/md";

// import { toast } from "sonner";
// import { deleteStudent, getStudents } from "../../../api/studentsApi";
// import { BooksDialog } from "@/components/other/BooksDialog";


// function StudentsList() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen] = useState(false);

//   const toggleOpen = () => setOpen(!open);

//   const [studentName, setStudentName] = useState(null);

// const router = useRouter();
//   const queryClient = useQueryClient();

//   const {
//     data: books,
//     mutate: getBooksByStudent,
//   } = useMutation({
//     mutationKey: ["booksByStudent"],
//     mutationFn: getBooksByStudentId,
//     onError: (error) => toast(`❌ ${error.message}`),
//   });

//   const { mutate } = useMutation({
//     mutationKey: ["deleteStudent"],
//     mutationFn: deleteStudent,
//     onSuccess: () => {
//       toast("✅ Student is deleted successfully.");

//       queryClient.invalidateQueries({
//         queryKey: ["students"],
//       });
//     },
//     onError: (error) => toast(`❌ ${error.message}`),
//   });

//   const { data: students, error } = useQuery({
//     queryKey: ["students"],
//     queryFn: getStudents,
//   });

//   const filteredStudents = students?.filter((student) => {
//     const values = Object.values(student).join(" ").toLowerCase();

//     return values.includes(searchTerm.toLowerCase());
//   });

//   return (
//     <div className="p-3 sm:p-5">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
//         <div>
//           <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-800">
//             Students List
//           </h2>

//           <p className="text-sm text-gray-400 mt-1">
//             Manage all registered students
//           </p>
//         </div>

//         <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl">
//           <p className="text-xs text-gray-500">Total Students</p>
//           <p className="text-xl font-semibold text-emerald-700">
//             {students?.length || 0}
//           </p>
//         </div>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl px-4 py-3 text-sm mb-4">
//           {error.message}
//         </div>
//       )}

//       {/* Search */}
//       <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm">
//         <div className="relative max-w-md mb-5">
//           <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

//           <input
//             type="text"
//             placeholder="Search by any field..."
//             className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition-all focus:border-emerald-400 focus:bg-white"
//             onChange={(event) => setSearchTerm(event.target.value)}
//           />
//         </div>

//         {/* Desktop Table */}
//         <div className="hidden xl:block overflow-x-auto rounded-xl border border-gray-200">
//           <table className="w-full border-collapse">
//             <thead className="bg-gray-50">
//               <tr>
//                 {[
//                   "Student",
//                   "Student ID",
//                   "Class",
//                   "Address",
//                   "Phone",
//                   "Books",
//                   "Actions",
//                 ].map((heading) => (
//                   <th
//                     key={heading}
//                     className="text-left text-xs font-semibold tracking-wide uppercase text-gray-500 px-5 py-4"
//                   >
//                     {heading}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {filteredStudents?.map((student, index) => (
//                 <tr
//                   key={student.id}
//                   className={`border-t border-gray-100 hover:bg-gray-50 transition-all ${
//                     index % 2 === 0 ? "bg-white" : "bg-gray-50/40"
//                   }`}
//                 >
//                   {/* Student */}
//                   <td className="px-5 py-4">
//                     <div>
//                       <p className="text-sm font-medium text-gray-800">
//                         {student.first_name}{" "}
//                         {student.middle_name && student.middle_name}{" "}
//                         {student.last_name}
//                       </p>

//                       <p className="text-xs text-gray-400 mt-1">
//                         {student.city}, {student.state}
//                       </p>
//                     </div>
//                   </td>

//                   {/* Student ID */}
//                   <td className="px-5 py-4">
//                     <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
//                       STU{student.id}
//                     </span>
//                   </td>

//                   {/* Class */}
//                   <td className="px-5 py-4 text-sm text-gray-600">
//                     {student.class}
//                   </td>

//                   {/* Address */}
//                   <td className="px-5 py-4">
//                     <div className="max-w-[220px]">
//                       <p className="text-sm text-gray-600 line-clamp-2">
//                         {student.address}
//                       </p>

//                       <p className="text-xs text-gray-400 mt-1">
//                         {student.pincode}
//                       </p>
//                     </div>
//                   </td>

//                   {/* Phone */}
//                   <td className="px-5 py-4 text-sm text-gray-600">
//                     {student.phone}
//                   </td>

//                   {/* Books */}
//                   <td className="px-5 py-4">
//                     <button
//                       className="text-sm text-emerald-700 hover:text-emerald-800 font-medium underline underline-offset-2"
//                       onClick={() => {
//                         setStudentName(student.first_name);

//                         getBooksByStudent(student.id, {
//                           onSuccess: () => toggleOpen(),
//                         });
//                       }}
//                     >
//                       View Books
//                     </button>
//                   </td>

//                   {/* Actions */}
//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-3">
//                       <button
//                      onClick={() => router.push(`/students/${student.id}`)}
//                         className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-100 transition-all"
//                       >
//                         <MdEdit className="text-lg" />
//                       </button>

//                       <button
//                         onClick={() => {
//                           const shouldDelete = window.confirm(
//                             "Are you sure you want to delete the selected student?"
//                           );

//                           if (shouldDelete) {
//                             mutate(student.id);
//                           }
//                         }}
//                         className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-100 transition-all"
//                       >
//                         <MdDelete className="text-lg" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile + Tablet Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden">
//           {filteredStudents?.map((student) => (
//             <div
//               key={student.id}
//               className="border border-gray-200 rounded-2xl p-4 bg-white hover:border-emerald-200 transition-all"
//             >
//               {/* Top */}
//               <div className="flex items-start justify-between gap-3">
//                 <div>
//                   <h3 className="text-sm font-semibold text-gray-800">
//                     {student.first_name}{" "}
//                     {student.middle_name && student.middle_name}{" "}
//                     {student.last_name}
//                   </h3>

//                   <p className="text-xs text-gray-400 mt-1">
//                     STU{student.id}
//                   </p>
//                 </div>

//                 <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium">
//                   {student.class}
//                 </span>
//               </div>

//               {/* Details */}
//               <div className="mt-4 space-y-3">
//                 <div>
//                   <p className="text-[11px] uppercase tracking-wider text-gray-400">
//                     Address
//                   </p>

//                   <p className="text-sm text-gray-600 mt-1">
//                     {student.address}
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <p className="text-[11px] uppercase tracking-wider text-gray-400">
//                       City
//                     </p>

//                     <p className="text-sm text-gray-600 mt-1">
//                       {student.city}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-[11px] uppercase tracking-wider text-gray-400">
//                       Phone
//                     </p>

//                     <p className="text-sm text-gray-600 mt-1">
//                       {student.phone}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
//                 <button
//                   onClick={() => {
//                     setStudentName(student.first_name);

//                     getBooksByStudent(student.id, {
//                       onSuccess: () => toggleOpen(),
//                     });
//                   }}
//                   className="flex items-center gap-1.5 text-sm text-emerald-700 font-medium"
//                 >
//                   <MdMenuBook className="text-lg" />
//                   Books
//                 </button>

//                 <div className="flex items-center gap-2">
//                   <button
//               onClick={() => router.push(`/students/${student.id}`)}
//                     className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
//                   >
//                     <MdEdit className="text-lg" />
//                   </button>

//                   <button
//                     onClick={() => {
//                       const shouldDelete = window.confirm(
//                         "Are you sure you want to delete the selected student?"
//                       );

//                       if (shouldDelete) {
//                         mutate(student.id);
//                       }
//                     }}
//                     className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-red-500 hover:bg-red-50 transition-all"
//                   >
//                     <MdDelete className="text-lg" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredStudents?.length === 0 && (
//           <div className="py-16 flex flex-col items-center justify-center text-center">
//             <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
//               <MdSearch className="text-3xl text-gray-400" />
//             </div>

//             <h3 className="text-lg font-semibold text-gray-700">
//               No students found
//             </h3>

//             <p className="text-sm text-gray-400 mt-1">
//               Try searching with another keyword
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Dialog */}
//       {books?.length > 0 && (
//         <BooksDialog
//           books={books}
//           open={open}
//           onOpenChange={toggleOpen}
//           studentName={studentName}
//         />
//       )}
//     </div>
//   );
// }

// export default StudentsList;





















"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooksByStudentId } from "../../../api/booksApi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MdSearch,
  MdEdit,
  MdDelete,
  MdMenuBook,
} from "react-icons/md";

import { toast } from "sonner";
import { deleteStudent, getStudents } from "../../../api/studentsApi";
import { BooksDialog } from "@/components/other/BooksDialog";
import CommonTable from "../dashboard/DataTable";


function StudentsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const [studentName, setStudentName] = useState("");

  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: books,
    mutate: getBooksByStudent,
  } = useMutation({
    mutationKey: ["booksByStudent"],
    mutationFn: getBooksByStudentId,
    onError: (error) => toast(`❌ ${error.message}`),
  });

  const { mutate } = useMutation({
    mutationKey: ["deleteStudent"],
    mutationFn: deleteStudent,
    onSuccess: () => {
      toast("✅ Student is deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
    onError: (error) => toast(`❌ ${error.message}`),
  });

  const { data: students, error } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  const filteredStudents = students?.filter((student) => {
    const values = Object.values(student).join(" ").toLowerCase();

    return values.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-3 sm:p-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-800">
            Students List
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Manage all registered students
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl">
          <p className="text-xs text-gray-500">Total Students</p>
          <p className="text-xl font-semibold text-emerald-700">
            {students?.length || 0}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl px-4 py-3 text-sm mb-4">
          {error.message}
        </div>
      )}

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="relative max-w-md mb-5">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

          <input
            type="text"
            placeholder="Search by any field..."
            className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition-all focus:border-emerald-400 focus:bg-white"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        {/* Desktop Table */}
        <CommonTable
          data={filteredStudents || []}
          type="students"
          onView={(student) => {
            setStudentName(student.first_name);

            getBooksByStudent(student.id, {
              onSuccess: () => toggleOpen(),
            });
          }}
          onEdit={(student) =>
            router.push(`/students/${student.id}`)
          }
          onDelete={(student) => {
            const shouldDelete = window.confirm(
              "Are you sure you want to delete the selected student?"
            );

            if (shouldDelete) {
              mutate(student.id);
            }
          }}
        />

        {/* Mobile + Tablet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden">
          {filteredStudents?.map((student) => (
            <div
              key={student.id}
              className="border border-gray-200 rounded-2xl p-4 bg-white hover:border-emerald-200 transition-all"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {student.first_name}{" "}
                    {student.middle_name && student.middle_name}{" "}
                    {student.last_name}
                  </h3>

                  <p className="text-xs text-gray-400 mt-1">
                    STU{student.id}
                  </p>
                </div>

                <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium">
                  {student.class}
                </span>
              </div>

              {/* Details */}
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400">
                    Address
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {student.address}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-400">
                      City
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {student.city}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-400">
                      Phone
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {student.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <button onClick={() => {
                  setStudentName(student.first_name)
                  getBooksByStudent(student.id, {
                    onSuccess: () => toggleOpen()
                  })
                }}
                  className="flex items-center gap-1.5 text-sm text-emerald-700 font-medium"
                >
                  <MdMenuBook className="text-lg" />
                  Books
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => router.push(`/students/${student.id}`)}
                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
                  >
                    <MdEdit className="text-lg" />
                  </button>

                  <button
                    onClick={() => {
                      const shouldDelete = window.confirm(
                        "Are you sure you want to delete the selected student?"
                      );

                      if (shouldDelete) {
                        mutate(student.id);
                      }
                    }}
                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-red-500 hover:bg-red-50 transition-all"
                  >
                    <MdDelete className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStudents?.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <MdSearch className="text-3xl text-gray-400" />
            </div>

            <h3 className="text-lg font-semibold text-gray-700">
              No students found
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              Try searching with another keyword
            </p>
          </div>
        )}
      </div>

      {/* Dialog */}
      {/* {books?.length > 0 && ( */}
      {books && books.length > 0 && (
        <BooksDialog
          books={books}
          open={open}
          onOpenChange={toggleOpen}
          studentName={studentName}
        />
      )}
    </div>
  );
}

export default StudentsList;






