import { Advocate } from "../types/advocate";

interface NameCellProps {
  advocate: Advocate;
}

export default function NameCell({ advocate }: NameCellProps) {
  const initials = `${advocate.firstName[0]}${advocate.lastName[0]}`.toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
        <span className="text-sm font-semibold text-blue-800">{initials}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-base font-bold text-gray-800">
          {advocate.firstName} {advocate.lastName}
        </span>
        <span className="text-sm text-gray-500">
          {advocate.degree} • {advocate.city}
        </span>
      </div>
    </div>
  );
}

