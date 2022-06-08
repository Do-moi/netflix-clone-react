import React, { useState, useEffect } from "react";
import "./Banner.css";
import ReactPlayer from "react-player/youtube";
const base_URL = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState("");
  const [video, setVideo] = useState(false);
  const [urlVideo, setUrlVideo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      var movieBanner = await fetch("/load-movies-banner");
      var results = await movieBanner.json();
      if (results.errorVideo) {
        setError("The video doesn't exist");
      } else {
        setUrlVideo(results.urlYoutube);
      }

      setMovie(results.backendReturn);
    }

    load();
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const playVideo = () => {
    setVideo(true);
  };
  const closeClick = () => {
    setVideo(false);
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: movie
          ? `url(${base_URL}${movie?.backdrop_path})`
          : "none",
        backgroundPosition: "center-center",
      }}
    >
      {/*header*/}
      <div className="banner_contents">
        {/*banner contents*/}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          {/* 2 buttons*/}
          <button className="banner_button" onClick={playVideo}>
            Play
          </button>
          <button className="banner_button">My List</button>
        </div>

        {/*banner description*/}
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeBottom" />
      {error && <h1>{error}</h1>}
      {video && (
        <div className="divButton">
          <button className="closeButton" type="button" onClick={closeClick}>
            {"X"}
          </button>
          <ReactPlayer
            url={urlVideo}
            height={"390px"}
            width={"100%"}
            config={{
              youtube: {
                playerVars: {
                  showinfo: 0,
                  autoplay: 1,
                  controls: 2,
                },
              },
            }}
          />
        </div>
      )}
    </header>
  );
}

export default Banner;
