import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>404 - Halaman Tidak Ditemukan</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
