"use client";

import { getFormattedDate } from "@/utils/functions";

interface Book {
  id: string;
  name: string;
  author: string;
  publisher: string;
  isbn: string;
  student_books: { created_at: string }[];
}

interface BooksTableProps {
  books: Book[];
}

export const BooksTable = ({ books }: BooksTableProps) => {
  return (

    <div className="overflow-x-auto rounded-xl border border-[hsl(40_20%_88%)]">
      <table className="w-full min-w-[1024px] border-collapse">

        {/* Header */}
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 w-12">
              #
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              Book Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              Issued Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 ">
              Author
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              Publisher
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              ISBN
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {books?.map(
            ({ id, name, student_books, author, publisher, isbn }, index) => (
              <tr   key={id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors 
                ${index % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {index + 1}
                </td>

                <td className="px-4 py-3">
                  <div>
                    <span className="text-sm font-medium text-gray-800 truncate max-w-[160px]">
                      {name}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs
                   font-medium">
                    {getFormattedDate(student_books[0]?.created_at)}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm text-gray-600 ">
                  {author}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600 ">
                  {publisher}
                </td>

                <td className="px-4 py-3 text-sm text-gray-500 font-mono ">
                  {isbn}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* Empty state */}
      {(!books || books.length === 0) && (
        <div className="py-12 text-center text-gray-400 text-sm">
          No books found.
        </div>
      )}
    </div>
  );
};