import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterCard.css';

const RegisterCard = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", { 
                firstName, lastName, email, password 
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                alert("Registration Successful!");
                navigate("/account/login");  // Redirect to login page
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return ( 
        <div className="register__card__container">
            <div className="register__card">
                <div className="register__header">
                    <h1>Create Account</h1>
                </div>
                <form onSubmit={handleRegister} className="register__inputs">
                    <div className="fname__input__container reg__input__container">
                        <label className="fname__label input__label">First name</label>
                        <input 
                            type="text" 
                            className="fname__input register__input" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="lname__input__container reg__input__container">
                        <label className="lname__label input__label">Last name</label>
                        <input 
                            type="text" 
                            className="lname__input register__input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="email__input__container reg__input__container">
                        <label className="email__label input__label">Email</label>
                        <input 
                            type="email" 
                            className="email__input register__input" 
                            placeholder='example@gmail.com' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="password__input__container reg__input__container">
                        <label className="password__label input__label">Password</label>
                        <input 
                            type="password" 
                            className="password__input register__input" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className="register__button__container">
                        <button type="submit" className="register__button">Create Account</button>
                    </div>
                </form>
                <div className="register__other__actions">
                    <div className="register__login__account">Already have an account? <Link to="/account/login">Login</Link></div>
                </div>
            </div>
        </div>
    );
}

export default RegisterCard;
