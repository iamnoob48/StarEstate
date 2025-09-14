import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email,password} = form
    try{
        const response = await fetch('/auth/login', {
            method : "POST",
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify({email : email, password: password})
        })
        const data = await response.json();
        
        if(data.message){
            setError(data.message)
        }

        if(data.token){
            localStorage.setItem('token',data.token);
            localStorage.setItem('username',data.username)
            navigate('/');
        }else{
            console.log()

        }

    }catch(err){
        console.log(err.message)
    }
  };
  const handleGoogle = async (e) => {
    window.location.href = 'http://localhost:4003/auth/google'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-300 hover:bg-amber-400 transition rounded-lg py-2 font-semibold text-gray-900 shadow-md"
          >
            Login
          </button>
          <button
            onClick={handleGoogle}
            className="w-full bg-amber-300 hover:bg-amber-400 transition rounded-lg py-2 font-semibold text-gray-900 shadow-md"
          >
            Login with google
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-amber-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;


