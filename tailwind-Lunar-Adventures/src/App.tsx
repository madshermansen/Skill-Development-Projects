import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import styles
import "./App.css";

// import components
import Navbar from "./components/Navbar";

// import pages
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<HomePage />} />
        <Route path="/pricing" element={<HomePage />} />
        <Route path="/blog" element={<HomePage />} />

        {/* 404 */}
        <Route path="*" element={<h1>404: Page not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;