import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/loader.jsx";
import "./movieList.css"

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/films/")
      .then((response) => {
        setMovies(response.data.results);
        console.log(response.data);
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
        {movies.map((movie, id) => (
          <div className="movie" key={movie.episode_id}>
            <h3 className="title">{movie.title}</h3>
            <span className="release_date">
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <p className="opening_crawl">
              {movie.opening_crawl}
            </p>
            <Link to={`/movie/${id + 1}`}>More info</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieList;