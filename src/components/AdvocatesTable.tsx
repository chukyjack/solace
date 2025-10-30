import { Advocate } from "../types/advocate";
import AdvocateRow from "./AdvocateRow";

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export default function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {advocates.length === 0 ? (
          <tr>
            <td colSpan={7}>No advocates found</td>
          </tr>
        ) : (
          advocates.map((advocate) => (
            <AdvocateRow key={`${advocate.firstName}-${advocate.lastName}-${advocate.phoneNumber}`} advocate={advocate} />
          ))
        )}
      </tbody>
    </table>
  );
}

