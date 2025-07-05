// pages/browse-tenders.tsx or components/BrowseTenders.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
// import ApplyModal from "@/components/ApplyModal"; // You can use it later if needed

interface Tender {
  id: number;
  title: string;
  description: string;
  deadline: string;
  budget: number;
}

export default function BrowseTenders() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [selectedTenderId, setSelectedTenderId] = useState<number | null>(null); // moved inside component

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tenders");
        setTenders(res.data);
      } catch (error) {
        console.error("Error fetching tenders:", error);
      }
    };

    fetchTenders();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Browse Tenders</h1>

      <div className="space-y-6">
        {tenders.map((tender) => (
          <div key={tender.id} className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold">{tender.title}</h2>
            <p className="text-gray-700 mb-2">{tender.description}</p>
            <p className="text-sm">🗓 Deadline: {new Date(tender.deadline).toLocaleDateString()}</p>
            <p className="text-sm">💰 Budget: ₹{tender.budget}</p>

            <Link href={`/apply/${tender.id}`}>
              <button className="mt-3 bg-blue-600 text-white px-4 py-1 rounded">
                Apply
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
