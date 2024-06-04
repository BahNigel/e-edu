import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      navigate('/'); // Redirect to the home page or dashboard if already logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login/', {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        // Store tokens in local storage
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        // Redirect to the home page or dashboard
        navigate('/');
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ backgroundColor: '#666666' }}>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form" onSubmit={handleSubmit}>
              <span className="login100-form-title p-b-43">
                Login to continue
              </span>

              {error && <div className="error-message">{error}</div>}

              <div className="wrap-input100 validate-input" data-validate="Valid username is required">
                <input
                  className="input100"
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Username</span>
              </div>

              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <input
                  className="input100"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Password</span>
              </div>

              <div className="flex-sb-m w-full p-t-3 p-b-32">
                <div className="contact100-form-checkbox">
                  <input className="input-checkbox100" id="rememberMe" type="checkbox" name="rememberMe" />
                  <label className="label-checkbox100" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>

                <div>
                  <a href="#" className="txt1">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">
                  Login
                </button>
              </div>

              <div className="login100-form-social flex-c-m">
                <h2><a href="/register">I don't have an account</a></h2>
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

export default Login;
