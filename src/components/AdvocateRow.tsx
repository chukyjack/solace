import { Advocate } from "../types/advocate";

interface AdvocateRowProps {
  advocate: Advocate;
}

export default function AdvocateRow({ advocate }: AdvocateRowProps) {
  return (
    <tr>
      <td>{advocate.firstName}</td>
      <td>{advocate.lastName}</td>
      <td>{advocate.city}</td>
      <td>{advocate.degree}</td>
      <td>
        {advocate.specialties.map((s, sIndex) => (
          <div key={sIndex}>{s}</div>
        ))}
      </td>
      <td>{advocate.yearsOfExperience}</td>
      <td>{advocate.phoneNumber}</td>
    </tr>
  );
}

