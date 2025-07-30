import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
  const [pumpStatus, setPumpStatus] = useState("OFF");
  const [valveStatus, setValveStatus] = useState("ON");

  const fetchStatus = () => {
    axios
      .get("https://xay45gts6j.execute-api.ap-south-1.amazonaws.com/Sohail_function")
      .then((response) => {
        // Update based on your API response structure
        setPumpStatus(response.data.pump || "OFF");
        setValveStatus(response.data.valve || "OFF");
      })
      .catch((error) => {
        console.error("Error fetching status:", error);
      });
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const StatusSwitch = ({ label, status }) => {
    const isOn = status === "ON";
    return (
      <div className="flex justify-between items-center py-3">
        <span className="text-gray-800">{label} ({status})</span>
        <div
          className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
            isOn ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <div
            className={`absolute left-0 right-0 mx-auto flex justify-center items-center w-5 h-5 text-white text-sm font-bold ${
              isOn ? "translate-x-6" : "translate-x-0"
            } transition-transform duration-300`}
          >
            {isOn ? "✅" : "❌"}
          </div>
          <div className="w-5 h-5 rounded-full bg-white shadow-md transition-transform" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div
        className="bg-white rounded-xl shadow-lg w-80 p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">▾ Control Panel</h2>

        <div className="mb-4 border-t border-gray-300 pt-2">
          <h3 className="text-md font-bold text-gray-600">Pumps</h3>
          <StatusSwitch label="C" status={pumpStatus} />
        </div>

        <div className="border-t border-gray-300 pt-2">
          <h3 className="text-md font-bold text-gray-600">Valves</h3>
          <StatusSwitch label="DDS Hostel" status={valveStatus} />
        </div>

        <motion.button
          onClick={fetchStatus}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 Refresh Status
        </motion.button>
      </motion.div>
    </div>
  );
}

export default App;








