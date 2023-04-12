import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoute from "./AppRoute";

function App() {
  return (
    <>
      <ToastContainer position="top-right" limit={1} />

      <AppRoute />
    </>
  );
}

export default App;
