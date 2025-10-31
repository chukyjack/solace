import { Table } from "@tanstack/react-table";
import { Advocate } from "../../types/advocate";
import TableRow from "./TableRow";
import EmptyStateRow from "./EmptyStateRow";

interface TableBodyProps {
  table: Table<Advocate>;
}

export default function TableBody({ table }: TableBodyProps) {
  const rows = table.getRowModel().rows;

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {rows.length === 0 ? (
        <EmptyStateRow />
      ) : (
        rows.map((row) => <TableRow key={row.id} row={row} />)
      )}
    </tbody>
  );
}


