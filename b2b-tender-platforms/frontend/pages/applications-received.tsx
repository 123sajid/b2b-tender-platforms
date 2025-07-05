import { useEffect, useState } from "react";
import axios from "axios";

interface Application {
  id: number;
  message: string;
  companyId: number;
  Tender: {
    id: number;
    title: string;
  };
}

export default function ApplicationsReceived() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/applications/received", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const apps = res.data.flatMap((tender: any) =>
          tender.TenderApplications.map((app: any) => ({
            ...app,
            Tender: { id: tender.id, title: tender.title },
          }))
        );
        setApplications(apps);
      } catch (err) {
        setError("Failed to load received applications.");
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Applications Received</h1>
      {error && <p className="text-red-500">{error}</p>}
      {applications.length === 0 ? (
        <p>No applications received yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Tender: {app.Tender.title}</h2>
              <p><strong>Company ID:</strong> {app.companyId}</p>
              <p><strong>Message:</strong> {app.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
