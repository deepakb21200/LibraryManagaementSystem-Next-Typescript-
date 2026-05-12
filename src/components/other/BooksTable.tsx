import { getFormattedDate } from "@/utils/functions";

 

export  const  BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-300">
      <table className="w-full text-sm text-center border-collapse">
        
        {/* Header */}
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Book Name</th>
            <th className="px-4 py-2 border">Issued Date</th>
            <th className="px-4 py-2 border">Author</th>
            <th className="px-4 py-2 border">Publisher</th>
            <th className="px-4 py-2 border">ISBN</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {books?.map(
            ({ id, name, student_books, author, publisher, isbn }:any, index) => (
              <tr
                key={id}
                className="hover:bg-gray-50 transition even:bg-gray-50/50"
              >
                <td className="px-4 py-2 border">{index + 1}</td>

                <td className="px-4 py-2 border">{name}</td>

                <td className="px-4 py-2 border">
                  {getFormattedDate(student_books[0]?.created_at)}
                </td>

                <td className="px-4 py-2 border">{author}</td>

                <td className="px-4 py-2 border">{publisher}</td>

                <td className="px-4 py-2 border">{isbn}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

