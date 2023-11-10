import 'semantic-ui-css/semantic.min.css'
import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './pages/Main'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
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
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
