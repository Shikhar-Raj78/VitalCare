import React, { useEffect, useState } from "react";
import Stat from "../../components/stat/Stat";
import { Home_Plans } from "../../components/home_plans/Home_Plans";
import { ClaimNum } from "../../components/claimnum/ClaimNum";
import { ClaimStat } from "../../components/claimstat/claimstat";
import { FreqAskQues } from "../../components/freqaskques/FreqAskQues";


export const Home = () => {
  const images = [
    "https://www.starhealth.in/_next/image/?url=https%3A%2F%2Fd28c6jni2fmamz.cloudfront.net%2FIB_212544_212544115839217_SM_759742_2f536d6159.jpg&w=640&q=75",
    "https://www.starhealth.in/_next/image/?url=https%3A%2F%2Fd28c6jni2fmamz.cloudfront.net%2Fodisha_v1_1a4f1850fc.png&w=640&q=75",
    "https://www.starhealth.in/_next/image/?url=https%3A%2F%2Fd28c6jni2fmamz.cloudfront.net%2FG20_image_b858836ae8.jpg&w=640&q=75",
    "https://www.starhealth.in/_next/image/?url=https%3A%2F%2Fd28c6jni2fmamz.cloudfront.net%2FIB_212544_212544115616583_SM_742722_dfc2e6d14d.jpg&w=640&q=75",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);
  const getQuote = async(e) => {
    e.preventDefault()
  }
  return (
    <div>
      <div className="flex ml-4 mt-4 w-auto">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-10/6 ml-10 mt-10">
          {images.map((image, index) => (
            <img
              key={index}
              className={`object-cover object-center rounded ${
                index === currentImageIndex ? "block" : "hidden"
              }`}
              alt="hero"
              src={image}
            />
          ))}
        </div>
        <div className="flex justify-center items-center w-full h-120">
          <div className="bg-green-100 h-auto w-auto rounded-md">
            <form onSubmit={getQuote} className="flex flex-col gap-y-2 p-4 m-8 mt-10">
              <span>
                Get Health Insurance Quote
              </span>
              <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
              <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
              <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone Number" required />
              <button className="bg-green-900 rounded-md text-white h-10">Get a quote</button>
            </form>
          </div>
        </div>
      </div>
      <Stat></Stat>
      <Home_Plans>
      </Home_Plans>
      <ClaimStat></ClaimStat>
      <ClaimNum></ClaimNum>
      <FreqAskQues></FreqAskQues>
    </div>
  );
};
