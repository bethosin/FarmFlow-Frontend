import React, { useContext } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../../AuthContext.jsx";

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values) => {
      const errors = {};
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

      if (!values.email) {
        errors.email = "Email is required";
      } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    },

    onSubmit: (values) => {
      axios
        .post(
          "https://farmflow-backend-aizi.onrender.com/api/auth/login",
          values,
        )
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          login(res.data.user, res.data.token);

          toast.success("Login successful!", {
            className: "toast-success",
          });

          setTimeout(() => navigate("/dashboard"), 2000);
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Login failed", {
            className: "toast-error",
          });
        });
    },
  });

  return (
    <section className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row g-0 shadow-lg rounded-4 overflow-hidden">
          {/* IMAGE SIDE */}
          <div
            className="col-lg-6 d-none d-lg-flex align-items-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6')",
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
              <h2 className="fw-bold mb-3">Welcome Back</h2>
              <p className="opacity-75">
                Access your dashboard, manage listings, and stay connected to
                the agricultural marketplace.
              </p>
            </div>
          </div>

          {/* FORM SIDE */}
          <div className="col-lg-6 bg-white p-4 p-md-5">
            <div className="text-center mb-4">
              <h1 className="fw-bold text-green">Sign In</h1>
              <p className="text-muted">
                Login to continue managing your activities on FarmFlow.
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label
                    className="form-check-label small"
                    htmlFor="rememberMe"
                  >
                    Remember me
                  </label>
                </div>

                <Link to="/forgot-password" className="small text-green">
                  Forgot password?
                </Link>
              </div>

              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary btn-lg">
                  Login
                </button>
              </div>
            </form>

            <div className="text-center small">
              Don’t have an account?{" "}
              <Link to="/register" className="fw-semibold text-green">
                Create one
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
