import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './forms.css'
import Login from './routes/login.tsx';
import Singup from './routes/singup.tsx';
import Landing from './routes/landing.tsx';
import Dashboard from './routes/dashboard.tsx';
import DashboardNew from './routes/dashboard-new.tsx';
import DashboardAlumno from './routes/dashboard-alumno.tsx';
import Settings from './routes/settings.tsx';
import ProtectedRoute from './routes/protectedRoute.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './auth/auth-provider.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <div>Error 404 Not Found</div>
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <div>Error 404 Not Found</div>
  },
  {
    path: "/singup",
    element: <Singup />,
    errorElement: <div>Error 404 Not Found</div>
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
    errorElement: <div>Error 404 Not Found</div>
  },
  {
    path: "/dashboard-new",
    element: <ProtectedRoute><DashboardNew /></ProtectedRoute>,
    errorElement: <div>Error 404 Not Found</div>
  },
  {
    path: "/dashboard-alumno",
    element: <ProtectedRoute><DashboardAlumno /></ProtectedRoute>,
    errorElement: <div>Error 404 Not Found</div>
  },
  {
    path: "/settings",
    element: <ProtectedRoute><Settings /></ProtectedRoute>,
    errorElement: <div>Error 404 Not Found</div>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
