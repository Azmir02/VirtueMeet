import React from "react";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import RegFromComp from "../../components/Registration";

const RegistrationPage = () => {
  return (
    <div>
      <>
        <Helmet>
          <title>Registration</title>
        </Helmet>
        <ToastContainer />
        <div
          style={{
            background: 'url("/images/cover.jpg")',
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="w-full flex items-center justify-center min-h-screen lg:h-screen bg-red-500"
        >
          <div className="w-[25%] rounded-md bg-white bg-opacity-20 p-4 backdrop-blur-md shadow-lg">
            <RegFromComp toast={toast} />
          </div>
        </div>
      </>
    </div>
  );
};

export default RegistrationPage;
