import React from 'react';
import './Spinner.css';

const Spinner = () => {
    return (
        <div className="spinner-overlay">
            <div className="coin-spinner">
                <div className="coin">$</div>
                <div className="coin-shadow"></div>
            </div>
        </div>
    );
};

export default Spinner;