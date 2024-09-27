import React, { useState } from 'react';
import { mockApi } from '../mockApi';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const response = mockApi.register(username, password);
        if (response.success) {
            alert('Registration successful!');
            setUsername('');
            setPassword('');
            setError('');
        } else {
            setError(response.message);
        }
    };

    return (
        <div className='registeration-container'>

            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
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
                <button type="submit">Register</button>
            </form>
            <p>
                Already registered? <a href="/login">Take me to Login</a>
            </p>
        </div>
    );
};

export default Registration;
