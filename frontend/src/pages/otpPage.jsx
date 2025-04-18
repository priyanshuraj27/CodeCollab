import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';
import { setDarkMode } from '../redux/themeslice'; // adjust path if needed
import { showErrorToast, showSuccessToast } from '../utils/toast';
import { useNavigate } from 'react-router-dom';

const OTPPage = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.darkMode); // Access the current theme from Redux
  const [otp, setOtp] = useState(['', '', '', '']); // 4 OTP fields
  const [menuOpen, setMenuOpen] = useState(false); // To manage 3-dot menu state
  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Allow only numbers

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };

  const handleSubmit = () => {
    const otpCode = otp.join('');
    showSuccessToast(`OTP Submitted: ${otpCode}`);
    // Proceed with OTP verification logic
  };

  const buttonStyle = isDarkMode
    ? 'bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white'
    : 'bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white';
  const inputStyle = isDarkMode
    ? 'bg-[#2B7DBD]/10 text-white'
    : 'bg-[#D1F1D5] text-black';
  const containerStyle = isDarkMode
    ? 'bg-[#3C4F67FF] text-white'
    : 'bg-gradient-to-r from-[#D1F1D5] to-[#A7C7E7] text-black';

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${containerStyle}`}
    >
      <div className="w-96 p-6 rounded-lg shadow-lg">
        {/* 3-dot menu (optional for later) */}
        <div className="absolute top-3 right-3">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FaArrowRight />
          </button>
          {menuOpen && (
            <div
              className={`absolute right-0 mt-2 w-32 rounded-md shadow-lg z-10 ${
                isDarkMode ? 'bg-[#1A3C66] text-white' : 'bg-white text-black'
              }`}
            >
              <button
                onClick={() => console.log('Option clicked')}
                className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
              >
                Option
              </button>
            </div>
          )}
        </div>

        <h2 className="text-2xl mb-4 text-center">Enter OTP</h2>
        <div className="flex justify-between mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleInputChange(e, index)}
              className={`w-14 h-14 text-center text-2xl rounded-lg ${inputStyle}`}
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className={`w-full py-2 rounded-lg ${buttonStyle}`}
        >
          Submit OTP
        </button>
      </div>
    </div>
  );
};

export default OTPPage;
