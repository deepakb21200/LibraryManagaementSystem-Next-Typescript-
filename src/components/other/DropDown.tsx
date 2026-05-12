"use client";

interface DropdownItem {
  id: string;
  value: string;
}

interface DropdownProps {
  data?: DropdownItem[];
  title: string;

  updateSelection: (
    value: Record<string, string>
  ) => void;

  value?: string;
}

function Dropdown({data, title,updateSelection, value}: DropdownProps) {
  return (
    <div className="relative">
      <select
        value={value || ""}
        onChange={(e) => {
          updateSelection({
            [title]: e.target.value,
          });
        }}
        className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition-all focus:border-emerald-400 focus:bg-white appearance-none cursor-pointer"
      >
        <option value="">
          Select {title}
        </option>

        {data?.map((item) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.value}
          </option>
        ))}
      </select>

      {/* CUSTOM ARROW */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-gray-400 text-sm">
        ▼
      </div>
    </div>
  );
}

export default Dropdown;