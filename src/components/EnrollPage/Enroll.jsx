import React from 'react';
import "../EnrollPage/Enroll.css";
export const Enroll = () => {
    function handleEnroll() {
        window.location.href = "/chatbot"
    }
    return (
        <div className='Eroll-page'>
            <div class="center">
            <h1 >Enter into Student info System</h1>
            <div className='Enrollbtn' onClick={handleEnroll}>
                <button>Enroll</button>
            </div>
            </div>

        </div>
    )
}
