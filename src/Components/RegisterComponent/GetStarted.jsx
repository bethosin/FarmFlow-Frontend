import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const GetStarted = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      adminCode: "",
    },

    validate: (values) => {
      const errors = {};
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if (!values.firstName) errors.firstName = "First name is required";
      if (!values.lastName) errors.lastName = "Last name is required";

      if (!values.email) {
        errors.email = "Email is required";
      } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }

      return errors;
    },

    onSubmit: (values) => {
      if (!role) {
        toast.error("Please select a role", {
          className: "toast-error",
        });
        return;
      }

      if (role === "ADMIN") {
        toast.info("Admin registration coming soon ", {
          className: "toast-error",
        });
        return;
      }

      const userData = {
        ...values,
        role,
      };

      axios
        .post(
          "https://farmflow-backend-aizi.onrender.com/api/auth/register",
          userData,
        )
        .then((res) => {
          if (res.data.message === "Account created successfully") {
            toast.success("Account created! Redirecting...", {
              className: "toast-success",
            });
            setTimeout(() => navigate("/login"), 2000);
          } else {
            toast.error(res.data.message || "Registration failed", {
              className: "toast-error",
            });
          }
        })
        .catch(() => {
          toast.error("Something went wrong. Please try again.", {
            className: "toast-error",
          });
        });
    },
  });

  return (
    <section className="min-vh-100 d-flex align-items-center bg-light my-5">
      <div className="container">
        <div className="row g-0 shadow-lg rounded-4 overflow-hidden">
          {/* IMAGE SIDE */}
          <div
            className="col-lg-6 d-none d-lg-flex align-items-center"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/1200x/1d/10/10/1d1010828eb8f6611ce931a2e0a8323c.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(4px)",
              }}
            />
            <div className="position-relative text-white p-5">
              <h2 className="fw-bold mb-3">
                Join the Future of Agricultural Trade
              </h2>
              <p className="opacity-75">
                Connect farmers, buyers, and transporters on one platform.
              </p>
            </div>
          </div>

          {/* FORM SIDE */}
          <div className="col-lg-6 bg-white p-4 p-md-5">
            <div className="text-center mb-4">
              <h1 className="fw-bold">Create an Account</h1>
              <p className="text-muted">
                Join FarmFlow and start connecting today.
              </p>
            </div>

            {/* ROLE SELECTION */}
            <div className="mb-4">
              <label className="form-label fw-semibold">I am a:</label>
              <div className="row g-3">
                {[
                  { key: "FARMER", label: "Farmer", icon: "🌾" },
                  { key: "BUYER", label: "Buyer", icon: "🛒" },
                  { key: "TRANSPORTER", label: "Transporter", icon: "🚚" },
                  { key: "ADMIN", label: "Admin", icon: "🛡️" },
                ].map((item) => (
                  <div className="col-6 col-md-3" key={item.key}>
                    <button
                      type="button"
                      onClick={() => setRole(item.key)}
                      className={`btn w-100 py-3 ${
                        role === item.key
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      }`}
                    >
                      <div className="fs-3">{item.icon}</div>
                      <small>{item.label}</small>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={formik.handleSubmit}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className={`form-control mb-3 ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="invalid-feedback mb-2">
                  {formik.errors.firstName}
                </div>
              )}

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={`form-control mb-3 ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="invalid-feedback mb-2">
                  {formik.errors.lastName}
                </div>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`form-control mb-3 ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback mb-2">
                  {formik.errors.email}
                </div>
              )}

              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`form-control mb-3 ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback mb-2">
                  {formik.errors.password}
                </div>
              )}

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className={`form-control mb-3 ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="invalid-feedback mb-2">
                  {formik.errors.confirmPassword}
                </div>
              )}

              {role === "ADMIN" && (
                <input
                  type="text"
                  name="adminCode"
                  placeholder="Admin Code"
                  className="form-control mb-3"
                  onChange={formik.handleChange}
                />
              )}

              <button type="submit" className="btn btn-primary btn-lg w-100">
                Create Account
              </button>
            </form>

            <div className="text-center small mt-3">
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold text-green">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
