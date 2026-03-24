import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    job_id: "",
    title: "",
    location: "",
    department: "",
    salary_range: "",
    company_profile: "",
    description: "",
    requirements: "",
    benefits: "",
    telecommuting: 0,
    has_company_logo: 0,
    has_questions: 0,
    employment_type: "",
    required_experience: "",
    required_education: "",
    industry: "",
    function: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value
    });
  };

  // API call
  const analyzeJob = async () => {
    if (!form.description && !form.title) {
      alert("Please enter Job Title or Description");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/analyze",
        form
      );
      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6 flex flex-col items-center">

      <h1 className="text-3xl font-bold mb-6">🕵️ Fake Job Detector</h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-5xl space-y-4">

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <input name="job_id" placeholder="Job ID" onChange={handleChange} className="p-3 border rounded" />
          <input name="title" placeholder="Job Title" onChange={handleChange} className="p-3 border rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="location" placeholder="Location" onChange={handleChange} className="p-3 border rounded" />
          <input name="department" placeholder="Department" onChange={handleChange} className="p-3 border rounded" />
        </div>

        {/* Text Areas */}
        <textarea name="company_profile" placeholder="Company Profile" onChange={handleChange} className="w-full p-3 border rounded" />
        <textarea name="description" placeholder="Job Description" onChange={handleChange} className="w-full p-3 border rounded" />
        <textarea name="requirements" placeholder="Requirements" onChange={handleChange} className="w-full p-3 border rounded" />
        <textarea name="benefits" placeholder="Benefits" onChange={handleChange} className="w-full p-3 border rounded" />

        {/* Salary */}
        <input
          name="salary_range"
          placeholder="Salary Range (e.g. 50000-70000)"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        {/* Dropdowns */}
        <div className="grid grid-cols-2 gap-4">

          <select name="employment_type" onChange={handleChange} className="p-3 border rounded">
            <option value="">Employment Type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Temporary</option>
            <option>Other</option>
          </select>

          <select name="required_experience" onChange={handleChange} className="p-3 border rounded">
            <option value="">Experience Level</option>
            <option>Internship</option>
            <option>Entry level</option>
            <option>Associate</option>
            <option>Mid-Senior level</option>
            <option>Director</option>
            <option>Executive</option>
            <option>Not Applicable</option>
          </select>

          <select name="required_education" onChange={handleChange} className="p-3 border rounded">
            <option value="">Education</option>
            <option>High School or equivalent</option>
            <option>Associate Degree</option>
            <option>Bachelor's Degree</option>
            <option>Master's Degree</option>
            <option>Doctorate</option>
            <option>Certification</option>
            <option>Professional</option>
            <option>Vocational</option>
            <option>Vocational - Degree</option>
            <option>Vocational - HS Diploma</option>
            <option>Some College Coursework Completed</option>
            <option>Some High School Coursework</option>
            <option>Unspecified</option>
          </select>

          <input name="industry" placeholder="Industry" onChange={handleChange} className="p-3 border rounded" />
          <input name="function" placeholder="Function" onChange={handleChange} className="p-3 border rounded" />
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="telecommuting" onChange={handleChange} />
            Remote
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" name="has_company_logo" onChange={handleChange} />
            Company Logo
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" name="has_questions" onChange={handleChange} />
            Has Questions
          </label>
        </div>

        {/* Button */}
        <button
          onClick={analyzeJob}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? "⏳ Analyzing..." : "🚀 Analyze Job"}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white mt-6 p-6 rounded-xl shadow-md w-full max-w-5xl">

          <h2 className={`text-2xl font-semibold ${
            result.label?.includes("Fake") ? "text-red-600" : "text-green-600"
          }`}>
            {result.label}
          </h2>

          <p className="text-gray-600 mt-1">
            Confidence: {(result.probability * 100).toFixed(2)}%
          </p>

          <h3 className="mt-4 font-semibold">🧠 Explanation:</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {result.explanation}
          </p>
        </div>
      )}

    </div>
  );
}

export default App;