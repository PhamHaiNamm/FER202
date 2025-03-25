import React, { useContext, useState, useEffect } from "react";
import "./Header.css";
import { ProductContext } from "./Context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { setSearch, setPick } = useContext(ProductContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("role"));

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("role"));
    };

    // Lắng nghe sự kiện tùy chỉnh "authChange"
    const handleAuthChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleHomePageClick = () => {
    navigate("/");
    setPick("");
    setSearch("");
  };

  const handleLogout = () => {
    localStorage.removeItem("role"); // Xóa thông tin đăng nhập
    setIsLoggedIn(false);
    
    // Phát sự kiện tùy chỉnh để cập nhật trạng thái trên toàn bộ ứng dụng
    window.dispatchEvent(new Event("authChange"));

    navigate("/login"); // Quay về trang đăng nhập
  };

  return (
    <header className="header" style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      background: "#333",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      zIndex: 1000,
    }}>
      <div className="logo">Netflix & Chill</div>
      <nav className="nav-links">
        <a href="#" onClick={handleHomePageClick}>Trang Chủ</a>
        <a href="#" onClick={() => setPick("phimHot")}>Phim hot</a>
        <a href="#" onClick={() => setPick("phimLe")}>Phim Lẻ</a>
        <a href="#" onClick={() => setPick("phimBo")}>Phim Bộ</a>
        <a href="#" onClick={() => setPick("phimMoi")}>Phim Mới</a>
        
        {/* Chỉ admin mới thấy "Quản Lý Phim" */}
        {isLoggedIn && localStorage.getItem("role") === "admin" && (
          <a href="#" onClick={() => navigate("/manage-movie")}>Quản Lý Phim</a>
        )}

        {/* Nút đăng nhập hoặc đăng xuất */}
        {isLoggedIn ? (
          <a href="#" onClick={handleLogout}>Đăng xuất</a>
        ) : (
          <a href="#" onClick={() => navigate("/login")}>Đăng nhập</a>
        )}
      </nav>
      <div className="search-box">
        <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
        <button>Search</button>
      </div>
    </header>
  );
};

export default Header;
