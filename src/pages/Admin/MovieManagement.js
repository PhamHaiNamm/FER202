import React, { useContext, useState } from "react";
import '../../styles/MovieManager.css';
import { ProductContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const MovieManager = () => {
    const { allMovies, addMovie, editMovie, deleteMovie } = useContext(ProductContext);
    const navigate = useNavigate();

    const [newMovie, setNewMovie] = useState({
        title: "", poster: "", description: "", rating: "", genre: "", category: "", author: "", country: "", link: "", id: ""
    });

    const [editingId, setEditingId] = useState(null);

    const handleSaveMovie = () => {
        if (!newMovie.title || !newMovie.poster || !newMovie.description || !newMovie.rating || !newMovie.genre || !newMovie.category || !newMovie.author || !newMovie.country || !newMovie.link) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (editingId !== null) {
            editMovie(editingId, newMovie);
            setEditingId(null);
        } else {
            const newId = Math.random().toString(36).substring(2, 10);
            addMovie({ ...newMovie, id: newId });
        }

        setNewMovie({ title: "", poster: "", description: "", rating: "", genre: "", category: "", author: "", country: "", link: "", id: "" });
    };

    return (
        <div className="container">
            <button style={{display:'flex', justifyContent:'start'}} className="btn btn-success" onClick={() => navigate("/")}>Trở về trang chủ</button>
            <h2>Quản Lý Phim</h2>

            <div className="form">
                <input type="text" placeholder="Tiêu đề phim" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} />
                <input type="text" placeholder="Poster URL" value={newMovie.poster} onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })} />
                <input type="text" placeholder="Mô tả" value={newMovie.description} onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })} />
                <input type="number" placeholder="Rating" value={newMovie.rating} onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })} />

                {/* Dropdown chọn danh mục (category) */}
                <select value={newMovie.category} onChange={(e) => setNewMovie({ ...newMovie, category: e.target.value })}>
                    <option value="">Chọn danh mục</option>
                    <option value="phimHot">Phim Hot</option>
                    <option value="phimLe">Phim Lẻ</option>
                    <option value="phimBo">Phim Bộ</option>
                    <option value="phimMoi">Phim Mới</option>
                    <option value="phimHay">Phim Hay</option>
                </select>

                {/* Dropdown chọn thể loại (genre) */}
                <select value={newMovie.genre} onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}>
                    <option value="">Chọn thể loại</option>
                    <option value="Hành động">Hành động</option>
                    <option value="Kinh dị">Kinh dị</option>
                    <option value="Hài hước">Hài hước</option>
                    <option value="Tâm lý">Tâm lý</option>
                </select>

                <input type="text" placeholder="Tác giả" value={newMovie.author} onChange={(e) => setNewMovie({ ...newMovie, author: e.target.value })} />
                <input type="text" placeholder="Quốc gia" value={newMovie.country} onChange={(e) => setNewMovie({ ...newMovie, country: e.target.value })} />
                <input type="text" placeholder="Link xem phim" value={newMovie.link} onChange={(e) => setNewMovie({ ...newMovie, link: e.target.value })} />
                <button onClick={handleSaveMovie}>{editingId !== null ? "Lưu" : "Thêm Phim"}</button>
            </div>

            <div className="movie-container">
                {allMovies.map((movie) => (
                    <div key={movie.id} className="movie-item">
                        <img src={movie?.poster} alt={movie.title} className="movie-poster" />
                        <div className="movie-details">
                            <h3>{movie.title}</h3>
                            <p className="description">{movie.description}</p>
                            <p><strong>Rating:</strong> {movie.rating}</p>
                            <p><strong>Category:</strong> {movie.category}</p>
                            <p><strong>Genre:</strong> {movie.genre}</p>
                            <p><strong>Author:</strong> {movie.author}</p>
                            <p><strong>Country:</strong> {movie.country}</p>
                            <p><strong>Link:</strong> <a href={movie.link} target="_blank" rel="noopener noreferrer">Xem phim</a></p>
                            <div className="button-group">
                                <button className="btn-edit" onClick={() => { setNewMovie(movie); setEditingId(movie.id); }}>Sửa</button>
                                <button className="btn-delete" onClick={() => {
                                    const confirmDelete = window.confirm(`Bạn có chắc muốn xóa phim "${movie.title}" không?`);
                                    if (confirmDelete) {
                                        deleteMovie(movie.id);
                                    }
                                }}>Xóa</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default MovieManager;