import { Advocate } from "../types/advocate";

interface AdvocateRowProps {
  advocate: Advocate;
}

export default function AdvocateRow({ advocate }: AdvocateRowProps) {
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
        <div className="flex flex-wrap gap-2">
          {advocate.specialties.map((s, sIndex) => (
            <span
              key={sIndex}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {s}
            </span>
          ))}
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

