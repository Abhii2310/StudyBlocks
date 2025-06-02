import React, { useState } from "react";

// Demo rules for basic file checks
const BASIC_RULES = [
  {
    label: "Video length must be at least 30 seconds",
    test: (file, metadata) => metadata.duration >= 30,
    failReason: "Video is too short. Please upload a video longer than 30 seconds."
  },
  {
    label: "File size must be less than 100MB",
    test: (file, metadata) => file.size <= 100 * 1024 * 1024,
    failReason: "File size exceeds 100MB. Please upload a smaller video."
  },
  {
    label: "File type must be MP4",
    test: (file, metadata) => file.type === "video/mp4",
    failReason: "Only MP4 videos are allowed."
  }
];

// Simulated advanced checks for demo
const ADVANCED_CHECKS = [
  {
    label: "Video Quality",
    test: (file, metadata) => metadata.duration > 0, // Always pass for demo
    failReason: "Video quality is too low (simulated check)."
  },
  {
    label: "Audio Clarity",
    test: (file, metadata) => file.size > 0, // Always pass for demo
    failReason: "Audio is unclear or missing (simulated check)."
  },
  {
    label: "Content Structure",
    test: (file, metadata) => file.name.toLowerCase().includes("class") || file.name.toLowerCase().includes("lecture"),
    failReason: "Content structure not detected (should contain 'class' or 'lecture' in filename for demo)."
  },
  {
    label: "Policy Compliance",
    test: (file, metadata) => !file.name.toLowerCase().includes("banned"),
    failReason: "Policy violation detected (filename contains 'banned')."
  }
];

const DEMO_VIDEOS_KEY = "approved_demo_videos"; // localStorage key


function getVideoDuration(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      resolve(video.duration);
      URL.revokeObjectURL(url);
    };
    video.src = url;
  });
}

export default function UploadVideoTest() {
  const [file, setFile] = useState(null);
  const [basicResults, setBasicResults] = useState([]);
  const [advancedResults, setAdvancedResults] = useState([]);
  const [finalResult, setFinalResult] = useState(null);
  const [failReasons, setFailReasons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approvedSummary, setApprovedSummary] = useState("");

  const handleFileChange = async (e) => {
    setFinalResult(null);
    setFailReasons([]);
    setBasicResults([]);
    setAdvancedResults([]);
    setApprovedSummary("");
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setLoading(true);
    // Get video duration
    let duration = 0;
    try {
      duration = await getVideoDuration(selectedFile);
    } catch {
      setFinalResult(false);
      setFailReasons(["Could not read video duration."]);
      setLoading(false);
      return;
    }
    // Basic checks
    let basicOk = true;
    const basicResultsArr = BASIC_RULES.map(rule => {
      const passed = rule.test(selectedFile, { duration });
      if (!passed) basicOk = false;
      return { label: rule.label, passed, reason: passed ? null : rule.failReason };
    });
    setBasicResults(basicResultsArr);
    if (!basicOk) {
      setFinalResult(false);
      setFailReasons(basicResultsArr.filter(r => !r.passed).map(r => r.reason));
      setLoading(false);
      return;
    }
    // Simulate advanced checks
    let advOk = true;
    const advResultsArr = ADVANCED_CHECKS.map(rule => {
      const passed = rule.test(selectedFile, { duration });
      if (!passed) advOk = false;
      return { label: rule.label, passed, reason: passed ? null : rule.failReason };
    });
    setAdvancedResults(advResultsArr);
    if (!advOk) {
      setFinalResult(false);
      setFailReasons(advResultsArr.filter(r => !r.passed).map(r => r.reason));
      setLoading(false);
      return;
    }
    // If all pass, approve
    setFinalResult(true);
    const summary = "Passed all checks: quality, audio, structure, policy.";
    setApprovedSummary(summary);
    // Save to demo videos (localStorage)
    const url = URL.createObjectURL(selectedFile);
    const prev = JSON.parse(localStorage.getItem(DEMO_VIDEOS_KEY) || "[]");
    prev.push({ url, name: selectedFile.name, approvalSummary: summary });
    localStorage.setItem(DEMO_VIDEOS_KEY, JSON.stringify(prev));
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 540, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 12, background: "#fafbfc", boxShadow: "0 2px 8px #eee" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Upload Video for Testing</h2>
      <input
        type="file"
        accept="video/mp4"
        onChange={handleFileChange}
        style={{ display: "block", margin: "0 auto 24px auto" }}
      />
      <div style={{ marginBottom: 16 }}>
        <b>Basic Checks:</b>
        <ul style={{ fontSize: 15, color: "#555", marginLeft: 18 }}>
          {BASIC_RULES.map((rule, i) => (
            <li key={rule.label}>
              {basicResults.length > 0 && (
                <span style={{ color: basicResults[i]?.passed ? 'green' : 'red', fontWeight: 600 }}>
                  {basicResults[i]?.passed ? '✔' : '✖'}
                </span>
              )}
              {' ' + rule.label}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginBottom: 16 }}>
        <b>Automated Quality & Policy Checks:</b>
        <ul style={{ fontSize: 15, color: "#555", marginLeft: 18 }}>
          {ADVANCED_CHECKS.map((rule, i) => (
            <li key={rule.label}>
              {advancedResults.length > 0 && (
                <span style={{ color: advancedResults[i]?.passed ? 'green' : 'red', fontWeight: 600 }}>
                  {advancedResults[i]?.passed ? '✔' : '✖'}
                </span>
              )}
              {' ' + rule.label}
            </li>
          ))}
        </ul>
      </div>
      {loading && <p style={{ color: '#007bff' }}>Evaluating video...</p>}
      {finalResult === true && (
        <>
          <p style={{ color: 'green', fontWeight: 600 }}>Success! Video passed all checks and is approved for publication.</p>
          <p style={{ color: '#222', fontSize: 14, margin: '8px 0 0 0' }}>{approvedSummary}</p>
          <a href="/dashboard/demo-videos" style={{ display: 'inline-block', marginTop: 16, color: '#007bff', textDecoration: 'underline', fontWeight: 600 }}>View Demo Videos</a>
        </>
      )}
      {finalResult === false && (
        <div style={{ color: 'red', fontWeight: 600 }}>
          <div>Rejected:</div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {failReasons.map((r, idx) => <li key={idx}>{r}</li>)}
          </ul>
        </div>
      )}
      <div style={{ marginTop: 24, fontSize: 13, color: '#888', textAlign: 'center' }}>
        <em>This is a demo showcase. In the future, real AI/video checks will analyze quality, audio, content, and policy automatically!</em>
      </div>
    </div>
  );
}
