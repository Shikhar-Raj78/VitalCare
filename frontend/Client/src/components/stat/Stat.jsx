import React, { useEffect, useState, useRef } from "react";
import hosp from "../../assets/hosp.jpg";

const Stat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [downloads, setDownloads] = useState(0);
  const [users, setUsers] = useState(0);
  const [files, setFiles] = useState(0);
  const [places, setPlaces] = useState(0);

  const statRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const rect = statRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight;
      setIsVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let interval;
    if (isVisible) {
      interval = setInterval(() => {
        setDownloads((prevDownloads) => {
          const newDownloads = prevDownloads + 10;
          return newDownloads >= 20 ? 20 : newDownloads;
        });

        setUsers((prevUsers) => {
          const newUsers = prevUsers + 5;
          return newUsers >= 1000 ? 1000 : newUsers;
        });

        setFiles((prevFiles) => {
          const newFiles = prevFiles + 1;
          return newFiles >= 4.5 ? 4.5 : newFiles;
        });

        setPlaces((prevPlaces) => {
          const newPlaces = prevPlaces + 1;
          return newPlaces >= 95 ? 95 : newPlaces;
        });
      }, 0);
    }

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div ref={statRef} className="bg-gray-50 py-14">
      <section className="container mx-auto px-5">
        <div className="text-center mb-10">
          <h5 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">
            Why VitalCare?
          </h5>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-green-500 w-12 h-12 mx-auto mb-4">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-full h-full"
                viewBox="0 0 24 24"
              >
                <path d="M8 17l4 4 4-4m-4-5v9" />
                <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-gray-800">
              {downloads} M
            </h2>
            <p className="text-gray-600">Lives covered since inception</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={hosp}
              alt="Hospital Icon"
              className="w-12 h-12 mx-auto mb-4"
            />
            <h2 className="text-3xl font-semibold text-gray-800">{users} +</h2>
            <p className="text-gray-600">Network Hospitals across India</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-green-500 w-12 h-12 mx-auto mb-4">
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2l3.09 6.61 7.02.96-5.06 4.94 1.19 7.01L12 17.27l-6.24 3.26 1.19-7.01L1.89 9.57l7.02-.96L12 2z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-gray-800">
              {files} Rating
            </h2>
            <p className="text-gray-600">Based on 100000 User reviews</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-green-500 w-12 h-12 mx-auto mb-4">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-full h-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-gray-800">{places} %</h2>
            <p className="text-gray-600">Cashless claims settled in 1 hour</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stat;
