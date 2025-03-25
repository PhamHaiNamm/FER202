import React, { useContext } from "react";
import "../../styles/MovieDetail.css"; // Import CSS
import { ProductContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const MovieDetail = () => {
    const {get} = useContext(ProductContext)
    const navigate = useNavigate();
  return (
    <div className="movie-detail">
      <div className="background">
        <div className="overlay"></div>
      </div>
      <div className="content">
        <div className="poster">
          <img src={get?.poster} alt="Beat the Tiger" />
          <div className="watch-instruction">
            <p>Để xem phim</p>
            <p><strong>Bấm vào ảnh phim</strong></p>
            <p className="highlight"><button className="btn btn-primary" onClick={()=>navigate(`/`)}>Back To Home</button></p>
          </div>
        </div>
        <div className="info">
          <h1>{get?.title}</h1>
          <p>1 giờ 56 phút ({get?.rating} ⭐)</p>
          <button className="imdb-btn">IMDb</button>
          <button className="share-btn">Chia sẻ</button>
          <button className="save-btn" onClick={()=>navigate(`/watch-movie`)}>Xem Phim</button>

          <div className="details">
            <p><strong>Đạo diễn:</strong> {get?.author}</p>
            <p><strong>Quốc gia:</strong> {get?.country}</p>
            <p><strong>Khởi chiếu:</strong> 1/1/1</p>
          </div>

          <p className="description">
            {get?.description}
          </p>

          <div className="genres">
            <span>Hành động</span>
            <span>Chiến tranh</span>
            <span>Chính kịch</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
