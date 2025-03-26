import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginCard.css';

const LoginCard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    localStorage.setItem("email",email);
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                alert("Login Successful!");
                navigate("/");  // Redirect to dashboard after login
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return ( 
        <div className="login__card__container">
            <div className="login__card">
                <div className="login__header">
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleLogin} className="login__inputs">
                    <div className="email__input__container input__container">
                        <label className="email__label input__label">Email</label>
                        <input 
                            type="email" 
                            className="email__input login__input" 
                            placeholder='example@gmail.com' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="password__input__container input__container">
                        <label className="password__label input__label">Password</label>
                        <input 
                            type="password" 
                            className="password__input login__input" 
                            placeholder='**********'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className="login__button__container">
                        <button type="submit" className="login__button">LOGIN</button>
                    </div>
                </form>
                <div className="login__other__actions">
                    <div className="login__forgot__password">Forgot password?</div>
                    <div className="login__new__account">Don't have an account? <Link to="/account/register">Create account</Link></div>
                </div>
            </div>
        </div>
    );
}

export default LoginCard;
