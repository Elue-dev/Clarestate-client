import { createBrowserRouter } from "react-router-dom";
import Authenticated from "./components/protect_routes/authenticated";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyCode from "./pages/auth/VerifyCode";
import Unauthenticated from "./components/protect_routes/unauthenticated";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Unauthenticated>
        <>Home</>
      </Unauthenticated>
    ),
  },
  {
    path: "/auth/login",
    element: (
      <Authenticated>
        <Login />
      </Authenticated>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <Authenticated>
        <Signup />
      </Authenticated>
    ),
  },
  {
    path: "/auth/forgot-password",
    element: (
      <Authenticated>
        <ForgotPassword />
      </Authenticated>
    ),
  },
  {
    path: "/auth/reset-password",
    element: (
      <Authenticated>
        <ResetPassword />
      </Authenticated>
    ),
  },
  {
    path: "/auth/verify-code",
    element: (
      <Authenticated>
        <VerifyCode />
      </Authenticated>
    ),
  },
  {
    path: "*",
    element: <h1>PAGE DOES NOT EXIST</h1>,
  },
]);
