import { useEffect, useState } from 'react';

const ChuckNorris = ({ token }) => {
    const [fact, setFact] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFact = async () => {
            // This goes into the backend and fetches for a fact the localhost:3333/fact
            const response = await fetch('http://localhost:3333/fact', {
                headers: {
                    // This authorization header 
                    // is provided to validate
                    // the GET or POST request
                    Authorization: `Bearer ${token}`
                }
            });

            // Activate the loading spinner 
            setLoading(true);
            // Waits for a response then parses it into json
            const data = await response.json();
            // We set the fact 
            setFact(data.fact);

            // During presentation comment the line below out
            // Found in App.css
            setLoading(false);


        };

        // This function runs each time a token changes,
        // Every time a user logs in/out
        
        getFact();
    }, [token]);

    // Loading function while waiting for a fact
    if (loading) {
        return <div className="spinner"></div>;    }



    // if not loading it will show this fact.
    return <div>{fact}</div>;
};

export default ChuckNorris;
