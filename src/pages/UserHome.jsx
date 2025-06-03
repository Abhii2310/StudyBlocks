import React from "react";

export default function UserHome() {
  // In a real app, fetch user info and dashboard content here
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-10 border border-blue-100 mt-10">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-4 text-center">Welcome to Your StudyBlocks Space!</h1>
        <p className="text-blue-700 text-lg text-center mb-8">
          This is your personalized dashboard. Here you can:
        </p>
        <ul className="grid gap-6 md:grid-cols-2">
          <li className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-2xl mb-2">📹</span>
            <span className="font-bold text-blue-900">Upload New Course Videos</span>
            <span className="text-blue-700 text-sm mt-1">Share your knowledge with the world.</span>
          </li>
          <li className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-2xl mb-2">📝</span>
            <span className="font-bold text-blue-900">Track Video Review Status</span>
            <span className="text-blue-700 text-sm mt-1">See if your uploads are ready to publish.</span>
          </li>
          <li className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-2xl mb-2">👤</span>
            <span className="font-bold text-blue-900">Edit Your Profile</span>
            <span className="text-blue-700 text-sm mt-1">Keep your details up to date.</span>
          </li>
          <li className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-2xl mb-2">💬</span>
            <span className="font-bold text-blue-900">Get Support & Feedback</span>
            <span className="text-blue-700 text-sm mt-1">We’re here to help you succeed.</span>
          </li>
        </ul>
        <div className="mt-10 flex flex-col items-center">
          <a href="/upload-video-pro" className="inline-block px-8 py-3 rounded-xl bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition mb-4">Upload Video</a>
          <a href="/dashboard/upload-video" className="inline-block px-8 py-3 rounded-xl bg-yellow-400 text-richblack-900 font-bold text-lg shadow hover:bg-yellow-500 transition">Go to Classic Dashboard</a>
        </div>
      </div>
      <footer className="w-full text-center text-xs text-gray-400 mt-8">
        Deployed at: {new Date().toLocaleString()}
      </footer>
    </div>
  );
}
