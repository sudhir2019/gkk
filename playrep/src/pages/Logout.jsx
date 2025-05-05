import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, [navigate]); // Runs only once when the component mounts

    return null; // No UI needed, just redirection
}

export default Logout;
