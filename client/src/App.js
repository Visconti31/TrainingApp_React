import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
