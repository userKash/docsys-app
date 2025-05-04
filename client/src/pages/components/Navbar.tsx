import React, { useEffect, useState } from "react";

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
export default Navbar;
