import Authenticated from "../components/protect_routes/authenticated";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Home from "../pages/home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyCode from "../pages/auth/VerifyCode";
import Unauthenticated from "../components/protect_routes/unauthenticated";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/auth/login"
        element={
          <Authenticated>
            <Login />
          </Authenticated>
        }
      />
      <Route
        path="/auth/register"
        element={
          <Authenticated>
            <Signup />
          </Authenticated>
        }
      />
      <Route
        path="/auth/forgot-password"
        element={
          <Authenticated>
            <ForgotPassword />
          </Authenticated>
        }
      />
      <Route
        path="/auth/reset-password"
        element={
          <Authenticated>
            <ResetPassword />
          </Authenticated>
        }
      />
      <Route
        path="/auth/verify-code/:userID"
        element={
          <Authenticated>
            <VerifyCode />
          </Authenticated>
        }
      />
      <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
    </Routes>
  );
}
