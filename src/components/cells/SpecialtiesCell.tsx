"use client";

import { Advocate } from "../../types/advocate";

interface SpecialtiesCellProps {
  advocate: Advocate;
  row: any;
}

const MAX_VISIBLE_SPECIALTIES = 3;

export default function SpecialtiesCell({ advocate, row }: SpecialtiesCellProps) {
  const hasMore = advocate.specialties.length > MAX_VISIBLE_SPECIALTIES;
  const visibleSpecialties = advocate.specialties.slice(0, MAX_VISIBLE_SPECIALTIES);
  const remainingCount = advocate.specialties.length - MAX_VISIBLE_SPECIALTIES;
  const isExpanded = row.getIsExpanded();

  const specialtiesToShow = isExpanded ? advocate.specialties : visibleSpecialties;

  return (
    <div className="flex flex-wrap gap-2 items-start min-h-[32px]">
      {specialtiesToShow.map((s, sIndex) => (
        <span
          key={sIndex}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          {s}
        </span>
      ))}
      {hasMore && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            row.toggleExpanded();
          }}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          {isExpanded ? "Show less" : `+${remainingCount} more`}
        </button>
      )}
    </div>
  );
}

