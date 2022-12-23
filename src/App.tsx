import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Auth from './pages/Auth/Auth'
import Document from './pages/Document/Document'
import Home from './pages/Home/Home'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/auth',
        element: <Auth />,
      },
      {
        path: '/doc/:docId',
        element: <Document />,
      },
    ],
  },
])
const App = () => {
  return <RouterProvider router={router} />
}

const ProtectedRoute = () => {
  return <h1>Protected</h1>
}

export default App
