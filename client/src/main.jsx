import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './components/layout';
import HomePage from "./pages/homePage"
import SavedPage from "./pages/savedPage"
import LoginPage from "./pages/loginPage"
import RegisterPage from "./pages/registerPage"
import ProtectedRoute from "./components/protectedRoute"
import { AuthProvider } from './authContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/saved",
        element: <ProtectedRoute><SavedPage /></ProtectedRoute>,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} /> 
    </AuthProvider>   
  </StrictMode>,
)
