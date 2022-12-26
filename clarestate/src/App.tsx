import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

export const user = false;

function App() {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
