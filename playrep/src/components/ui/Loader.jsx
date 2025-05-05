// components/Loader.jsx
import React from 'react';
import './Loader.css'; // Import the CSS

const Loader = ({ show }) => {
    if (!show) return null;

    return <div className="loader"></div>;
};

export default Loader;
