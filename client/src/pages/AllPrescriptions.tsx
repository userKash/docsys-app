import React, { useEffect, useState } from "react";
import Sidebar from "../pages/components/Sidebar";
import Navbar from "../pages/components/Navbar";
import logo from "../assets/ignatius-logo.svg";

type Medicine = {
  name: string;
  dosage: string;
  frequency: number;
  quantity: number;
};

type Prescription = {
  name: string;
  age: number;
  gender: string;
  dateOfPrescription: string;
  doctorInformation: string;
  createdAt: string;
  inscription: Medicine[];
  instructions: string;
};

const AllPrescriptions: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [sortKey, setSortKey] = useState<"name" | "dateOfPrescription" | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await fetch(
          "https://docsys-app-server.onrender.com/api/prescriptions"
        );
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

  const sortedPrescriptions = [...prescriptions].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortKey === "dateOfPrescription") {
      const aDate = new Date(a.dateOfPrescription);
      const bDate = new Date(b.dateOfPrescription);
      return sortOrder === "asc"
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    } else {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    }
  });

  const handleSort = (key: "name" | "dateOfPrescription") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const openModal = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPrescription(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen font-inter">
      <Sidebar />
      <Navbar />

      <main className="ml-[300px] pt-28 justify-center h-full px-8">
        <h2 className="text-lg font-semibold text-[#0077B6] mb-6">
          All Prescriptions
        </h2>

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => handleSort("name")}
            className={`px-3 py-1 border rounded ${
              sortKey === "name" ? "bg-blue-100" : ""
            }`}
          >
            Sort by Name{" "}
            {sortKey === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
          </button>
          <button
            onClick={() => handleSort("dateOfPrescription")}
            className={`px-3 py-1 border rounded ${
              sortKey === "dateOfPrescription" ? "bg-blue-100" : ""
            }`}
          >
            Sort by Date{" "}
            {sortKey === "dateOfPrescription"
              ? sortOrder === "asc"
                ? "▲"
                : "▼"
              : ""}
          </button>
        </div>

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th
                className="border-b px-5 py-1 cursor-pointer text-start"
                onClick={() => handleSort("name")}
              >
                Patient Name{" "}
                {sortKey === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              <th
                className="border-b px-2 py-2 cursor-pointer text-start"
                onClick={() => handleSort("dateOfPrescription")}
              >
                Date{" "}
                {sortKey === "dateOfPrescription"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th className="border-b px-2 py-1 text-start">Time</th>
              <th className="border-b px-2 py-1 text-start">Doctor</th>
            </tr>
          </thead>
          <tbody>
            {sortedPrescriptions.map((prescription, index) => (
              <tr
                key={index}
                onClick={() => openModal(prescription)}
                className="hover:bg-gray-100 ease-in duration-50 cursor-pointer"
              >
                <td className="border-b px-5 py-5">{prescription.name}</td>
                <td className="border-b px-2 py-1">
                  {new Date(prescription.dateOfPrescription).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </td>
                <td className="border-b px-2 py-1">
                  {new Date(prescription.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="border-b px-2 py-1">
                  {prescription.doctorInformation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {isModalOpen && selectedPrescription && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-4 text-xl text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <div className="flex justify-center mb-2">
                  <img src={logo} className="w-40" />
                </div>
                <h2 className="font-semibold mt-1">JACINTO MARK O. DOE, M.D</h2>
                <p className="text-sm text-gray-700 italic">
                  General Doctor, St. Ignatius Medical Center
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800 border-t border-b py-4 mb-4">
                <div>
                  <h3 className="font-semibold text-base md:text-sm">
                    NAGA CITY
                  </h3>
                  <p className="break-words">St. Ignatius Medical</p>
                  <p>Naga City, 4400</p>
                  <p>Philippines</p>
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-sm">
                    CONTACT INFORMATION
                  </h3>
                  <p className="break-words">ignatiusmedicalcenter@gmail.com</p>
                  <p>0912 345 6789</p>
                  <p>2 123 456 78</p>
                </div>
              </div>

              <div className="flex mb-4 text-lg">
                <p className="flex items-center w-full justify-between">
                  <span className="font-semibold">Name:</span>
                  <span className="border-b border-gray-400 flex-grow text-center ml-2">
                    {selectedPrescription.name}
                  </span>
                </p>
                <p className="flex items-center w-full justify-between ml-6">
                  <span className="font-semibold">Age:</span>
                  <span className="border-b border-gray-400 flex-grow text-center ml-2">
                    {selectedPrescription.age}
                  </span>
                </p>
                <p className="flex items-center w-full justify-between ml-6">
                  <span className="font-semibold">Sex:</span>
                  <span className="border-b border-gray-400 flex-grow text-center ml-2">
                    {selectedPrescription.gender}
                  </span>
                </p>
              </div>

              {/* Rx and Medicine List */}
              {/**/}
              <div className="flex">
                <div>
                  <div className="text-3xl font-bold mr-6 text-gray-700">℞</div>
                  <div className="text-base space-y-2 ml-10">
                    {selectedPrescription.inscription.map((med, idx) => (
                      <div key={idx}>
                        <p>
                          {idx + 1}. {med.name} — {med.dosage}
                        </p>
                        <p>
                          Sig: {med.frequency}x/day, Quantity: {med.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 text-right text-sm">
                <p className="font-semibold">JACINTO MARK O. DOE, M.D</p>
                <p>
                  LICENSE NO. <span className="font-bold">123456</span>
                </p>
                <p>
                  PTR NO.{" "}
                  <span className="underline text-blue-600">7891011</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllPrescriptions;
