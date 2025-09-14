import { use, useState } from "react";
import { motion } from "framer-motion";
import {useNavigate} from 'react-router-dom'
import logo from '../assets/logo.png'

function SignUp() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [iseError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   const {email,username,gender,confirmPassword} = form;

   try{
    const isSamePass = form.password === confirmPassword;
    if(!isSamePass){
        setError("Password is not same");

    }
    const response = await fetch('/auth/register',{
        method : "POST",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify({email:email, username:username, gender : gender, password : confirmPassword})
    })
    const data = await response.json();

    if(data.message){
        setError(data.message);
    }

    if(data.token){
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username)
        navigate('/');
    }

   }catch(err){
    console.log(err.message);
   }
   

  };
  const handleClick = ()=>{
    window.location.href = 'http://localhost:4003/auth/google'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Create Your Account
        </h2>
        <div>
            <p></p>
        </div>
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
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="your_username"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-300 hover:bg-amber-400 transition rounded-lg py-2 font-semibold text-gray-900 shadow-md"
          >
            Register
          </button>
          <button
            onClick={handleClick}
            className="w-full bg-amber-300 hover:bg-amber-400 transition rounded-lg py-2 font-semibold text-gray-900 shadow-md"
          >
            <img src={logo} alt="" className="w-4 h-4" />
            Sign In with Google
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-amber-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default SignUp;
