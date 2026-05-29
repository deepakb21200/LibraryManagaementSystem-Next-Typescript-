
"use client";

// ── Types ──────────────────────────────────────────────────────────────────
type Student = {
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  address: string;
  state: string;
  city: string;
  class: string;
  pincode: string | number;
  phone: string | number;
};

type StudentTableProps = {
  student: Student;
};
// ──────────────────────────────────────────────────────────────────────────

export function StudentTable({ student }: StudentTableProps) {
  const {
    first_name,
    middle_name,
    last_name,
    address,
    state,
    city,
    class: className,
    pincode,
    phone,
  } = student;

  
  return (
 
    <div className="overflow-x-auto rounded-xl border border-[hsl(40_20%_88%)]">
  <table className="w-full min-w-[1024x] border-collapse">

        {/* Header */}
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              First Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              Middle Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              Last Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
              Class
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 ">
              Address
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 ">
              State
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 ">
              City
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 ">
              Pincode
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 ">
              Phone
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors bg-white">

            {/* First Name — avatar + name */}
            <td className="px-4 py-3">
              <div className="flex items-center gap-2.5">
           
                <span className="text-sm font-medium text-gray-800">
                  {first_name}
                </span>
              </div>
            </td>

      
            <td className="px-4 py-3 text-sm text-gray-600">
              {middle_name || <span className="text-gray-300">—</span>}
            </td>

       
            <td className="px-4 py-3 text-sm text-gray-800 font-medium">
              {last_name}
            </td>

            
            <td className="px-4 py-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium">
                {className}
              </span>
            </td>

          
            <td className="px-4 py-3 text-sm text-gray-600  truncate max-w-[160px]">
              {address}
            </td>

         
            <td className="px-4 py-3 text-sm text-gray-600 ">
              {state}
            </td>

          
            <td className="px-4 py-3 text-sm text-gray-600 ">
              {city}
            </td>

         
            <td className="px-4 py-3 text-sm text-gray-500 font-mono ">
              {pincode}
            </td>

            {/* Phone */}
            <td className="px-4 py-3 text-sm text-gray-600 ">
              {phone}
            </td>
          </tr>
        </tbody>
      </table>

   
    </div>
  );
}