import React, { useEffect, useState } from "react";
import Sidebar from "../pages/components/Sidebar";
import Navbar from "../pages/components/Navbar";

type Prescription = {
  name: string;
  dateOfPrescription: string;
  doctorInformation: string;
  instructions: string;
};

const AllPrescriptions: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/prescriptions");
        const data = await res.json();
        if (res.ok) {
          setPrescriptions(data.data);
        } else {
          console.error("Fetch failed:", data.message);
        }
      } catch (err) {
        console.error("Error fetching prescriptions:", err);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="min-h-screen font-inter">
      <Sidebar />
      <Navbar />

      <main className="ml-[300px] pt-28 justify-center h-full px-8">
        <h2 className="text-lg font-semibold text-[#0077B6] mb-6">
          Prescriptions
        </h2>
        <table className="w-full text-sm border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Patient Name</th>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Doctor</th>
              <th className="border px-2 py-1">Instructions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{prescription.name}</td>
                <td className="border px-2 py-1">
                  {prescription.dateOfPrescription}
                </td>
                <td className="border px-2 py-1">
                  {prescription.doctorInformation}
                </td>
                <td className="border px-2 py-1">
                  {prescription.instructions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AllPrescriptions;
