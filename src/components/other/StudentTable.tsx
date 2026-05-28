"use client"


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

export function StudentTable({
  student,
}: StudentTableProps) {
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
    <div className="overflow-x-auto rounded-xl border border-gray-300">
      <table className="w-full text-sm text-center border-collapse ">
        
        {/* Header */}
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border">First Name</th>
            <th className="px-4 py-2 border">Middle Name</th>
            <th className="px-4 py-2 border">Last Name</th>
            <th className="px-4 py-2 border">Class</th>
            <th className="px-4 py-2 border">Address</th>
            <th className="px-4 py-2 border">State</th>
            <th className="px-4 py-2 border">City</th>
            <th className="px-4 py-2 border">Pincode</th>
            <th className="px-4 py-2 border">Phone</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          <tr className="hover:bg-gray-50 transition">
            <td className="px-4 py-2 border">{first_name}</td>
            <td className="px-4 py-2 border">
              {middle_name || <span>&mdash;</span>}
            </td>
            <td className="px-4 py-2 border">{last_name}</td>
            <td className="px-4 py-2 border">{className}</td>
            <td className="px-4 py-2 border">{address}</td>
            <td className="px-4 py-2 border">{state}</td>
            <td className="px-4 py-2 border">{city}</td>
            <td className="px-4 py-2 border">{pincode}</td>
            <td className="px-4 py-2 border">{phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

 