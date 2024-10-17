import './App.css'
import "symphony-ui/Themes/index.scss"
import "./Themes/index.scss"
import { RouterProvider } from 'react-router-dom'
import router from './router'
// import useMoch from './api/--moch--/useMoch'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // useMoch()
  return (
    <>
      <div>
        <RouterProvider router={router} />
        <ToastContainer theme="dark" />
      </div>
    </>
  )
}

export default App
