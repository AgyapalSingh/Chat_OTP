import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import VerifyOtp from "./pages/auth/VerifyOtp";
import CreatePassword from "./pages/auth/CreatePassword";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/create-password" element={<CreatePassword />} />
      </Routes>
    </>
  );
}

export default App;
