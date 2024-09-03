import { Auth } from "@/api";
import { useApp } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const appContext = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    //     <h2 className="text-2xl font-bold mb-6">Login</h2>
    //     <form>
    //       <div className="mb-4">
    //         <label htmlFor="email" className="block text-gray-700 mb-2">
    //           Email Address
    //         </label>
    //         <input
    //           type="text"
    //           id="email"
    //           className="w-full p-2 border border-gray-300 rounded"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label htmlFor="password" className="block text-gray-700 mb-2">
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           id="password"
    //           className="w-full p-2 border border-gray-300 rounded"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <button
    //         onClick={handleSubmit}
    //         className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
    //       >
    //         Login
    //       </button>
    //     </form>
    //   </div>
    // </div>
<div className="bg-black-primary flex justify-center items-center h-screen">
<div className="w-1/2 h-screen hidden lg:block">
  <img src="https://placehold.co/800x/121212/ffffff.png?text=Your+Image&font=Montserrat" alt="Placeholder Image" className="object-cover w-full h-full" />
</div>
<div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
  <h1 className="text-2xl text-primary-text font-semibold mb-4">Login</h1>

    <div className="mb-4">
      <label htmlFor="username" className="block text-secondary-text">Username</label>
      <input  value={username}
               onChange={(e) => setUsername(e.target.value)}
              required   type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block text-secondary-text">Password</label>
      <input   value={password}
             onChange={(e) => setPassword(e.target.value)}
             required type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
    </div>
    <div className="mb-4 flex items-center">
      <input type="checkbox" id="remember" name="remember" className="accent-brand-secondary-color" />
      <label htmlFor="remember" className="text-secondary-text ml-2">Remember Me</label>
    </div>
    <div className="mb-6 text-brand-primary-color">
      <a href="#" className="hover:underline">Forgot Password?</a>
    </div>
    <button onClick={handleSubmit} className="bg-brand-primary-color text-black font-semibold rounded-md py-2 px-4 w-full">Login</button>
  <div className="mt-6 text-brand-primary-color text-center">
    <a href="#" className="hover:underline">Sign up Here</a>
  </div>
</div>
</div>
  );
};

export default Login;
