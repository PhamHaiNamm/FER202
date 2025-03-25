import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Dùng chung CSS với trang đăng nhập

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const res = await fetch("http://localhost:5000/users");
    const users = await res.json();
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
      setError("Tên đăng nhập đã tồn tại!");
      return;
    }

    const newUser = { username, password, role: "user" }; // Mặc định đăng ký là user
    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    alert("Đăng ký thành công! Hãy đăng nhập.");
    navigate("/login");
  };

  return (
    <div className="login-container">
      <h2>Đăng ký</h2>
      <input type="text" placeholder="Tên đăng nhập" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Mật khẩu" onChange={e => setPassword(e.target.value)} />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleRegister}>Đăng ký</button>
      <p>Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
    </div>
  );
};

export default RegisterPage;
