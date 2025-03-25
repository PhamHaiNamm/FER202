import React, { useContext } from "react";
import { ProductContext } from "./Context";
import "./WatchMovie.css";

const WatchMovie = () => {
  const { get } = useContext(ProductContext);

  if (!get) {
    return <h2>Phim không tồn tại!</h2>;
  }

  return (
    <div className="watch-movie">
      {console.log(get.link)
      }
      <h3>Happy Watching</h3>
      <h2>{get.title}</h2>
      <div className="video-container">
        <iframe class="full-screen-video" src={get.link} frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                        gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  );
};

export default WatchMovie;
