import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Users from "./pages/Users";

const App = () => {
  return (
    <Router>
      
      <nav className="bg-gray-200 p-6 font-bold flex justify-center gap-4 w-full fixed top-0 left-0 shadow-md z-50">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/calculator" className="hover:text-blue-500">Calculator</Link>
        <Link to="/Users" className="hover:text-blue-500">Users</Link>

      </nav>

      
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/Users" element={<Users />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
