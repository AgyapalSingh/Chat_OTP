import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const url = process.env.REACT_APP_API;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/v1/auth/signup`, {
        email,
      });

      navigate("/verify-otp");

      if (res && res.data.success) {
        console.log(res.data.message);
        // navigate("/verify-otp");
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email "
              id="email"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send Otp
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
