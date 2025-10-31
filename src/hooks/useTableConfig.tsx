import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  createColumnHelper,
  SortingState,
  ExpandedState,
  type Table,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { Advocate } from "../types/advocate";
import NameCell from "../components/cells/NameCell";
import SpecialtiesCell from "../components/cells/SpecialtiesCell";

const columnHelper = createColumnHelper<Advocate>();

export function useTableConfig(advocates: Advocate[]): Table<Advocate> {
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

  return table;
}

