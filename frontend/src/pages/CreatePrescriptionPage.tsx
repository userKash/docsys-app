import React, { useEffect, useState } from "react";

// icons
import dashboard from "../assets/icons/dashboard.svg";
import prescription from "../assets/icons/prescriptions.svg";
import settings from "../assets/icons/settings.svg";
import help from "../assets/icons/help.svg";
import add from "../assets/icons/add.svg";
import write from "../assets/icons/write.svg";

// images
import logo from "../assets/ignatius-logo.svg";

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
        href=""
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

const CreatePrescriptionPage: React.FC = () => {
  return (
    <div className="min-h-screen font-inter">
      <Sidebar />
      <Navbar />

      <main className="ml-[300px] pt-28 justify-center h-full px-8">
        <h2 className="text-lg font-semibold text-[#0077B6] mb-6">
          Patient Details
        </h2>

        <div className="flex flex-col gap-4">
          {/* Patient & Prescription Info */}
          <div className="flex flex-wrap justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              <div>
                <div className="font-bold text-lg">John Foe</div>
                <div className="text-sm">Age: 32</div>
                <div className="text-sm">Gender: Male</div>
              </div>
            </div>
            <div className="text-sm flex flex-col gap-1">
              <div>
                Prescription Date:{" "}
                <span className="font-medium">January 20, 2025</span>
              </div>
              <div>
                Prescription Type: <span className="font-medium">Common</span>
              </div>
            </div>
          </div>

          {/* Main Form Section */}
          <div className="flex flex-wrap gap-4 mt-4">
            {/* Left Form Inputs */}
            <div className="flex flex-col flex-1 min-w-[280px] gap-4 bg-[#f9f9f9] p-4 rounded border">
              <div>
                <label className="font-semibold text-sm ">
                  Symptoms/Diagnosis <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Diagnosis here"
                  className="w-full mt-1 border rounded p-2 h-24 resize-none text-sm"
                />
              </div>
              <div>
                <label className="font-semibold text-sm">
                  Subscription <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full mt-1 border rounded p-2 text-sm"
                />
              </div>
              <div>
                <label className="font-semibold text-sm">
                  Instructions <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full mt-1 border rounded p-2 text-sm"
                />
              </div>
              <button className="bg-[#0077B6] hover:bg-[#005f8f] text-white font-medium py-2 rounded text-sm mt-2">
                Generate Prescription
              </button>
            </div>

            {/* Inscription Section */}
            <div className="bg-[#f9f9f9] p-4 rounded border w-full max-w-md flex-1">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Inscription</h3>
                <button className="w-6 h-6 rounded-full border-[#000] text-white text-sm flex items-center justify-center">
                  <img src={add} alt="" />
                </button>
              </div>
              <div className="text-sm">
                <div className="flex justify-between font-semibold border-b pb-1 mb-1">
                  <span className="font-medium">Drug Name</span>
                  <span className="font-medium">Frequency</span>
                  <span className="font-medium">Quantity</span>
                </div>
                <div className="flex justify-between">
                  <span>Paracetamol</span>
                  <span>x2</span>
                  <span>3</span>
                </div>
              </div>
            </div>

            {/* Doctor's Info */}
            <div className="bg-[#f9f9f9] p-4 rounded border w-full max-w-xs flex-1">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-sm">Doctor's Information</h3>
                <button className="w-5 h-5 rounded-full bg-gray-200 text-xs flex items-center justify-center">
                  <img src={write} alt="" />
                </button>
              </div>
              <div className="text-sm">
                <div className="font-medium">Dr. Mark Doe, MD</div>
                <div className="text-gray-600">2025-01234502</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatePrescriptionPage;
