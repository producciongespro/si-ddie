import React from 'react';

const LoadingSpinner = (props) => {
return ( 
        <div className={props.elementClass} role="status">
            <span className="sr-only">Loading...</span>
        </div>
);
};

export default LoadingSpinner;