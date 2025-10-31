import { flexRender, Row } from "@tanstack/react-table";
import { Advocate } from "../../types/advocate";

interface TableRowProps {
  row: Row<Advocate>;
}

export default function TableRow({ row }: TableRowProps) {
  const isExpanded = row.getIsExpanded();

  return (
    <tr
      key={row.id}
      className={`hover:bg-gray-50 transition-colors ${isExpanded ? "" : "h-16"}`}
      style={isExpanded ? {} : { height: "64px" }}
    >
      {row.getVisibleCells().map((cell) => {
        const isSpecialtiesCell = cell.column.id === "specialties";
        const isNameCell = cell.column.id === "name";
        return (
          <td
            key={cell.id}
            className={`px-6 py-4 text-sm text-gray-900 align-top ${
              !isSpecialtiesCell && !isNameCell ? "whitespace-nowrap" : ""
            }`}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
}


