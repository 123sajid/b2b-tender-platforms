import { useEffect, useState } from "react";
import axios from "axios";

export default function CompanyProfile() {
  const [form, setForm] = useState({
    name: "",
    industry: "",
    description: "",
    services: "",
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  // Fetch existing company profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/company/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setForm(res.data);
      } catch (err) {
        console.log("No company profile found.");
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (logo) {
      formData.append("logo", logo);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/company",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Company profile saved!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Error saving company profile.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-bold mb-4">Company Profile</h1>

      {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Company Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Industry"
          value={form.industry}
          onChange={(e) => setForm({ ...form, industry: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Goods & Services"
          value={form.services}
          onChange={(e) => setForm({ ...form, services: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files?.[0] || null)}
          className="w-full"
        />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Save Profile
        </button>
      </form>
    </div>
  );
}
