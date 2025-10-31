interface SearchBarProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export default function SearchBar({
  searchTerm,
  onChange,
  onReset,
}: SearchBarProps) {
  return (
    <div className="max-w-2xl">
      <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-2">
        Search Advocates
      </label>
      {searchTerm && (
        <p className="text-sm text-gray-600 mb-3">
          Searching for: <span className="font-medium text-gray-900">{searchTerm}</span>
        </p>
      )}
      <div className="flex gap-2">
        <input
          id="search-input"
          type="text"
          placeholder="Search by name, city, degree, or specialty..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
          onChange={onChange}
          value={searchTerm}
        />
        {searchTerm && (
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors font-medium"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

