import { useFormik } from "formik";
import React, { useState } from "react";
import { signUp } from "../../validation/Validation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

const RegFromComp = ({ toast }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      createNewUsers();
    },
    validationSchema: signUp,
  });

  const createNewUsers = () => {
    setLoading(true);
    createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(({ user }) => {
        updateProfile(auth.currentUser, {
          displayName: formik.values.fullName,
        }).then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              toast.success("Email sent for verification", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setTimeout(() => {
                navigate("/login");
              }, 2000);
              setLoading(false);
            })
            .catch((error) => {
              toast.error(error.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            });
        });
      })
      .catch((error) => {
        if (error.message.includes("auth/email-already-in-use")) {
          toast.error("Email already in use", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(false);
        }
      });
  };

  return (
    <>
      <div>
        <h1 className="font-fontBold text-xl mb-4 text-white">
          Registration for connect virtual meeting
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <input
            placeholder="enter your name"
            className="w-full px-3 py-2 border border-slate-400 rounded-md outline-none mb-3"
            name="fullName"
            onChange={formik.handleChange}
            type="text"
            value={formik.values.fullName}
          />
          {formik.errors.fullName && formik.touched.fullName && (
            <p className="font-fontRegular text-red-500 text-sm mb-5">
              {formik.errors.fullName}
            </p>
          )}
          <input
            placeholder="enter your email"
            className="w-full px-3 py-2 border border-slate-400 rounded-md outline-none mb-3"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="font-fontRegular text-red-500 text-sm mb-5">
              {formik.errors.email}
            </p>
          )}
          <input
            placeholder="enter your password"
            className="w-full px-3 py-2 border border-slate-400 rounded-md outline-none mb-3"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="font-fontRegular text-red-500 text-sm mb-5">
              {formik.errors.password}
            </p>
          )}
          <button
            disabled={loading}
            className="bg-slate-900 text-white font-fontBold text-base rounded-md w-full py-3"
          >
            {loading ? <BeatLoader color="#fff" size={5} /> : "Sign Up"}
          </button>
        </form>
        <p className="font-fontRegular text-base text-white mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-300 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegFromComp;
