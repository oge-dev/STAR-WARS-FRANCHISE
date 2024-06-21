import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/loader.jsx";
import "./movieList.css";

// Import background images
import bgCard1 from "../../assets/bg-card-1.png";
import bgCard2 from "../../assets/bg-card-2.png";
import bgCard3 from "../../assets/bg-card-3.png";
import bgCard4 from "../../assets/bg-card-4.png";
import bgCard5 from "../../assets/bg-card-5.png";
import bgCard6 from "../../assets/bg-card-6.png";

// Create an array of background images
const backgrounds = [bgCard1, bgCard2, bgCard3, bgCard4, bgCard5, bgCard6];

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/films/")
      .then((response) => {
        setMovies(response.data.results);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError(error.message);
        setMovies([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="movie-list">
      <div className="loader">{loading && <Loader />}</div>
      <div className="error">
        {error && (
          <p className="error-message">{`Error Occurred while Fetching Movies - ${error}`}</p>
        )}
      </div>
      <div className="movieItems">
        {movies.map((movie, index) => (
          <div
            className="movie"
            key={movie.episode_id}
            style={{ backgroundImage: `url(${backgrounds[index]})` }}
          >
            <div className="movie-content">
              <div className="title-release_date">
                <h3 className="title">{movie.title}</h3>
                <span className="release_date">
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <p className="opening_crawl">{movie.opening_crawl}</p>
              <hr className="hr" />
              <Link to={`/movie/${index + 1}`}>More info</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieList;
