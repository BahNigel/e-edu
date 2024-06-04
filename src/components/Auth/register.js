import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    address: "",
    city: "",
    region: "",
    zip: "",
    userType: "",
    profilePicture: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("access_token");
    if (token) {
      // Redirect to the index page if logged in
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    if (e.target.name === "profilePicture") {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("first_name", formData.firstName);
      formDataToSend.append("last_name", formData.lastName);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("region", formData.region);
      formDataToSend.append("zip", formData.zip);
      formDataToSend.append("user_type", formData.userType);
      if (formData.profilePicture) {
        formDataToSend.append("profile_picture", formData.profilePicture);
      }

      const registerResponse = await axios.post("http://localhost:8000/api/auth/register/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (registerResponse.status === 201) {
        // Registration successful, now login
        const loginResponse = await axios.post("http://localhost:8000/api/auth/login/", {
          username: formData.username,
          password: formData.password,
        });

        if (loginResponse.status === 200) {
          // Save the tokens to localStorage or state
          localStorage.setItem("access_token", loginResponse.data.access);
          localStorage.setItem("refresh_token", loginResponse.data.refresh);

          // Redirect the user to the index page after successful login
          navigate("/");
        } else {
          console.error("Login failed after registration");
        }
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("There was an error during registration or login!", error);
    }
  };

  return (
    <div style={{ backgroundColor: '#666666' }}>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder="1234 Main St"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="region">Region</label>
                  <input
                    type="text"
                    className="form-control"
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-2">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="userType">User Type</label>
                <select
                  id="userType"
                  name="userType"
                  className="form-control"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="profilePicture">Profile Picture</label>
                <input
                  type="file"
                  className="form-control"
                  id="profilePicture"
                  name="profilePicture"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                    name="gridCheck"
                    checked={formData.gridCheck}
                    onChange={(e) => setFormData({ ...formData, gridCheck: e.target.checked })}
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Sign in</button>
              <div className="login100-form-social flex-c-m">
                <h2><a href="/login">I have an account</a></h2>
              </div>
            </form>
            <div className="login100-more" style={{ backgroundImage: "url('/assets/img/bg-01.jpg')" }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
