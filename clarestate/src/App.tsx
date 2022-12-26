import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Logion from "@/pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home page</div>,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
