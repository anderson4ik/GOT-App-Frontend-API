import React from 'react';
import img from './error.jpg';
import './errorMessage.css';

const ErrorMessage = () => {
    return (
        <>
        <span className="errorMessage">Something goes wrong</span>
         {/* if image in the same folder as element */}
        <img src={img} alt='error'></img>
        {/* if image in the folder PUBLIC/img */}
        {/* <img src={process.env.PUBLIC_URL + '/img/error.jpg'} alt='error'></img> */}
        </>
    )
}

export default ErrorMessage;