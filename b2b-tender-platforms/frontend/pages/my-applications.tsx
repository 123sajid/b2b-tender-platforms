import { useEffect, useState } from "react";
import axios from "axios";

interface Application {
  id: number;
  proposal: string;
  tender: {
    title: string;
    description: string;
    deadline: string;
    budget: number;
  };
}

export default function MyApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view applications.");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/applications/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApplications(res.data);
      } catch (err: any) {
        setError("Failed to fetch applications.");
        console.error("Error fetching applications:", err.response?.data || err.message);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {applications.length === 0 && !error && (
        <p className="text-gray-600">You haven’t applied to any tenders yet.</p>
      )}

      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{app.tender.title}</h2>
            <p className="text-gray-700 mb-1">{app.tender.description}</p>
            <p className="text-sm">🗓 Deadline: {new Date(app.tender.deadline).toLocaleDateString()}</p>
            <p className="text-sm">💰 Budget: ₹{app.tender.budget}</p>
            <p className="mt-2 text-gray-800"><strong>Your Proposal:</strong> {app.proposal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
