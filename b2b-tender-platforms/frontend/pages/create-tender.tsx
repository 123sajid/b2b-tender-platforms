import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateTender() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(''); // ✅ Added location
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/tenders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          location, // ✅ Include location in body
          budget,
          deadline,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create tender');
      }

      router.push('/browse-tenders');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Create Tender</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Location" // ✅ Added location field
            className="w-full p-2 border rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Budget (in ₹)"
            className="w-full p-2 border rounded"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />

          <input
            type="date"
            className="w-full p-2 border rounded"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Publish Tender
          </button>
        </form>
      </div>
    </div>
  );
}
