"use client";

import { useEffect, useState } from "react";

interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("fetching advocates...");
    setLoading(true);
    setError(null);
    fetch("/api/advocates")
      .then((response) => response.json())
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch advocates:", err);
        setError("Failed to load advocates. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Debounce search filtering
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm === "") {
        setFilteredAdvocates(advocates);
        return;
      }

      console.log("filtering advocates...");
      const searchTermLower = searchTerm.toLowerCase();
      const filteredAdvocates = advocates.filter((advocate) => {
        return (
          advocate.firstName.toLowerCase().includes(searchTermLower) ||
          advocate.lastName.toLowerCase().includes(searchTermLower) ||
          advocate.city.toLowerCase().includes(searchTermLower) ||
          advocate.degree.toLowerCase().includes(searchTermLower) ||
          advocate.specialties.some((s: string) => s.toLowerCase().includes(searchTermLower)) ||
          advocate.yearsOfExperience.toString().includes(searchTermLower)
        );
      });

      setFilteredAdvocates(filteredAdvocates);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timeoutId);
  }, [searchTerm, advocates]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const onClick = () => {
    console.log(advocates);
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
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
            {filteredAdvocates.length === 0 ? (
              <tr>
                <td colSpan={7}>No advocates found</td>
              </tr>
            ) : (
              filteredAdvocates.map((advocate, index) => {
                return (
                  <tr key={`${advocate.firstName}-${advocate.lastName}-${advocate.phoneNumber}`}>
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
              })
            )}
          </tbody>
        </table>
      )}
    </main>
  );
}