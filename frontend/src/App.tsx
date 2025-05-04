import { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import CreatePrescriptionPage from "./pages/CreatePrescriptionPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Prescriptions from "./pages/AllPrescriptions";
import { UserProvider } from "./contexts/UserContext";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:5000/")

      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create" element={<CreatePrescriptionPage />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
