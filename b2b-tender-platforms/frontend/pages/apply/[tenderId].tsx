// pages/apply/[tenderId].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ApplyTender() {
  const router = useRouter();
  const { tenderId } = router.query;

  const [tender, setTender] = useState<any>(null);
  const [proposal, setProposal] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!tenderId) return;

    const fetchTender = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tenders/${tenderId}`);
        setTender(res.data);
      } catch (err) {
        setError("Failed to load tender");
      }
    };

    fetchTender();
  }, [tenderId]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/applications/${tenderId}`,
        { proposal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Application submitted successfully!");
      setProposal("");
    } catch (err: any) {
      console.error(err);
      setError("Failed to submit application.");
    }
  };

  if (!tender) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-4">Apply to Tender</h1>
      <h2 className="text-xl font-semibold">{tender.title}</h2>
      <p className="mb-4 text-gray-700">{tender.description}</p>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form onSubmit={handleApply} className="mt-4">
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Write your proposal..."
          rows={6}
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Proposal
        </button>
      </form>
    </div>
  );
}
