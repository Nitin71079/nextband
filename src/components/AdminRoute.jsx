import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { admin, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  if (!admin) {
    // Redirect non-admins silently — don't reveal the route exists
    navigate("/", { replace: true });
    return null;
  }

  return children;
}