// // Updated code

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import background from "../assets/home4.png";

const Start = () => {
  const [loading, setLoading] = useState(true);
  const title = "QuickRickshaw"; 

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // Animation Variants 
  const letterVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: { delay: index * 0.1, duration: 0.2 }
    }),
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {loading ? (
        <div className="preloader flex flex-col items-center justify-center w-full h-full bg-black">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold flex">
            {title.split("").map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </div>
      ) : (
        <div
          className="bg-cover bg-center h-screen w-full pt-7 flex flex-col justify-between"
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Wrapper to push the content to the bottom */}
          <div className="flex-grow"></div>

          {/* Get Started Section Fixed at Bottom */}
          <div className="bg-white pb-8 py-4 px-4 w-[90%] max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-lg shadow-lg mb-5">
            <h2 className="text-[24px] md:text-[28px] lg:text-[30px] font-semibold text-center">
              Get Started with QuickRickshaw
            </h2>
            <Link to="/login" className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5">
              Continue
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Start;





