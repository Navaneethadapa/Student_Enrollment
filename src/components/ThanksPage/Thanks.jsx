import React from 'react';
import "../ThanksPage/Thanks.css";

export const Thanks = () => {
    // Get query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const age = urlParams.get('age');

    return (
        <div className="thanks">
            <h2> Your name '{name}' aged '{age}' has been added to student system. You may now exit.</h2>
            {/* Add more content as needed */}
        </div>
    );
};