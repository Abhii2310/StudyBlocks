import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"

// Helper to seed demo user via backend API
async function seedDemoUser() {
  try {
    const res = await fetch("/api/seed-demo-user", { method: "POST" });
    return await res.json();
  } catch (e) {
    return { success: false, message: "Failed to seed demo user" };
  }
}

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [retry, setRetry] = useState(false)

  const { email, password } = formData

  // Auto-login logic for demo user
  React.useEffect(() => {
    async function tryLogin() {
      if (
        formData.email === "demo5@studyblocks.com" &&
        formData.password === "demopassword"
      ) {
        setLoading(true)
        setError("")
        // Try login via API
        try {
          let resp = await fetch("/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email, password: formData.password })
          })
          let data = await resp.json()
          if (data.success) {
            window.location.href = "/dashboard/upload-video"
            return
          } else if (!retry) {
            // Try to seed the user, then retry login ONCE
            await seedDemoUser()
            setRetry(true)
            // Retry login
            resp = await fetch("/api/v1/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: formData.email, password: formData.password })
            })
            data = await resp.json()
            if (data.success) {
              window.location.href = "/dashboard/video-test"
              return
            }
          }
          setError("Login failed. Only demo5@studyblocks.com / demopassword allowed.")
        } catch (e) {
          setError("Network error. Please try again.")
        }
        setLoading(false)
      } else if (formData.email || formData.password) {
        setError("Login failed. Only demo5@studyblocks.com / demopassword allowed.");
        setLoading(false);
      }
    }
    tryLogin()
    // eslint-disable-next-line
  }, [formData.email, formData.password])

  const handleOnChange = (e) => {
    const updated = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updated);
    setRetry(false);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setRetry(false)
    setLoading(true)
    setError("")
    // Let useEffect handle login
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm