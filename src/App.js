import React from 'react'
import Header from './Header'
import RegisterPage from './RegisterPage';
import Banner from './Banner'
import Footer from './Footer'
import LoginPage from './LoginPage';
import Unauthorized from './Unauthorized';
import { ProductProvider } from './Context'
import MovieList from './MovieList'
import MovieDetail from './MovieDetail'
import { Route, Routes } from 'react-router-dom'
import WatchMovie from './WatchMovie'
import MovieManager from './MovieManagement'
import ProtectedRoute from './ProtectedRoute'

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
