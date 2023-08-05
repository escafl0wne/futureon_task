import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import "./login.css"
const Login = () => {
    const navigate = useNavigate();
const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
    
  const handleLogin = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);

    if (isValid) {
        const authResponse = await axios.post("http://localhost:5012/api/v1/auth/login",{password,email},{headers:{"auth-token":password}})
        if(authResponse.status ===200){
            
            localStorage.setItem("auth",authResponse.data.body)
            navigate("/")
        }

        }
    
  };
//   if(auth) return <Navigate to="/"/>
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {!isEmailValid && <p className="error-message">Invalid email format</p>}
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" >Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login