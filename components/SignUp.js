import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Password length validation
    return password.length >= 6;
  };

  const register = () => {
    setError(''); // Resetting any previous error
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert('Registered successfully');
        navigate('/Login');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div style={containerStyle}>
      <h1>Sign Up Page</h1>

      <div style={inputContainerStyle}>
        <label>Email:</label>
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div style={inputContainerStyle}>
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <button style={buttonStyle} onClick={register}>
        Sign up
      </button>

      <div style={linkContainerStyle}>
        <Link to="/Login">Already have an account? Login</Link>
      </div>
    </div>
  );
}

const containerStyle = {
  maxWidth: '400px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
};

const inputContainerStyle = {
  marginBottom: '20px',
};

const buttonStyle = {
  padding: '12px',
  width: '100%',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const linkContainerStyle = {
  textAlign: 'center',
  marginTop: '10px',
};

export default SignUp;
