import React, { useContext } from "react";
import { ProductContext } from "./Context";
import { useNavigate } from "react-router-dom";
import "./MovieList.css";

const MovieList = () => {
  const { phimMoi, allMovies, search, pick,get, setGet } = useContext(ProductContext);
  const navigate = useNavigate();
  const searchMovie = allMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase()) &&
      (!pick || movie.category == pick) // Nếu không chọn pick, giữ nguyên danh sách
  );
  const handleMovieClick = (movie) => {
    setGet(movie); // Lưu thông tin phim vào context
    navigate(`/movie-detail`); // Điều hướng đến trang chi tiết phim
  };
  return (
    
    <div style={{ display: "flex", justifyContent:'start' }} className="movie-list">
      {console.log(pick)
      }
      {searchMovie.map((movie, index) => (
        <div key={index} className="movie-card" onClick={()=>handleMovieClick(movie)} >
          
          <img src={movie?.poster} alt={movie?.title} />
          <h3>{movie?.title}</h3>
          <p>{movie?.description}</p>
        </div>
      ))}
      {console.log(get)
      }
    </div>
  );
};


export default MovieList;
