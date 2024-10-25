import { Auth } from "@/api";
import { useApp } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const appContext = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = () => {
    Auth.login(username, password)
      .then((res) => {
        console.log(res);
        appContext.login(res.data.access_token);
        navigate("/#/");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="bg-black-primary flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src={"./images/loginPhoto.jpg"}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl text-primary-text font-semibold mb-4">Login</h1>

        <div className="mb-4">
          <label htmlFor="username" className="block text-secondary-text">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            type="text"
            id="username"
            name="username"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 relative ">
          <label htmlFor="password" className="block text-secondary-text">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          <img
          src={`${showPassword ? './Themes/Aurora/icons/eyeOff.svg' : './Themes/Aurora/icons/eye.svg'}`}
            onClick={()=>setShowPassword(!showPassword)}
            className="absolute top-8 right-0 pr-3 cursor-pointer"
          />
    
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="remember"
            name="remember"
            className="accent-brand-secondary-color"
          />
          <label htmlFor="remember" className="text-secondary-text ml-2">
            Remember Me
          </label>
        </div>
        <div className="mb-6 text-brand-primary-color">
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-brand-primary-color text-black font-semibold rounded-md py-2 px-4 w-full"
        >
          Login
        </button>
        <div className="mt-6 text-brand-primary-color text-center">
          <a href="#" className="hover:underline">
            Sign up Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
