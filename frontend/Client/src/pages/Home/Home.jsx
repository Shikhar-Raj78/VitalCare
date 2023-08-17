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
  return (
    <div>
      <div className="flex justify-center items-center mt-4 w-full">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full p-4">
          {images.map((image, index) => (
            <img
              key={index}
              className={`object-cover object-center rounded w-full ${
                index === currentImageIndex ? "block" : "hidden"
              }`}
              alt="hero"
              src={image}
            />
          ))}
        </div>
        <div className="w-1/2 ml-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Secure Your Health with VitalCare
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          At VitalCare, we offer comprehensive health insurance plans tailored to
          meet your needs and budget. Whether you’re looking for basic coverage
          or premium benefits, we’ve got you covered. Enjoy peace of mind with
          our reliable and affordable options.
        </p>
      </div>
      </div>
      <Stat></Stat>
      <Home_Plans></Home_Plans>
      <ClaimStat></ClaimStat>
      <ClaimNum></ClaimNum>
      <FreqAskQues></FreqAskQues>
    </div>
  );
};
