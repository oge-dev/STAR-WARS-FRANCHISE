// Import necessary modules and components from react, axios, React Router, and Loader
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/loader.jsx";
import "./movieList.css"; // Import CSS file for styling

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
  // Define state variables for movies, error, and loading status
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch movie data when the component mounts
  useEffect(() => {
    // Make a GET request to fetch movie data from the API
    axios
      .get("https://swapi.dev/api/films/")
      .then((response) => {
        // On successful response, update movies state and reset error
        setMovies(response.data.results);
        console.log(response.data);
        setError(null);
      })
      .catch((error) => {
        // On error, log it and update error state
        console.error("Error fetching movies:", error);
        setError(error.message);
        setMovies([]);
      })
      .finally(() => {
        // Finally, set loading to false
        setLoading(false);
      });
  }, []);

  return (
    <section className="movie-list">
      {/* Display loader if data is still loading */}
      <div className="loader">{loading && <Loader />}</div>
      {/* Display error message if there is an error */}
      <div className="error">
        {error && (
          <p className="error-message">{`Error Occurred while Fetching Movies - ${error}`}</p>
        )}
      </div>
      <div className="movieItems">
        {/* Map through movies and display each one with background and content */}
        {movies.map((movie, index) => (
          <div
            className="movie"
            key={movie.episode_id}
            style={{ backgroundImage: `url(${backgrounds[index]})` }}
          >
            <div className="movie-content">
              <div className="title-release_date">
                {/* Display movie title and formatted release date */}
                <h3 className="title">{movie.title}</h3>
                <span className="release_date">
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Display movie opening crawl */}
              <p className="opening_crawl">{movie.opening_crawl}</p>
              <hr className="hr" />
              {/* Link to more info about the movie */}
              <Link to={`/movie/${index + 1}`}>More info</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieList; // Export the MovieList component
