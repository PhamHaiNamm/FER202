import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import CSS

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Regex kiểm tra email hợp lệ
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
  
    if (!validateEmail(email)) {
      setError("Email không hợp lệ! Vui lòng nhập đúng định dạng.");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:9999/users");
      if (!res.ok) throw new Error("Không thể kết nối đến server!");
  
      const users = await res.json();
      const user = users.find(u => u.email === email && atob(u.password) === password);
  
      if (user) {
        localStorage.setItem("role", user.role);
        localStorage.setItem("user", JSON.stringify(user)); // Lưu thông tin user
        
        // 🔥 Phát sự kiện để cập nhật header ngay lập tức
        window.dispatchEvent(new Event("authChange"));
  
        navigate("/"); // Chuyển hướng về trang chính
      } else {
        setError("Sai email hoặc mật khẩu!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      setError("Lỗi kết nối đến server! Kiểm tra lại API.");
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Mật khẩu" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleLogin}>Đăng nhập</button>
      <a href="#" onClick={() => navigate("/register")}>Chưa có tài khoản</a>
    </div>
  );
};

export default LoginPage;
