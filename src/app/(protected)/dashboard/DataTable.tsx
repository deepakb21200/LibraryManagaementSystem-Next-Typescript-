"use client";

import {
  MdDelete,
  MdEdit,
  MdMenuBook,
} from "react-icons/md";

type CommonTableProps<T> = {
  data: T[];

  type: "books" | "students";

  onView: (item: T) => void;

  onEdit: (item: T) => void;

  onDelete: (item: T) => void;
};

function CommonTable<T extends Record<string, any>>({
  data,
  type,
  onView,
  onEdit,
  onDelete,
}: CommonTableProps<T>) {
  const headings =
    type === "books"
      ? ["Book", "Author","Publisher", "ISBN", "Assigned To","Actions"]
      : ["Student","Student ID", "Class","Address","Phone","Books","Actions"];

  return (
    <div className="hidden xl:block overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            {headings.map((heading) => (
              <th key={heading} className="text-left text-xs font-semibold tracking-wide uppercase text-gray-500 px-5 py-4" >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            if (type === "books") {
              return (
                <tr
                  key={item.id}
                  className={`border-t border-gray-100 hover:bg-gray-50 transition-all
                  ${ index % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`} >
                  {/* Book */}
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <MdMenuBook className="text-emerald-600 text-2xl" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.name}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Library Collection
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Author */}
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.author}
                  </td>

                  {/* Publisher */}
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.publisher}
                  </td>

                  {/* ISBN */}
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {item.isbn}
                    </span>
                  </td>

                  {/* View */}
                  <td className="px-5 py-4">
                    <button
                      className="text-sm text-emerald-700 hover:text-emerald-800 font-medium underline underline-offset-2"
                      onClick={() => onView(item)} >
                      View Student
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button  onClick={() => onEdit(item)}
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center
                         text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-100 transition-all" >
                        <MdEdit className="text-lg" />
                      </button>

                      <button  onClick={() => onDelete(item)}
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-red-500
                         hover:bg-red-50 hover:border-red-100 transition-all">
                        <MdDelete className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            }

            return (
              <tr
                key={item.id}
                className={`border-t border-gray-100 hover:bg-gray-50 transition-all
                ${ index % 2 === 0 ? "bg-white": "bg-gray-50/40"}`} >
                {/* Student */}
                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {item.first_name}{" "}
                      {item.middle_name || ""}{" "}
                      {item.last_name}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {item.city}, {item.state}
                    </p>
                  </div>
                </td>

                {/* ID */}
                <td className="px-5 py-4">
                  <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                    STU{item.id}
                  </span>
                </td>

                {/* Class */}
                <td className="px-5 py-4 text-sm text-gray-600">
                  {item.class}
                </td>

                {/* Address */}
                <td className="px-5 py-4">
                  <div className="max-w-[220px]">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.address}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {item.pincode}
                    </p>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-5 py-4 text-sm text-gray-600">
                  {item.phone}
                </td>

                {/* View */}
                <td className="px-5 py-4">
                  <button className="text-sm text-emerald-700 hover:text-emerald-800 font-medium underline underline-offset-2"
                    onClick={() => onView(item)}  >
                    View Books
                  </button>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <button  onClick={() => onEdit(item)}
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500
                       hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-100 transition-all">
                      <MdEdit className="text-lg" />
                    </button>

                    <button onClick={() => onDelete(item)}
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-red-500
                       hover:bg-red-50 hover:border-red-100 transition-all">
                      <MdDelete className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CommonTable;