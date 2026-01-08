// Import React Router components
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// Import pages/components
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Users from "./pages/Users";
import UsersWithStats from "./pages/UsersWithStats";
import UsersTable from "./pages/UsersTable"
import UsersSearchTable from "./pages/UsersSearchTable";
import UsersOptimisticUpdate from "./pages/UsersOptimisticUpdate"
import CreateUserForm from "./pages/CreateUserForm"
const App = () => {
  return (
    // Router wraps the entire app to enable routing
    <Router>
      
      {/* Navigation Bar */}
      <nav className="bg-gray-200 p-6 font-bold flex justify-center gap-4 w-full fixed top-0 left-0 shadow-md z-50">
        {/* Links to different routes */}
        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>
        <Link to="/calculator" className="hover:text-blue-500">
          Calculator
        </Link>
        <Link to="/Users" className="hover:text-blue-500">
          Users
        </Link>
        <Link to="/UsersWithStats" className="hover:text-blue-500">
          UsersStats
        </Link>
        <Link to="/users-table" className="hover:text-blue-500">Users Table</Link>

          <Link to="/users-search" className="hover:text-blue-500">UsersSearch</Link>
          <Link to="/UsersOptimisticUpdate" className="hover:text-blue-500">UsersOptimistic</Link>
          <Link to="/CreateUserForm" className="hover:text-blue-500">CreateUserForm</Link>

          


      </nav>

      {/* Main content container */}
      <div className="pt-20">
        <Routes>
          
          <Route path="/" element={<Home />} />

          
          <Route path="/calculator" element={<Calculator />} />

          
          <Route path="/Users" element={<Users />} />

          <Route path="/UsersWithStats" element={<UsersWithStats />} />

        <Route path="/users-table" element={<UsersTable />} />

        <Route path="/users-search" element={<UsersSearchTable />} />

        <Route path="/UsersOptimisticUpdate" element={<UsersOptimisticUpdate />} />

        <Route path="/CreateUserForm" element={<CreateUserForm />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App; //component export
