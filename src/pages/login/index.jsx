import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet-async";
import LoginFromComp from "../../components/Login";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login</title>
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
        <div className="w-[25%] bg-white bg-opacity-20 p-4 backdrop-blur-md shadow-lg">
          <LoginFromComp toast={toast} />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
