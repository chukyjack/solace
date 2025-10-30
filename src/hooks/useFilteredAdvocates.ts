import { useEffect, useState } from "react";
import { Advocate } from "../types/advocate";

export function useFilteredAdvocates(
  advocates: Advocate[],
  searchTerm: string
): Advocate[] {
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  // Initialize with advocates when advocates change and searchTerm is empty
  useEffect(() => {
    if (searchTerm === "" && advocates.length > 0) {
      setFilteredAdvocates(advocates);
    }
  }, [advocates, searchTerm]);

  // Debounce search filtering
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm === "") {
        setFilteredAdvocates(advocates);
        return;
      }

      console.log("filtering advocates...");
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = advocates.filter((advocate) => {
        return (
          advocate.firstName.toLowerCase().includes(searchTermLower) ||
          advocate.lastName.toLowerCase().includes(searchTermLower) ||
          advocate.city.toLowerCase().includes(searchTermLower) ||
          advocate.degree.toLowerCase().includes(searchTermLower) ||
          advocate.specialties.some((s: string) =>
            s.toLowerCase().includes(searchTermLower)
          ) ||
          advocate.yearsOfExperience.toString().includes(searchTermLower)
        );
      });

      setFilteredAdvocates(filtered);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timeoutId);
  }, [searchTerm, advocates]);

  return filteredAdvocates;
}

