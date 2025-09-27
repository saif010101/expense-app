import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({toggleLoginStateTrue}) => {
  
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/students/login", {username,password},{withCredentials: true});
      if (response.status === 200){
        toggleLoginStateTrue();
        navigate("/");
      } 
    } catch (err) {
        if (err.response.status === 401) console.log("login failed");
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white text-black p-8 rounded-2xl shadow-lg w-80 md:w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-green-700"
              placeholder="e.g p230512"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-green-700"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 py-2 rounded-lg hover:bg-green-400 transition cursor-pointer focus:outline-none focus:border-2 focus:border-green-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login