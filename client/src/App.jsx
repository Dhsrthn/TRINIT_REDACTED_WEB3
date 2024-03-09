import Auth from "./pages/auth.jsx";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Upload from "./components/upload.jsx";

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
