import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { REMOVE_ACTIVE_USER } from "./redux/slices/auth_slice";
import { d } from "./utils/junk";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(REMOVE_ACTIVE_USER());
    }, d);
  }, []);

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
