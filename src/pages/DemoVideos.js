import React, { useEffect, useState } from "react";

// Store approved videos in localStorage for demo
const DEMO_VIDEOS_KEY = "approved_demo_videos";

export default function DemoVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(DEMO_VIDEOS_KEY);
    if (stored) setVideos(JSON.parse(stored));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 12, background: "#fafbfc", boxShadow: "0 2px 8px #eee" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Demo Approved Videos</h2>
      {videos.length === 0 && <p style={{ textAlign: "center", color: '#888' }}>No demo videos approved yet.</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
        {videos.map((v, idx) => (
          <div key={idx} style={{ width: 320, border: '1px solid #ddd', borderRadius: 8, padding: 12, background: '#fff' }}>
            <video src={v.url} controls style={{ width: '100%', borderRadius: 6 }} />
            <div style={{ marginTop: 8, fontSize: 15 }}><b>{v.name}</b></div>
            <div style={{ color: '#888', fontSize: 13 }}>{v.approvalSummary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
