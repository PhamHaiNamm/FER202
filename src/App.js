import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProductProvider } from './context/Context';
import Header from './components/Header';
import Banner from './components/Banner';
import MovieList from './pages/Home/MovieList';
import MovieDetail from './pages/Home/MovieDetail';
import WatchMovie from './pages/Watch/WatchMovie';
import ProtectedRoute from './components/ProtectedRoute';
import MovieManager from './pages/Admin/MovieManagement';
import LoginPage from './pages/Auth/LoginPage';
import Unauthorized from './pages/Auth/Unauthorized';
import RegisterPage from './pages/Auth/RegisterPage';
import Footer from './components/Footer';


function App() {
  return (
    <ProductProvider>
      <div className="App">

        <Routes>
          <Route
            path="/"
            element={
              <><Header />
                <Banner />
                <MovieList />
              </>
            }
          />
          <Route path="/movie-detail" element={<>
            <Header />
            <MovieDetail />
          </>} />

          {/* Chỉ người dùng đã đăng nhập mới xem được phim */}
          <Route
            path="/watch-movie"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <WatchMovie />
                </>
                
              </ProtectedRoute>
            }
          />

          {/* Chỉ admin mới được vào trang quản lý phim */}
          <Route
            path="/manage-movie"
            element={
              <ProtectedRoute requiredRole="admin">
                <MovieManager />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<>
            <Header />
            <LoginPage />
            </>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/register" element={<>
            <Header />
            <RegisterPage />
            </>} />
        </Routes>
        <Footer />
      </div>
    </ProductProvider>
  );
}

export default App;
