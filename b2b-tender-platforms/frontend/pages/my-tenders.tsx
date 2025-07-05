// pages/my-tenders.tsx

import { useEffect, useState } from "react";
import axios from "axios";

interface Tender {
  id: number;
  title: string;
  description: string;
  deadline: string;
  budget: number;
}

export default function MyTenders() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyTenders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No auth token found. Please log in.");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/tenders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTenders(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch your tenders.");
      }
    };

    fetchMyTenders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">My Created Tenders</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {tenders.length === 0 && !error ? (
        <p>No tenders created yet.</p>
      ) : (
        <div className="space-y-4">
          {tenders.map((tender) => (
            <div key={tender.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{tender.title}</h2>
              <p className="text-gray-700 mb-1">{tender.description}</p>
              <p className="text-sm">🗓 Deadline: {new Date(tender.deadline).toLocaleDateString()}</p>
              <p className="text-sm">💰 Budget: ₹{tender.budget}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
