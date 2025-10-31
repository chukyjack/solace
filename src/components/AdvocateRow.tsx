"use client";

import { useState } from "react";
import { Advocate } from "../types/advocate";

interface AdvocateRowProps {
  advocate: Advocate;
}

const MAX_VISIBLE_SPECIALTIES = 3;

export default function AdvocateRow({ advocate }: AdvocateRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMore = advocate.specialties.length > MAX_VISIBLE_SPECIALTIES;
  const visibleSpecialties = isExpanded
    ? advocate.specialties
    : advocate.specialties.slice(0, MAX_VISIBLE_SPECIALTIES);
  const remainingCount = advocate.specialties.length - MAX_VISIBLE_SPECIALTIES;

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {advocate.firstName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {advocate.lastName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {advocate.city}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {advocate.degree}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <div className="flex flex-wrap gap-2 items-center">
          {visibleSpecialties.map((s, sIndex) => (
            <span
              key={sIndex}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {s}
            </span>
          ))}
          {hasMore && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {isExpanded ? (
                <>
                  <span>Show less</span>
                </>
              ) : (
                <>
                  <span>+{remainingCount} more</span>
                </>
              )}
            </button>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {advocate.yearsOfExperience} {advocate.yearsOfExperience === 1 ? "year" : "years"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {advocate.phoneNumber}
      </td>
    </tr>
  );
}

