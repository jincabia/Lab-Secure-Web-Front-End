    'use client'
    import { useState } from 'react';

    const LoginForm = ({ onLogin }) => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');

        const handleSubmit = async (event) => {
            event.preventDefault();

            // Input validation
            if (!username || !password) {
                setError('Username and password are required');
                return;
            }

            try {
                // Do a login request
                const response = await fetch('http://localhost:3333/login', {

                    // POST is used to send data to the server
                    method: 'POST',

                    // This header is asking for the request format to be in json
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // Changing the username, password into JSON
                    body: JSON.stringify({ username, password })
                });

                const responseText = await response.text(); // Get response as text
                // console.log(responseText); // 

                try {
                    const data = JSON.parse(responseText); // Parse the response text as JSON

                    // Check if the response is successful
                    // response.ok is used here to check if 
                    // the status code = 200-299 
                    if (response.ok && data.uuid) {
                        onLogin(data.uuid);
                    } else {
                        setError(data.message || 'Login failed');
                    }



                    // Error Handling
                } catch (jsonError) {
                    // JSON error
                    console.error('Failed to parse JSON:', jsonError);
                    setError('Failed to parse server response');
                }
            } catch (error) {
                // Fetch Error
                console.error('Error during login:', error);
                setError('An unexpected error occurred');
            }
        };

        return (
            // HTML Login Form
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                {error && <div>{error}</div>}
                <button type="submit">Login</button>
            </form>
        );
    };

    export default LoginForm;
