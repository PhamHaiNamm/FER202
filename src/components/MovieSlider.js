import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/MovieSlider.css";
import { ProductContext } from "../context/Context";

const MovieSlider = ({ topic }) => {
  const { phimHot, phimLe, phimBo, phimMoi, phimHay } = useContext(ProductContext);

  // Xác định danh sách phim dựa vào prop `topic`
  let movies = [];
  if (topic === "Phim Hot") movies = phimHot;
  else if (topic === "Phim Lẻ") movies = phimLe;
  else if (topic === "Phim Bộ") movies = phimBo;
  else if (topic === "Phim Mới") movies = phimMoi;
  else if (topic === "Phim Hay") movies = phimHay;

  // Kiểm tra nếu dữ liệu chưa có
  if (!Array.isArray(movies) || movies.length === 0) {
    return <p>Đang tải {topic}...</p>;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <div className="slick-next">▶</div>,
    prevArrow: <div className="slick-prev">◀</div>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <>
    <div className="movie-slider">{
      console.log(phimHot, phimLe, phimBo, phimMoi, phimHay)

    }
      <h2>{topic}</h2>
      <Slider {...settings}>
        {
          movies.map((movie, index) => {
            return (
              <div key={index} className="movie-item" style={{ cursor: "pointer" }}>
                <img src={`/image/${movie?.poster}`} alt={movie?.title} />
                <div className="movie-title">{movie?.title}</div>
              </div>
            );
          })
        }
      </Slider>
    </div>
    </>
  );
};

export default MovieSlider;
