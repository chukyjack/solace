"use client";

import { useTableConfig } from "../../hooks/useTableConfig";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { Advocate } from "../../types/advocate";

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export default function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  const table = useTableConfig(advocates);

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 bg-white table-fixed">
        <colgroup>
          <col className="w-[35%]" />
          <col className="w-[35%]" />
          <col className="w-[15%]" />
          <col className="w-[15%]" />
        </colgroup>
        <TableHeader table={table} />
        <TableBody table={table} />
      </table>
    </div>
  );
}


