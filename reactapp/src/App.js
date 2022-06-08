import "./App.css";
import Row from "./components/Row";
import Banner from "./components/Banner";
import NavBar from "./components/NavBar";
function App() {
  return (
    <div className="app">
      <NavBar />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl="fetchNetflixOriginals"
        isLargeRow={true}
      />
      <Row title="Trending now" fetchUrl="fetchTrending" />
      <Row title="Top Rated" fetchUrl="fetchTopRated" />
      <Row title="Action Movies" fetchUrl="fetchActionMovies" />
      <Row title="Comedy Movies" fetchUrl="fetchComedyMovies" />
      <Row title="Horror Movies" fetchUrl="fetchHorrorMovies" />
      <Row title="Romance Movies" fetchUrl="fetchRomanceMovies" />
      <Row title="Documentaries" fetchUrl="fetchDocumentaries" />
    </div>
  );
}

export default App;
