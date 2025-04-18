import { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import CreatePrescriptionPage from "./pages/CreatePrescriptionPage";
import HomePage from "./pages/HomePage";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:5000/")

      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePrescriptionPage />} />
      </Routes>
    </div>
  );
}

export default App;
