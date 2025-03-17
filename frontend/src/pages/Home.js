import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } else {
      navigate("/login"); 
    }
  }, [navigate]);

  return (
    <div>
      <h2>Welcometo E-Mart</h2>
      {user && <p>Hi, {user.email}</p>}
      <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
        Logout
      </button>
    </div>
  );
};

export default Home;
