import { user } from "../../App";
import { Navigate } from "react-router-dom";

export default function Authenticated({ children }: any) {
  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}
