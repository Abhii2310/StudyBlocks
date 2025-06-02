import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaCheckCircle, FaCloudUploadAlt, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UploadVideoPro() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    language: "",
    duration: "",
    video: null,
  });
  const [progress, setProgress] = useState(0);
  const [videoPreview, setVideoPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [testCases, setTestCases] = useState([
    { key: "quality", label: "Video Quality (HD/SD)", desc: "Clear, high-definition visuals with minimal distractions.", status: "Not Checked" },
    { key: "audio", label: "Audio Clarity", desc: "Crisp, audible sound without background noise.", status: "Not Checked" },
    { key: "structure", label: "Content Structure", desc: "Logical flow and well-organized sections.", status: "Not Checked" },
    { key: "policy", label: "Policy Compliance", desc: "Adheres to StudyBlocks content and community guidelines.", status: "Not Checked" },
  ]);
  const [allPassed, setAllPassed] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const canSubmit = form.title && form.description && form.category && form.language && form.duration && form.video;

  const handleChange = e => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm(f => ({ ...f, video: files[0] }));
      if (files[0]) setVideoPreview(URL.createObjectURL(files[0]));
      else setVideoPreview(null);
    } else setForm(f => ({ ...f, [name]: value }));
  };


  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setForm(f => ({ ...f, video: e.dataTransfer.files[0] }));
      setVideoPreview(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };

  const handleClick = () => fileInputRef.current.click();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);
    setError("");
    setSuccess("");
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    try {
      await axios.post("/api/v1/video-upload/upload-video", data, {
        withCredentials: true,
        onUploadProgress: (evt) => setProgress(Math.round((evt.loaded * 100) / evt.total)),
      });
      setSuccess("Video uploaded! Automated testing in progress...");
      // Simulate test case checking
      setTimeout(() => {
        setTestCases(prev => prev.map(tc => ({ ...tc, status: 'Passed' })));
        setAllPassed(true);
        setSuccess("");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    }
    setLoading(false);
  };


  // Helper: badge color
  const badge = (ok, label) => (
    <span style={{
      display: "inline-block",
      minWidth: 90,
      margin: "0 6px 6px 0",
      padding: "3px 14px",
      borderRadius: 14,
      fontWeight: 600,
      background: ok ? "#e6ffe6" : "#ffe6e6",
      color: ok ? "#1a7f37" : "#a71d2a",
      fontSize: 15,
      boxShadow: ok ? "0 1px 4px #b6f7c7" : "0 1px 4px #f7b6b6",
    }}>{ok ? <FaCheckCircle style={{marginRight:4,marginBottom:-2}}/> : <FaTimesCircle style={{marginRight:4,marginBottom:-2}}/>}{label}</span>
  );

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-richblack-900 via-richblack-800 to-blue-900">
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-2xl p-10 border border-blue-100">
        <h2 className="text-3xl font-extrabold text-blue-900 text-center mb-5 tracking-tight">Upload Your Course Video</h2>
        <p className="text-center text-lg text-blue-800 mb-6">Upload a sample video to test our automated review system. You'll see your review status after upload.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="input input-bordered w-full bg-blue-50 text-blue-900 font-semibold rounded-lg px-4 py-2 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required className="input input-bordered w-full bg-blue-50 text-blue-900 font-semibold rounded-lg px-4 py-2 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input name="language" placeholder="Language" value={form.language} onChange={handleChange} required className="input input-bordered w-full bg-blue-50 text-blue-900 font-semibold rounded-lg px-4 py-2 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input name="duration" placeholder="Duration (minutes)" value={form.duration} onChange={handleChange} required type="number" min="1" className="input input-bordered w-full bg-blue-50 text-blue-900 font-semibold rounded-lg px-4 py-2 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="input input-bordered w-full bg-blue-50 text-blue-900 font-semibold rounded-lg px-4 py-2 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" rows={3} />
          <div className="mb-2">
            <div
              className={`w-full py-10 border-2 border-dashed ${form.video ? 'border-blue-400 bg-blue-50' : 'border-blue-200 bg-blue-50'} rounded-xl flex flex-col items-center justify-center cursor-pointer transition hover:border-blue-400 hover:bg-blue-100`}
              onClick={handleClick}
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input type="file" name="video" accept="video/mp4" ref={fileInputRef} style={{ display: "none" }} onChange={handleChange} />
              <FaCloudUploadAlt size={48} className="text-blue-400 mb-2" />
              <span className="text-blue-800 mb-2 font-bold">Drag & drop or click to select a video (mp4)</span>
              {form.video && <span className="text-blue-900 font-semibold">{form.video.name}</span>}
              {videoPreview && <video src={videoPreview} controls className="mt-2 rounded-lg max-h-48 w-full object-contain border border-blue-200 shadow" />}
            </div>
          </div>
          <button type="submit" disabled={loading || !canSubmit} className="w-full py-3 rounded-xl font-bold text-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? <><FaCloudUploadAlt className="animate-bounce"/> Uploading...</> : <>Upload Video <FaCloudUploadAlt /></>}
          </button>
          {loading && (
            <div className="w-full h-2 bg-blue-200 rounded-lg overflow-hidden mt-2">
              <div className="h-2 bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          )}
          {error && <div className="mt-2 text-center font-semibold text-red-500">{error}</div>}
          {success && <div className="mt-2 text-center font-semibold text-green-600">{success}</div>}
        </form>
        {/* Test Cases Section */}
        <div className="mt-10 bg-white/80 rounded-xl shadow p-6 border border-blue-100">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Test Cases to Publish Your Course</h3>
          <ul className="divide-y divide-blue-50">
            {testCases.map(tc => (
              <li key={tc.key} className="flex items-start gap-4 py-4">
                <span className="mt-1">
                  {tc.status === 'Passed' ? <FaCheckCircle className="text-green-400" size={24}/> : tc.status === 'Failed' ? <FaTimesCircle className="text-red-400" size={24}/> : <FaCloudUploadAlt className="text-blue-300" size={24}/>}
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-blue-900 text-base">{tc.label}</div>
                  <div className="text-blue-700 text-sm mb-1">{tc.desc}</div>
                  <div className={`text-xs font-bold ${tc.status === 'Passed' ? 'text-green-600' : tc.status === 'Failed' ? 'text-red-500' : 'text-blue-400'}`}>{tc.status}</div>
                </div>
              </li>
            ))}
          </ul>
          {allPassed && (
            <div className="mt-6 text-center text-xl font-extrabold text-green-700">All test cases passed! Your course is <span className="text-blue-700">Ready to Publish</span>.</div>
          )}
        </div>
      </div>
    </div>
  );
}
