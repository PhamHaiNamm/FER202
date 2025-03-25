import React from "react";
import "./Banner.css"; // Import file CSS riêng cho Banner
import  {ProductContext}  from "./Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const { phimMoi, setGet   } = useContext(ProductContext);
  const handleWatchMovieClick = () => {
    setGet(phimMoi[0]);
    navigate(`/watch-movie`);
  }
  const handleDetailMovieClick = () => {
    setGet(phimMoi[0]);
    navigate(`/movie-detail`);
  }
  return (
    
    <div className="banner">
      {console.log(phimMoi)
      }
      <div className="banner-content">
        <span className="tag">TV Show</span>
        <h1>{phimMoi[0]?.title}</h1>
        <div className="stars"> {phimMoi[0]?.rating}⭐</div>
        <p>{phimMoi[0]?.description}</p>
        <div className="buttons">
          <button className="btn-black" onClick={()=>handleDetailMovieClick()}>Chi tiết</button>
          <button className="btn-red" onClick={()=>handleWatchMovieClick()}>Xem Phim</button>
        </div>
      </div>
      <div className="banner-image">
        <img src={`/image/${phimMoi[0]?.poster}`} alt="Movie Poster" />
      </div>
    </div>
  );
};


export default Banner;
