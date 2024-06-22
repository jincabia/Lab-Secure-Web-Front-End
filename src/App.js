import React, { useState } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import ChuckNorris from './ChuckNorris';

function App() {
    const [token, setToken] = useState('');


    // Set's a token for Chuck Norris Component if users  
    // are authenticated and logged in.
    const handleLogin = (token) => {
        setToken(token);
    };

    // Removing the token 
    const handleLogout = () => {
        setToken('');
    };

    return (
        <div className="App">
            {/* Conditional Rendering to display if a token is present */}
            {/* Token is only given through a successful login */}

            {/* If there is a token display the Chuck Norris Component */}
            {token ? (
                <div>
                    <ChuckNorris token={token} />
                    {/* Bonus Part to logout and remove the token */}
                    <button onClick={handleLogout}>Logout</button>
                </div>

            
            ) : 
            // Else display the login form
            (
                
                    <LoginForm onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;
