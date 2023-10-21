import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const url = process.env.REACT_APP_API;

const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/v1/auth/create-password`, {
        password,
      });

      if (res && res.data.success) {
        navigate("/");
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter You Password "
              id="password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePassword;
