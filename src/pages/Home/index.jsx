import React, { useCallback, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { LogeOutUser } from "../../features/Slices/LoginSlice";
import { useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";

const HomePage = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  // Function to generate a room name like 'xft-acpn-yim'
  const generateRoomName = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

    // Function to generate a random segment of specified length
    const getRandomSegment = (length) => {
      let segment = "";
      for (let i = 0; i < length; i++) {
        const randomChar = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        segment += randomChar;
      }
      return segment;
    };

    // Generate three segments: first (3 chars), middle (4 chars), last (3 chars)
    return `${getRandomSegment(3)}-${getRandomSegment(4)}-${getRandomSegment(
      3
    )}`;
  };

  // Automatically set room name when the component mounts
  useEffect(() => {
    setValue(generateRoomName());
  }, []);

  const handleJoinRoom = useCallback(() => {
    navigate(`/room/${value}`);
  }, [navigate, value]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        localStorage.removeItem("user");
        dispatch(LogeOutUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Helmet>
        <title>Virtue Meet</title>
      </Helmet>
      <div
        style={{
          background: 'url("/images/cover.jpg")',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="w-full h-screen bg-red-500"
      >
        <div className="text-right pt-5 pr-5">
          <button
            className="px-6 py-2 bg-blue-400 rounded-md font-sans text-white text-sm font-semibold"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
        <div className="flex items-center justify-center w-full h-full">
          <div className=" w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[40%] rounded-md bg-white bg-opacity-20 p-4 backdrop-blur-md shadow-lg">
            <div className="w-[20%] mx-auto rounded-full overflow-hidden">
              <img
                src="/images/callavatar.webp"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-2/3 2xl:w-[90%] 4xl:w-2/3 md:flex items-center justify-between mx-auto mt-5">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter Room Name"
                className="bg-transparent text-white font-sans border border-white placeholder:text-white outline-none w-full md:w-[70%] lg:w-[75%] rounded-md px-3 py-4"
              />
              <button
                onClick={handleJoinRoom}
                disabled={!value}
                className="px-5 py-3 mt-3 md:mt-0 md:py-4 w-full md:w-auto bg-blue-400 rounded-md font-sans text-white font-semibold"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
