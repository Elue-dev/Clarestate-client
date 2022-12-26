import { user } from "../../App";
import { Navigate } from "react-router-dom";

export default function Unauthenticated({ children }: any) {
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}
