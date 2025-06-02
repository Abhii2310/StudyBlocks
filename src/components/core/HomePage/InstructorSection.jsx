import React, { useState } from 'react';
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';
import UploadVideo from '../../../pages/UploadVideo';

const InstructorSection = () => {
  const [showUpload, setShowUpload] = useState(false);
  return (
    <div>
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-[50%]">
            <img
              src={Instructor}
              alt=""
              className="shadow-white shadow-[-20px_-20px_0_0]"
            />
          </div>
          <div className="lg:w-[50%] flex gap-10 flex-col">
            <h1 className="lg:w-[50%] text-4xl font-semibold ">
              Become an
              <HighlightText text={"instructor"} />
            </h1>

            <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
              Instructors from around the world teach millions of students on
              StudyBlocks. We provide the tools and skills to teach what you
              love.
            </p>

            <div className="w-fit flex flex-col items-center gap-1">
              <button
                className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-400 to-yellow-300 text-white font-extrabold text-2xl shadow-2xl hover:scale-105 transition-all duration-200 border-4 border-blue-200"
                onClick={() => window.location.href = '/upload-video-pro'}
              >
                Start Teaching Today
                <FaArrowRight />
              </button>
              <div className="text-blue-700 text-base font-semibold mt-2 text-center max-w-xs">
                Upload your course video and experience our industry-leading automated review.
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default InstructorSection