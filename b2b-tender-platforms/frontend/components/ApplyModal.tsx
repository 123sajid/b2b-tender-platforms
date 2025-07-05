import { useState } from "react";
import axios from "axios";

interface ApplyModalProps {
  tenderId: number;
  onClose: () => void;
}

export default function ApplyModal({ tenderId, onClose }: ApplyModalProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/applications/apply",
        { tenderId, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Application submitted successfully!");
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-xl font-bold mb-4">Submit Proposal</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <textarea
          className="w-full border p-2 rounded mb-4"
          rows={4}
          placeholder="Write your proposal..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-300"
          >
            Cancel
          </button>
          <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
