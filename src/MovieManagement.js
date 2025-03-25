import React, { useContext, useState } from "react";
import './MovieManager.css';
import { ProductContext } from "./Context";

const MovieManager = () => {
    const { allMovies, addMovie, editMovie, deleteMovie } = useContext(ProductContext);

    const [newMovie, setNewMovie] = useState({
        title: "", poster: "", description: "", rating: "", genre: "", author: "", country: "", link: "", id: ""
    });

    const [editingId, setEditingId] = useState(null);

    const handleSaveMovie = () => {
        if (!newMovie.title || !newMovie.poster || !newMovie.description || !newMovie.rating || !newMovie.genre || !newMovie.author || !newMovie.country || !newMovie.link) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (editingId !== null) {
            editMovie(editingId, newMovie);
            setEditingId(null);
        } else {
            // Auto-generate ID for new movie (assuming unique ID generation logic)
            const newId = Math.random().toString(36).substring(2, 10);
            addMovie({ ...newMovie, id: newId });
        }

        setNewMovie({ title: "", poster: "", description: "", rating: "", genre: "", author: "", country: "", link: "", id: "" });
    };

    return (
        <div className="container">
            <p className="mb-0"> Happ</p>
            <h2>Quản Lý Phim</h2>

            <div className="form">
                <input 
                    type="text" 
                    placeholder="Tiêu đề phim" 
                    value={newMovie.title} 
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Poster URL" 
                    value={newMovie.poster} 
                    onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Mô tả" 
                    value={newMovie.description} 
                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })} 
                />
                <input 
                    type="number" 
                    placeholder="Rating" 
                    value={newMovie.rating} 
                    onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Thể loại" 
                    value={newMovie.genre} 
                    onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Tác giả" 
                    value={newMovie.author} 
                    onChange={(e) => setNewMovie({ ...newMovie, author: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Quốc gia" 
                    value={newMovie.country} 
                    onChange={(e) => setNewMovie({ ...newMovie, country: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Link xem phim" 
                    value={newMovie.link} 
                    onChange={(e) => setNewMovie({ ...newMovie, link: e.target.value })} 
                />
                <button onClick={handleSaveMovie}>
                    {editingId !== null ? "Lưu" : "Thêm Phim"}
                </button>
            </div>

            <ul className="movie-list">
                {allMovies.map((movie) => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <img src={`/image/${movie?.poster}`} alt={movie.title} style={{ width: '150px', height: 'auto' }} />
                        <p>{movie.description}</p>
                        <p><strong>Rating:</strong> {movie.rating}</p>
                        <p><strong>Genre:</strong> {movie.genre}</p>
                        <p><strong>Author:</strong> {movie.author}</p>
                        <p><strong>Country:</strong> {movie.country}</p>
                        <p><strong>Link:</strong> <a href={movie.link} target="_blank" rel="noopener noreferrer">Xem phim</a></p>
                        <button className="btn btn-primary" onClick={() => { setNewMovie(movie); setEditingId(movie.id); }}>Sửa</button>
                        <button className="btn btn-danger" onClick={() => deleteMovie(movie.id)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieManager;
