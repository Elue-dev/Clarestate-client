import Authenticated from "../components/protect_routes/authenticated";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Home from "../pages/home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyCode from "../pages/auth/VerifyCode";
import Unauthenticated from "../components/protect_routes/unauthenticated";
import PropertyDetail from "../pages/properties/property_details/PropertyDetails";
import QueriedProperty from "../pages/properties/queried_properties/QueriedProperty";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/property/:slug" element={<PropertyDetail />} />
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
        path="/auth/reset-password/:token"
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

      <Route path="/property_search" element={<QueriedProperty />} />
      <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
    </Routes>
  );
}
