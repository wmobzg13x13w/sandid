import { useState } from "react";
import AuthService from "../services/AuthService";

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    if (isRegistering) {
      // Register new user
      const result = AuthService.registerUser(username, password);
      if (result.success) {
        // Auto login after registration
        AuthService.loginUser(username, password);
        onLogin(result.user);
      } else {
        setError(result.message);
      }
    } else {
      // Login existing user
      const result = AuthService.loginUser(username, password);
      if (result.success) {
        onLogin(result.user);
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className='login-container'>
      <h1>{isRegistering ? "Register" : "Login"}</h1>

      {error && <div className='error-message'>{error}</div>}

      <form onSubmit={handleSubmit} className='login-form'>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter username'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password'
          />
        </div>

        <button type='submit' className='login-button'>
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>

      <div className='toggle-form'>
        <p>
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}
          <button
            type='button'
            className='toggle-button'
            onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
