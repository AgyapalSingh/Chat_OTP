import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const url = process.env.REACT_APP_API;

const VerifyOtp = () => {
  const [otpIn, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/v1/auth/verify-otp`, {
        otpIn,
      });

      navigate("/create-password");

      if (res && res.data.success) {
        navigate("/create-password");
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4>Register Account</h4>
          <p>Get Your free Chat Account now.</p>
          <div className="all-inputs">
            <input
              type="string"
              value={otpIn}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 4 Digit Otp "
              id="email"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default VerifyOtp;
