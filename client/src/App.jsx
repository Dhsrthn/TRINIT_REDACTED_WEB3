import Auth from "./pages/auth.jsx";
import Landing from "./pages/Landing.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Upload from "./pages/upload.jsx";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/test-upload" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
