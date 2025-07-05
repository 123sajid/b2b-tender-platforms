import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface Company {
  name: string;
  logoUrl?: string;
  industry?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/company/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompany(res.data);
      } catch (error) {
        console.error("Failed to fetch company profile");
      }
    };

    fetchProfile();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard 🎉</h1>

        {company && (
          <div className="flex items-center space-x-4 mb-6">
            {company.logoUrl && (
              <img
                src={company.logoUrl}
                alt="Company Logo"
                className="h-16 w-16 rounded-full border"
              />
            )}
            <div>
              <p className="text-lg font-semibold">{company.name}</p>
              {company.industry && (
                <p className="text-sm text-gray-600">{company.industry}</p>
              )}
            </div>
          </div>
        )}

        <p className="mb-6 text-gray-700">
          You are successfully logged in. Choose an option below:
        </p>

        <div className="space-y-4">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={() => router.push("/company-profile")}
          >
            🏢 Manage Company Profile
          </button>
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            onClick={() => router.push("/browse-tenders")}
          >
            📄 Browse Tenders
          </button>
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
            onClick={() => router.push("/my-applications")}
          >
            📝 My Applications
          </button>
          <button
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded"
            onClick={() => router.push("/company-directory")}
          >
            🧭 Search Companies
          </button>
        </div>
      </div>
    </div>
  );
}
