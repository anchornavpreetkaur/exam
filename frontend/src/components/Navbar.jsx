
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  //const token = localStorage.getItem("token");
  const token =user?.token;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.clear();
  navigate("/login");
  window.location.reload();
  };

  return (
    <nav className="navbar">
      <h1>Workout Listings</h1>

      <div className="links">
        <Link to="/">Home</Link>

        {token ? (
          <>
            <Link to="/add-workout">Add Workout</Link>

            <span>Welcome, {user?.name}</span>

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;