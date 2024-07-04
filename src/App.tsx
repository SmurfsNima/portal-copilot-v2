import './App.css'
import "symphony-ui/Themes/index.scss"
import "./Themes/index.scss"
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
