import React, { useState, useEffect, useRef } from 'react';
import sendButton from "../../images/sendButton.png";
import botimage from "../../images/chatbot.png";
import userImage from "../../images/userimage.png";
import "./ChatBot.css";

const ChatBot = () => {
    const [details, setDetails] = useState({
        "name": "",
        "age": "",
    });

    const [messages, setMessages] = useState([
        { text: "Hello, Welcome to student info system! ", isBot: true },
    ]);

    const [userInput, setUserInput] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const date = <input className="date-picker" type="date" />
    const steps = [
        "Pick a slot !",
        "What is your name?",
        "What is your age?",
        "Roll No",
        "Thank you. In 5 seconds, bot will exit",
    ];

    const messageContainerRef = useRef(null);

    const handleYesButtonClick = () => {
        const newMessages = [...messages, { text: "Got it!", isBot: false }];
        setMessages(newMessages);
    
        if (currentStep === 0) {
            setTimeout(() => {
                const botMessage = steps[0];
                setMessages([...newMessages, { text: botMessage, isBot: true }]);
                setCurrentStep(currentStep + 1);
                scrollToBottom();
            }, 500);
        }
    };
    
    const handleNoButtonClick = () => {
        const newMessages = [...messages, { text: "No", isBot: false }];
        setMessages(newMessages);
    
        if (currentStep === 0) {
            setTimeout(() => {
                const botMessage = steps[currentStep + 2];
                setMessages([...newMessages, { text: botMessage, isBot: true }]);
                setCurrentStep(currentStep + 3);
                scrollToBottom();
            }, 500);
        }
    };
    const handleDayButton = (selectedDay) => {
        const newMessages = [...messages, { text: selectedDay, isBot: false }];
        setMessages(newMessages);
    
        if (currentStep === 1) {
            setTimeout(() => {
                const botMessage = steps[1]; // Asking for name
                setMessages([...newMessages, { text: botMessage, isBot: true }]);
                setCurrentStep(currentStep + 1);
                scrollToBottom();
            }, 500);
        }
    };
    
 
    const handleSend = () => {
        if (userInput.trim() === "") return;
        const trimmedInput = userInput.trim();

        if (currentStep === 0 && trimmedInput.toLowerCase() !== "got it") {
            setUserInput("");
            return;
        }
        const newMessages = [...messages, { text: userInput, isBot: false }];
        setMessages(newMessages);
        setUserInput("");

        if (currentStep < steps.length) {
            const botMessage = steps[currentStep];
            setTimeout(() => {
                setMessages([...newMessages, { text: botMessage, isBot: true }]);
                setCurrentStep(currentStep + 1);
                scrollToBottom();
            }, 1000);
        }

        if (currentStep === steps.length - 1) {
            const name = encodeURIComponent(messages[5].text);
            const age = encodeURIComponent(messages[7].text);
            const url = `/Thanks?name=${name}&age=${age}`;

            setTimeout(() => {
                window.location.href = url;
            }, 5000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            const trimmedInput = userInput.trim();

            if (currentStep === 0 && trimmedInput.toLowerCase() !== "got it") {
                setUserInput("");
                return;
            }
            const newMessages = [...messages, { text: userInput, isBot: false }];
            setMessages(newMessages);
            if (messages.length === 5) {
                setDetails({ ...details, name: userInput });
            }
            if (messages.length === 3) {
                setDetails({ ...details, age: userInput });
            }
            setUserInput("");

            if (currentStep < steps.length) {
                const botMessage = steps[currentStep];
                setTimeout(() => {
                    setMessages([...newMessages, { text: botMessage, isBot: true }]);
                    setCurrentStep(currentStep + 1);
                    scrollToBottom();
                }, 1000);
            }

            if (currentStep === steps.length - 1) {
                const name = encodeURIComponent(messages[5].text);
                const age = encodeURIComponent(messages[7].text);
                const url = `/Thanks?name=${name}&age=${age}`;

                setTimeout(() => {
                    window.location.href = url;
                }, 5000);
            }
        }
    };

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="chatBotContainer">
            <div className='chatheader'>
                <h2>Student Enrollment System</h2>
            </div>


                <div className='messageconatainer' ref={messageContainerRef}>
                    <div className='message'>
                        {messages.map((message, index) => (
                            <div key={index} className={message.isBot ? 'bot-message' : 'user-message'}>
                                <div className={message.isBot ? 'bot-image' : 'user-image'}>
                                    <img src={message.isBot ? botimage : userImage} className='botimage' alt="bot" draggable="false" />
                                </div>
                                <div className='displayed-message'>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {currentStep === 0 && (
                            <div className='button-container'>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className='yes-button' onClick={handleYesButtonClick}>Got it!
</button>
                                <button className='no-button' onClick={handleNoButtonClick}>No</button>
                            </div>
                        )}
                        {currentStep === 1 && (
                            <div className='button-container'>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className='yes-button' onClick={() => handleDayButton('Monday')}>Monday</button>
                                <button className='yes-button' onClick={() => handleDayButton('Tuesday')}>Tuesday</button>
                                <button className='yes-button' onClick={() => handleDayButton('Wednesday')}>Wednesday</button><br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className='yes-button' onClick={() => handleDayButton('Thursday')}>Thursday</button>
                                <button className='yes-button' onClick={() => handleDayButton('Friday')}>Friday</button>
                                <button className='yes-button' onClick={() => handleDayButton('Saturday')}>Saturday</button>
                            </div>
                        )}

                    </div>
                </div>



           

            <div className='userchatcontainer'>
                <input
                    type='text'
                    placeholder='Type Message'
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <div className='sendbtn' onClick={handleSend}>
                    <img src={sendButton} alt="sendButton" draggable="false" />
                </div>
            </div>
        </div>
    );
}

export default ChatBot;
