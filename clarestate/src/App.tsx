import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer
        toastStyle={{
          backgroundColor: "rgba(44, 134, 179, 0.364)",
          color: "#fff",
        }}
        position="bottom-right"
      />
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
