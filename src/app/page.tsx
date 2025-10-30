"use client";

import { useEffect, useState } from "react";
import { Advocate } from "../types/advocate";
import { useFilteredAdvocates } from "../hooks/useFilteredAdvocates";
import SearchBar from "../components/SearchBar";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import AdvocatesTable from "../components/AdvocatesTable";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filteredAdvocates = useFilteredAdvocates(advocates, searchTerm);

  useEffect(() => {
    console.log("fetching advocates...");
    setLoading(true);
    setError(null);
    fetch("/api/advocates")
      .then((response) => response.json())
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch advocates:", err);
        setError("Failed to load advocates. Please try again later.");
        setLoading(false);
      });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const onReset = () => {
    console.log(advocates);
    setSearchTerm("");
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <SearchBar searchTerm={searchTerm} onChange={onChange} onReset={onReset} />
      <br />
      <br />
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        <AdvocatesTable advocates={filteredAdvocates} />
      )}
    </main>
  );
}