import Auth from "./pages/auth.jsx";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Upload from "./pages/upload.jsx";
import AgreementPage from "./pages/collab.jsx";
import NotificationPage from "./pages/notif.jsx";
import "./App.css";
import Feed from "./pages/Feed.jsx";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { MantineProvider } from '@mantine/core';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test-upload" element={<Upload />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/collab" element={<AgreementPage />} />
          <Route path="/notif" element={<NotificationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
