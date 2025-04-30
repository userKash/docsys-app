import React, { useState, useEffect  } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../contexts/UserContext";
// icons
import dashboard from "../assets/icons/dashboard.svg";
import prescription from "../assets/icons/prescriptions.svg";
import settings from "../assets/icons/settings.svg";
import help from "../assets/icons/help.svg";
import redirect from "../assets/icons/redirect.svg";
import link from "../assets/icons/link.svg";
import hospitalIcon from "../assets/icons/hospital-icon.svg";
import recent from "../assets/icons/recent-prescriptions.svg";
// images
import logo from "../assets/ignatius-logo.svg";
import blank from "../assets/blank-prescription.svg";
import template from "../assets/template-prescription.svg";


const PrescriptionModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [patientType, setPatientType] = useState<"new" | "existing" | null>(
    null
  );
  const [formData, setFormData] = useState({ name: "", age: "", gender: "" });

  const handlePatientType = (type: "new" | "existing") => {
    setPatientType(type);
    setStep(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchPatient = () => {
    // redirect to another page (simulate)
    alert("Redirecting to patient details page...");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md w-[100%] font-inter"
        >
          <div className="mb-4 text-sm text-gray-600">
            Step {step + 1} of 2
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className={`h-2 rounded-full ${
                  step === 0 ? "w-1/2 bg-blue-400" : "w-full bg-blue-600"
                }`}
              ></div>
            </div>
          </div>

          {step === 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Write a prescription for:
              </h2>
              <div className="flex gap-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handlePatientType("new")}
                >
                  New Patient
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handlePatientType("existing")}
                >
                  Existing Patient
                </button>
              </div>
            </div>
          )}

          {step === 1 && patientType === "new" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                New Patient Details
              </h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded"
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Write Prescription
              </button>
            </div>
          )}

          {step === 1 && patientType === "existing" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Search Existing Patient
              </h2>
              <input
                type="text"
                placeholder="Search by name or ID"
                className="w-full mb-4 p-2 border rounded"
              />
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                onClick={handleSearchPatient}
              >
                Write Prescription
              </button>
            </div>
          )}

          <button
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
            onClick={onClose}
          >
            Cancel
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Sidebar: React.FC = () => (
  <div className="w-64 h-screen text-[#404040] border fixed top-0 left-0 flex flex-col p-4 font-inter">
    <img src={logo} className="w-40" />

    <div className="flex mb-8 flex-col p-1 mt-10">
      <h1 className="text-l font-bold">Dr. User</h1>
      <div className="text-sm">Doctor</div>
    </div>

    <nav className="space-y-2">
      <h2 className="font-semibold text-[#0077B6]">MAIN</h2>
      <a
        href="#"
        className="flex gap-2 items-center  font-medium hover:bg-gray-100 p-1 rounded block"
      >
        <img src={dashboard} alt="" />
        Dashboard
      </a>
      <a
        href="#"
        className=" flex gap-2 items-center  font-medium hover:bg-gray-100 p-1 rounded block"
      >
        <img src={prescription} alt="" />
        Prescriptions
      </a>
    </nav>

    <nav className="space-y-2 mt-5">
      <h2 className="font-semibold text-[#0077B6]">SUPPORT</h2>
      <a
        href="#"
        className="flex gap-2 items-center  font-medium hover:bg-gray-100 p-1 rounded block "
      >
        <img src={help} alt="" />
        Help Center
      </a>
      <a
        href="#"
        className="flex gap-2 items-center font-medium hover:bg-gray-100 p-1 rounded block"
      >
        <img src={settings} alt="" />
        Settings
      </a>
    </nav>
  </div>
);

