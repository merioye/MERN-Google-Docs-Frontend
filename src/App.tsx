import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Auth from './pages/Auth/Auth'
import Document from './pages/Document/Document'
import Home from './pages/Home/Home'
import { WHOAMI } from './graphql/queries/user.queries'
import Loader from './assets/images/loader.gif'
import { WhoAmIData } from './types/useQuery.types'

const Layout = () => {
  return <Outlet />
}
const ProtectedRoute = () => {
  const { loading, error } = useQuery<WhoAmIData>(WHOAMI)

  if (loading) {
    return (
      <div className='loader-container'>
        <img src={Loader} alt='loader' />
      </div>
    )
  }
  if (error) {
    return <Navigate to='/auth' />
  }
  return <Layout />
}
const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Home />,
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

export default App
