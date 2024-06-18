import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store token in local storage
      alert('Login successful!');
      console.log(data); // Optionally log response data

      // Fetch the user's role
      const roleResponse = await fetch('http://localhost:3000/api/users/role', {
        headers: {
          'x-auth-token': data.token,
        },
      });

      if (!roleResponse.ok) {
        throw new Error('Failed to fetch user role');
      }

      const roleData = await roleResponse.json();

      // Redirect based on user role
      if (roleData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/vote');
      }
    } catch (error) {
      alert(error.message || 'Login failed. Please check your credentials.');
      console.error(error); // Log error for debugging
    }
  };

  // Function to handle navigation to home page
  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>
              <button
                className="btn btn-link position-absolute top-0 end-0 m-3"
                onClick={goToHomePage}
              >
                Go to Home Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
