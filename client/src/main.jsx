import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import homePage from "./pages/homePage"
import savedPage from "./pages/savedPage"
import protectedRout from "./components/protectedRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: <homePage />
  },
  {
    path: "/saved",
    element:
        <protectedRout>
          <savedPage />
        </protectedRout>        
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />    
  </StrictMode>,
)
