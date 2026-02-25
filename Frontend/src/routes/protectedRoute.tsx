import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/auth-provider.tsx";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const auth = useAuth();

    return auth.isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

 