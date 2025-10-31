import { flexRender, Table } from "@tanstack/react-table";
import { Advocate } from "../../types/advocate";

interface TableHeaderProps {
  table: Table<Advocate>;
}

export default function TableHeader({ table }: TableHeaderProps) {
  return (
    <thead className="bg-gray-50">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                header.column.getCanSort()
                  ? "cursor-pointer select-none hover:bg-gray-100"
                  : ""
              }`}
              onClick={header.column.getToggleSortingHandler()}
            >
              <div className="flex items-center gap-2">
                {flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getCanSort() && (
                  <span className="text-gray-400">
                    {{
                      asc: " ↑",
                      desc: " ↓",
                    }[header.column.getIsSorted() as string] ?? " ⇅"}
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}


