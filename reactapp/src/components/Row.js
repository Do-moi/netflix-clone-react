import React, { useEffect, useState, Fragment } from "react";
import "./Row.css";
import { CarouselNetflix } from "./CarouselNetflix";
import ReactPlayer from "react-player/youtube";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerURL, setTrailerURL] = useState(false);
  const [videoExist, setVideoExist] = useState(false);
  const [ErrorVideo, setErrorVideo] = useState(false);
  useEffect(() => {
    const loadPictures = async () => {
      const resultsRequest = await fetch(
        `/load-movies-pictures?url=${fetchUrl}`
      );
      const resultsJson = await resultsRequest.json();

      setMovies(resultsJson.backendReturn);
    };
    loadPictures();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    let request = await fetch(`/video?id=${movie.id}`);
    const resultsJson = await request.json();

    if (resultsJson.errorVideo) {
      setErrorVideo("The video doesn't exist");
    } else {
      setErrorVideo(false);
      setTrailerURL(resultsJson.urlYoutube);
      setVideoExist(true);
    }
  };
  const closeClick = () => {
    setVideoExist(false);
  };
  return (
    <Fragment>
      <h2>{title}</h2>
      <CarouselNetflix
        movies={movies}
        handleClick={handleClick}
        isLargeRow={isLargeRow}
      />

      {ErrorVideo && <h2>{ErrorVideo}</h2>}
      {videoExist && (
        <div className="divButton">
          <button className="closeButton" type="button" onClick={closeClick}>
            {"X"}
          </button>
          <ReactPlayer
            url={trailerURL}
            height="390px"
            width="100%"
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
    </Fragment>
  );
}

export default Row;
