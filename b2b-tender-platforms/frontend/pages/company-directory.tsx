import { useState, useEffect } from "react";
import axios from "axios";

interface Company {
  id: number;
  name: string;
  industry: string;
  description: string;
  logoUrl?: string;
}

export default function CompanyDirectory() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async (query = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/company/search?query=${query}`
      );
      setCompanies(res.data);
    } catch (err) {
      console.error("Failed to fetch companies", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCompanies(search);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Company Directory</h1>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search by name, industry, or services..."
          className="p-2 w-full border border-gray-300 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading companies...</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {companies.map((company) => (
            <div key={company.id} className="bg-white p-4 shadow rounded">
              {company.logoUrl && (
                <img
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  className="w-24 h-24 object-contain mb-2"
                />
              )}
              <h2 className="text-xl font-semibold">{company.name}</h2>
              <p className="text-gray-600">{company.industry}</p>
              <p className="mt-2 text-gray-700">{company.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
