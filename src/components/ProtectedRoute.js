import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem("role"); // Lấy vai trò từ localStorage

  if (!role) return <Navigate to="/login" />; // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (requiredRole && role !== requiredRole) return <Navigate to="/unauthorized" />; // Nếu không có quyền, chuyển hướng

  return children;
};

export default ProtectedRoute;
