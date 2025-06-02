import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UploadVideo() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    language: "",
    duration: "",
    quality: false,
    audio: false,
    structure: false,
    policy: false,
    video: null,
  });
  const [uploads, setUploads] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch uploaded videos
    axios.get("/api/v1/video-upload/my-uploads", { withCredentials: true })
      .then(res => setUploads(res.data.videos))
      .catch(() => setUploads([]));
  }, [message]);

  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") setForm(f => ({ ...f, [name]: checked }));
    else if (type === "file") setForm(f => ({ ...f, video: files[0] }));
    else setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    try {
      await axios.post("/api/v1/video-upload/upload-video", data, { withCredentials: true });
      setMessage("Video uploaded for review!");
      setForm({ title: "", description: "", category: "", language: "", duration: "", quality: false, audio: false, structure: false, policy: false, video: null });
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 12, background: "#fafbfc" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Upload Video as Instructor</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <input name="language" placeholder="Language" value={form.language} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <input name="duration" placeholder="Duration (minutes)" value={form.duration} onChange={handleChange} required type="number" min="1" style={{ width: "100%", marginBottom: 8 }} />
        <input type="file" name="video" accept="video/mp4" onChange={handleChange} required style={{ marginBottom: 8 }} />
        <div style={{ marginBottom: 8 }}>
          <label><input type="checkbox" name="quality" checked={form.quality} onChange={handleChange} /> Video Quality (HD/SD)</label><br />
          <label><input type="checkbox" name="audio" checked={form.audio} onChange={handleChange} /> Audio Clarity</label><br />
          <label><input type="checkbox" name="structure" checked={form.structure} onChange={handleChange} /> Content Structure</label><br />
          <label><input type="checkbox" name="policy" checked={form.policy} onChange={handleChange} required /> I confirm this video meets StudyBlocks policies</label>
        </div>
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 8, background: "#007bff", color: "white", border: 0, borderRadius: 6 }}>
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
      {message && <div style={{ marginTop: 16, color: message.includes("failed") ? "red" : "green" }}>{message}</div>}
      <h3 style={{ margin: "32px 0 8px 0" }}>Your Uploaded Videos</h3>
      <table style={{ width: "100%", background: "white", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>Title</th><th>Status</th><th>Uploaded</th>
          </tr>
        </thead>
        <tbody>
          {uploads.map(v => (
            <tr key={v.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{v.title}</td>
              <td>{v.status}</td>
              <td>{new Date(v.uploadedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
