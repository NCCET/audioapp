import { useState, useRef } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import Avatar from 'react-avatar';
import Icons8 from './images/icons8-google-48.png';
import Facebook from './images/icons8-facebook-48.png';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const rememberMeRef = useRef();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = () => {
    setError('');
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        alert('Login successful');
        navigate('/home');
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div>

      <div style={contentWrapperStyle}>
        <div style={avatarContainerStyle}>
          <Avatar name="John Doe" size="120" round={true} style={avatarStyle} />
        </div>

        <h1 style={{ marginBottom: '20px', textAlign: 'center', color: 'white' }}>Login</h1>

        <div style={inputContainerStyle}>
          <label>Email:</label>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div style={socialLoginContainerStyle}>
  <button onClick={handleGoogleLogin}>
    <img
      src={Icons8}
      alt="Google Logo"
         style={{ width: '30px', marginRight: '10px' }}
     />
    
  </button>
  <button onClick={handleFacebookLogin}>
     <img
      src={Facebook}
      alt="Facebook Logo"
      style={{ width: '30px', marginRight: '10px' }}
      />
    
  </button>
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

        {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}

        <button style={buttonStyle} onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div style={linkContainerStyle}>
          <Link to="/forgotPassword" style={{ color: '#4CAF50' }}>
            Forgot Password?
          </Link>
          <Link to="/register" style={{ color: '#4CAF50' }}>
            Don't have an account? Sign Up
          </Link>
        </div>

        <label>
          <input type="checkbox" ref={rememberMeRef} />
          Remember Me
        </label>
      </div>
    </div>
  );
}

// Styles

const containerStyle = {
  position: 'relative',
  maxWidth: '400px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
};

const backgroundStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'url("your-background-image-url.jpg")',
  backgroundSize: 'cover',
  filter: 'blur(5px)',
};

const contentWrapperStyle = {
  position: 'relative',
  zIndex: 1,
};

const avatarContainerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const avatarStyle = {
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2px solid #4CAF50',
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
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
};

const socialLoginContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '10px',
};

export default Login;
