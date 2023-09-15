import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatBot from "./components/chatbot/ChatBot";
import { Enroll } from './components/EnrollPage/Enroll';
import { Thanks } from './components/ThanksPage/Thanks';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Enroll />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/Thanks" element={<Thanks />} />
        </Routes>

      </BrowserRouter>
    </div >
  );
}

export default App;
