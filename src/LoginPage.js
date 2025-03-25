import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import CSS

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "user", password: "user123", role: "user" }
    ];

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("role", user.role);
      navigate("/");
    } else {
      setError("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <input type="text" placeholder="Tên đăng nhập" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Mật khẩu" onChange={e => setPassword(e.target.value)} />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleLogin}>Đăng nhập</button>
      <a href="#" onClick={()=> navigate("/register")}>Chưa có tài khoản</a>
    </div>
  );
};

export default LoginPage;
