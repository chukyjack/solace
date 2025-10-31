"use client";

import { useEffect, useState, useCallback } from "react";
import { Advocate } from "../types/advocate";
import SearchBar from "../components/SearchBar";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import AdvocatesTable from "../components/AdvocatesTable";
import Pagination from "../components/Pagination";

interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface ApiResponse {
  data: Advocate[];
  pagination: PaginationInfo;
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  // Debounce search input (300ms)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1); // Reset to first page when search changes
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Fetch advocates from API with search and pagination
  const fetchAdvocates = useCallback(async (search: string, pageNum: number) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (search.trim()) {
        params.append("search", search.trim());
      }
      params.append("page", pageNum.toString());
      params.append("pageSize", "25");

      const response = await fetch(`/api/advocates?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse: ApiResponse = await response.json();
      setAdvocates(jsonResponse.data);
      setPagination(jsonResponse.pagination);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch advocates:", err);
      setError("Failed to load advocates. Please try again later.");
      setLoading(false);
    }
  }, []);

  // Fetch when search term or page changes
  useEffect(() => {
    fetchAdvocates(debouncedSearchTerm, page);
  }, [debouncedSearchTerm, page, fetchAdvocates]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const onReset = () => {
    setSearchTerm("");
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Solace Advocates</h1>
      <div className="mb-8">
        <SearchBar searchTerm={searchTerm} onChange={onChange} onReset={onReset} />
      </div>
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        <div className="flex flex-col">
          <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
            <AdvocatesTable advocates={advocates} />
          </div>
          {pagination && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              pageSize={pagination.pageSize}
              onPageChange={handlePageChange}
              loading={loading}
            />
          )}
        </div>
      )}
    </main>
  );
}
