"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  ExpandedState,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { Advocate } from "../types/advocate";
import NameCell from "./NameCell";
import SpecialtiesCell from "./SpecialtiesCell";

interface AdvocatesTableProps {
  advocates: Advocate[];
}

const columnHelper = createColumnHelper<Advocate>();

export default function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "name",
        header: "Name",
        cell: (info) => <NameCell advocate={info.row.original} />,
      }),
      columnHelper.accessor("specialties", {
        header: "Specialties",
        cell: (info) => <SpecialtiesCell advocate={info.row.original} row={info.row} />,
        enableSorting: false,
      }),
      columnHelper.accessor("yearsOfExperience", {
        header: "Years of Experience",
        cell: (info) => {
          const years = info.getValue();
          return `${years} ${years === 1 ? "year" : "years"}`;
        },
      }),
      columnHelper.accessor("phoneNumber", {
        header: "Phone Number",
        cell: (info) => <span className="text-gray-500">{info.getValue()}</span>,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: advocates,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    state: {
      sorting,
      expanded,
    },
  });

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 bg-white table-fixed">
        <colgroup>
          <col className="w-[35%]" />
          <col className="w-[35%]" />
          <col className="w-[15%]" />
          <col className="w-[15%]" />
        </colgroup>
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    header.column.getCanSort() ? "cursor-pointer select-none hover:bg-gray-100" : ""
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
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                <div className="flex flex-col items-center">
                  <svg
                    className="h-12 w-12 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-lg font-medium">No advocates found</p>
                  <p className="text-sm mt-1">Try adjusting your search criteria</p>
                </div>
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => {
              const isExpanded = row.getIsExpanded();
              return (
                <tr 
                  key={row.id} 
                  className={`hover:bg-gray-50 transition-colors ${isExpanded ? '' : 'h-16'}`}
                  style={isExpanded ? {} : { height: '64px' }}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isSpecialtiesCell = cell.column.id === 'specialties';
                    const isNameCell = cell.column.id === 'name';
                    return (
                      <td 
                        key={cell.id} 
                        className={`px-6 py-4 text-sm text-gray-900 align-top ${!isSpecialtiesCell && !isNameCell ? 'whitespace-nowrap' : ''}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
