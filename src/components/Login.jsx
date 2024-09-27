import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../mockApi';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const response = mockApi.login(username, password);
        if (response.success) {
            const userData = { username };
            onLogin(userData);
            setUsername('');
            setPassword('');
            setError('');
            navigate('/tasks');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className='login-container'>

            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p>{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <a href="/register">Go to Register</a>
            </p>
        </div>

    );
};

export default Login;
