import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";

const APOD = () => {
  const [apodData, setApodData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Initialize with current date

  useEffect(() => {
    fetchAPOD(selectedDate);
  }, [selectedDate]);

  const fetchAPOD = async (date) => {
    try {
      const apiKey = import.meta.env.VITE_NASA_API_KEY;
      const response = await axios.get("https://api.nasa.gov/planetary/apod", {
        params: {
          api_key: apiKey,
          date: date,
        },
      });
      setApodData(response.data);
    } catch (error) {
      console.error("Error fetching APOD:", error);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="bg-gray-100">
      <NavBar />
      <div className="py-12">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Astronomy Picture of the Day
          </h2>
          <div className="mb-4">
            <label htmlFor="date" className="mr-2 font-medium text-gray-700">
              Select Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={selectedDate}
              onChange={handleDateChange}
              max={new Date().toISOString().split("T")[0]}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {apodData ? (
            <div className="bg-white rounded-lg shadow-md">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2">
                  <img
                    src={apodData.url}
                    alt={apodData.title}
                    className="object-cover w-full h-auto"
                    style={{ minHeight: "300px", maxHeight: "500px" }}
                  />
                </div>
                <div className="flex-1 p-6">
                  <h3 className="mb-4 text-xl font-semibold text-gray-900">
                    {apodData.title}
                  </h3>
                  <p className="mb-6 text-gray-700">{apodData.explanation}</p>
                  <div className="flex flex-wrap mb-4 text-gray-700">
                    <div className="w-full lg:w-1/2">
                      <strong>Date:</strong> {apodData.date}
                    </div>
                    <div className="w-full lg:w-1/2">
                      <strong>Media Type:</strong> {apodData.media_type}
                    </div>
                  </div>
                  <p className="text-gray-700">
                    <strong>HD Image:</strong>{" "}
                    <a
                      href={apodData.hdurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View HD Image
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default APOD;
