import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Dùng chung CSS với trang đăng nhập

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(""); // Reset lỗi

    // Kiểm tra nhập liệu
    if (!email || !username || !password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (username.length < 4) {
      setError("Tên đăng nhập phải có ít nhất 4 ký tự!");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      // Kiểm tra xem username hoặc email đã tồn tại chưa
      const res = await fetch("http://localhost:9999/users");
      const users = await res.json();
      const existingUser = users.find((u) => u.username === username || u.email === email);

      if (existingUser) {
        setError("Tên đăng nhập hoặc Email đã tồn tại!");
        return;
      }

      // Mã hóa mật khẩu
      const encryptedPassword = btoa(password);

      const newUser = { email, username, password: encryptedPassword, role: "user" }; // Mặc định role là user

      // Gửi dữ liệu lên JSON Server
      const response = await fetch("http://localhost:9999/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi đăng ký!");
      }

      alert("Đăng ký thành công! Hãy đăng nhập.");
      navigate("/login"); // Chuyển hướng đến trang đăng nhập
    } catch (error) {
      console.error("Lỗi:", error);
      setError("Đã xảy ra lỗi! Vui lòng thử lại.");
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng ký</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tên đăng nhập"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleRegister}>Đăng ký</button>
      <p>
        Đã có tài khoản? <a href="/login">Đăng nhập</a>
      </p>
    </div>
  );
};

export default RegisterPage;
