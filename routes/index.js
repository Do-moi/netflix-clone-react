var express = require("express");
var router = express.Router();
var request = require("sync-request");
var allData = require("../requestsTMDB");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// =============/load-movies-banner route banner==================================
router.get("/load-movies-banner", async function (req, res, next) {
  let errorVideo = false;
  let urlYoutube;
  var result = await request(
    "GET",
    `https://api.themoviedb.org/3${allData.requests.fetchNetflixOriginals}`,
    {
      headers: {
        "user-agent": "netflixclone",
      },
    }
  );

  let jsonResult = JSON.parse(result.body);

  //============find random movie banner========================
  const randomMovie =
    jsonResult.results[
      Math.floor(Math.random() * jsonResult.results.length - 1)
    ];

  //===============find video movie banner=====================
  let requestMovie = `https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?api_key=${allData.keyAPIMovie}&language=en-us`;
  let resultVideo = await request("GET", requestMovie, {
    headers: {
      "user-agent": "netflixclone",
    },
  });
  let resultVideoJson = JSON.parse(resultVideo.body);

  if (resultVideoJson.results == undefined) {
    errorVideo = true;
  }
  if (errorVideo === false) {
    if (resultVideoJson.results.length > 0) {
      urlYoutube = `https://www.youtube.com/watch?v=${resultVideoJson.results[0].key}`;
    } else {
      errorVideo = true;
    }
  }

  res.json({ backendReturn: randomMovie, errorVideo, urlYoutube });
});
//===================route /load-movies-pictures row pictures=======================
router.get("/load-movies-pictures", async function (req, res, next) {
  let address;
  if (req.query.url == "fetchTrending") {
    address = allData.requests.fetchTrending;
  }
  if (req.query.url == "fetchTopRated") {
    address = allData.requests.fetchTopRated;
  }
  if (req.query.url == "fetchActionMovies") {
    address = allData.requests.fetchActionMovies;
  }
  if (req.query.url == "fetchComedyMovies") {
    address = allData.requests.fetchComedyMovies;
  }
  if (req.query.url == "fetchHorrorMovies") {
    address = allData.requests.fetchHorrorMovies;
  }
  if (req.query.url == "fetchRomanceMovies") {
    address = allData.requests.fetchRomanceMovies;
  }
  if (req.query.url == "fetchDocumentaries") {
    address = allData.requests.fetchDocumentaries;
  }
  if (req.query.url == "fetchNetflixOriginals") {
    address = allData.requests.fetchNetflixOriginals;
  }

  var result = await request("GET", `https://api.themoviedb.org/3${address}`, {
    headers: {
      "user-agent": "netflixclone",
    },
  });

  let jsonResult = JSON.parse(result.body);

  jsonResult.results.map((movie, i) => {
    if (movie.backdrop_path === null || movie.poster_path === null) {
      jsonResult.results.splice(i, 1);
    }
  });
  res.json({ backendReturn: jsonResult.results });
});
//====================route /video search url video========================================================
router.get("/video", async function (req, res, next) {
  let errorVideo = false;
  let urlYoutube;
  let requestMovie = `https://api.themoviedb.org/3/movie/${req.query.id}/videos?api_key=${allData.keyAPIMovie}&language=en-us`;
  let resultVideo = await request("GET", requestMovie, {
    headers: {
      "user-agent": "netflixclone",
    },
  });
  let resultVideoJson = JSON.parse(resultVideo.body);

  if (resultVideoJson.results == undefined) {
    errorVideo = true;
  }
  if (errorVideo === false) {
    if (resultVideoJson.results.length > 0) {
      urlYoutube = `https://www.youtube.com/watch?v=${resultVideoJson.results[0].key}`;
    } else {
      errorVideo = true;
    }
  }

  res.json({ errorVideo, urlYoutube });
});
module.exports = router;