const Navbar: React.FC = () => {
  const [dateTime, setDateTime] = useState<string>("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = now.toLocaleDateString(undefined, options);

      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      const formattedTime = `${hours}:${minutes} ${ampm}`;
      setDateTime(`Date: ${formattedDate} Time: ${formattedTime}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-10">
      <div className="text-sm text-gray-600 whitespace-nowrap">
        Date:{" "}
        <span className="font-semibold ">
          {dateTime.split("Date: ")[1]?.split(" Time:")[0]}
        </span>{" "}
        Time:{" "}
        <span className="font-semibold">{dateTime.split("Time: ")[1]}</span>
      </div>
    </div>
  );
};

const formatName = (fullName: string) => {
  if (!fullName) return "";

  const parts = fullName.trim().split(/\s+/); // Split by spaces
  const filteredParts: string[] = [];

  parts.forEach((part, index) => {
    const cleanPart = part.replace(/[^a-zA-Z]/g, ""); // Remove dots, commas, etc.
    if (index === 0) {
      filteredParts.push(part); // Always keep first name
    } else if (cleanPart.length > 1) {
      filteredParts.push(part); // Keep only real words
    }
    // Skip if cleanPart is 1 letter (initials)
  });

  return filteredParts.join(" ");
};



const HomePage: React.FC = () => {
  const { name } = useUser();
  const [greeting, setGreeting] = useState<string>("Good Morning");

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }  }, []);
  const [showModal, setShowModal] = useState(false);
  const dummyPrescriptions = [
    {
      name: "John Doe",
      date: "April 17, 2025",
      type: "Antibiotic",
      status: "Active",
    },
    {
      name: "Jane Smith",
      date: "April 15, 2025",
      type: "Painkiller",
      status: "Completed",
    },
    {
      name: "Alice Johnson",
      date: "April 10, 2025",
      type: "Vitamin",
      status: "Pending",
    },
    {
      name: "Bob Brown",
      date: "April 9, 2025",
      type: "Antidepressant",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen font-inter">
      <Sidebar />
      <Navbar />

      <main className="ml-[300px] pt-28 justify-center h-full">
        {/* main */}
        <div className="flex justify-between">
          <div className="w-[100%]">
            <div className="mb-5">
            <h1 className="text-2xl font-medium mb-1 text-[#0077B6]">
              {greeting}, Dr. {formatName(name) || "User"}!
            </h1>
              <p className="text-gray-500">Have a great and productive day</p>
            </div>

            <div>
              <span className="text-sm text-[#404040]">
                Write a new prescription
              </span>
              <div className="flex gap-6 mt-2">
                <div
                  className="flex flex-col items-center "
                  onClick={() => setShowModal(true)}
                >
                  <img
                    src={blank}
                    alt=""
                    className="mb-2 h-30 shadow-sm cursor-pointer hover:transform hover:scale-105 transition"
                  />
                  <span>New Prescription</span>
                </div>
                <div
                  className="flex flex-col items-center "
                  onClick={() => setShowModal(true)}
                >
                  <img
                    src={template}
                    alt=""
                    className="mb-2 h-30 shadow-sm cursor-pointer hover:transform hover:scale-105 transition"
                  />
                  <span>Acute Illness</span>
                </div>
                <div
                  className="flex flex-col items-center "
                  onClick={() => setShowModal(true)}
                >
                  <img
                    src={template}
                    alt=""
                    className="mb-2 h-30 shadow-sm cursor-pointer hover:transform hover:scale-105 transition"
                  />
                  <span>Chronic Condition</span>
                </div>
              </div>
            </div>

            {/* Recent Prescriptions */}
            <div className="mt-10 flex justify-between">
              <div className="flex gap-2 items-center mb-3">
                <img src={recent} alt="" />
                <h1 className="text-m font-semibold text-[#0077B6]">
                  Recent Prescriptions
                </h1>
              </div>
              <a className="flex gap-1 items-center mb-3 cursor-pointer">
                <h1 className="text-sm font-medium text-[#1F4276]">View all</h1>
                <img src={redirect} className="h-4" alt="" />
              </a>
            </div>
            <table className="w-full mt-2 text-sm text-left border-collapse">
              <thead className="border-b-2 border-[#D7D7D7]">
                <tr className=" text-[#000000]">
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">
                    Date of Prescription
                  </th>
                  <th className="px-4 py-2 font-medium">Prescription Type</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {dummyPrescriptions.map((prescription, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="px-4 py-2">{prescription.name}</td>
                    <td className="px-4 py-2">{prescription.date}</td>
                    <td className="px-4 py-2">{prescription.type}</td>
                    <td className="px-4 py-2">{prescription.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* aside */}
          <div className="flex flex-col gap-1 mx-10">
            <div className="px-5  w-[400px] bg-white rounded-lg">
              <div className="flex gap-2 items-center">
                <img src={link} alt="" />
                <h1 className="text-m font-semibold text-[#002E4F]">
                  Quick Access
                </h1>
              </div>

              <span className="text-[12px] text-[#404040] mb-5 text-wrap">
                A collection of shortcuts
              </span>

              <div className="flex gap-2">
                <a
                  href="#"
                  className="flex gap-2 items-center bg-gray-50 hover:bg-gray-100 p-1 rounded block"
                >
                  <span className="text-[#1F4276] text-sm font-medium">
                    Write Prescription
                  </span>
                  <img src={redirect} alt="" />
                </a>
                <a
                  href="#"
                  className="flex gap-2 items-center bg-gray-50  hover:bg-gray-100 p-1 rounded block"
                >
                  <span className="text-[#1F4276] text-sm font-medium">
                    All Prescriptions
                  </span>
                  <img src={redirect} alt="" />
                </a>
              </div>
            </div>

            <div className="p-5  w-[400px] bg-white rounded-lg">
              <div className="flex gap-2 items-center mb-3">
                <img src={hospitalIcon} alt="" className="-mx-2" />
                <h1 className="text-m font-semibold text-[#002E4F]">
                  Hospital Hotlines
                </h1>
              </div>
              <div className="flex gap-2 items-center mb-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-semibold">
                    NURSE STATION 1
                  </span>
                  <span className="text-[12px] font-medium">(51) 472-4025</span>
                </div>
              </div>
              <div className="flex gap-2 items-center mb-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-semibold">
                    NURSE STATION 2
                  </span>
                  <span className="text-[12px] font-medium">(51) 472-4025</span>
                </div>
              </div>
              <div className="flex gap-2 items-center mb-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-semibold">
                    NURSE STATION 3
                  </span>
                  <span className="text-[12px] font-medium">(51) 472-4025</span>
                </div>
              </div>
              <span className="text-[12px]">
                © 2025 St. Ignatius Medical Center, Ateneo Avenue, Naga City,
                4400 Philippines
              </span>
            </div>
          </div>
        </div>
      </main>

      {showModal && <PrescriptionModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default HomePage;
