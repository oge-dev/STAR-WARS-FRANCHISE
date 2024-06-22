// Import necessary modules and components from react, Axios, React Router, MovieDetails and Loader
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieDetails from "../../components/movieDetails/movieDetails.jsx";
import Loader from "../../components/loader/loader.jsx";
import "./moviePage.css";

// Define the MoviePage functional component
const MoviePage = () => {
  // Extract the `id` parameter from the URL
  const { id } = useParams();
  // Define state variables for the movie data, error messages, and loading status
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch movie data when the component mounts or `id` changes
  useEffect(() => {
    // Make a GET request to the SWAPI to fetch movie details based on the `id`
    axios
      .get(`https://swapi.dev/api/films/${id}/`)
      .then((response) => {
        // Update the movie state with the fetched data
        setMovie(response.data);
        console.log(response.data);
        setError(null); // Clear any previous error messages
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch
        console.error("Error fetching movie:", error);
        setError(error.message);
        setMovie(null); // Clear the movie state if an error occurs
      })
      .finally(() => {
        // Set loading to false once the fetch is complete
        setLoading(false);
      });
  }, [id]); // Dependency array to refetch data if `id` changes

  // Return the JSX to render the MoviePage component
  return (
    <div className="Movie-Details-wrapper">
      {/* Display error message if there is an error */}
      <div className="error">
        {error && (
          <p className="error-message">{`Error Occurred while Fetching Movies - ${error}`}</p>
        )}
      </div>
      {/* Display the loader component while the data is loading */}
      <div className="loader">{loading && <Loader />}</div>
      {/* Display the movie details once the data is fetched */}
      <div className="MovieDetails">
        {movie && <MovieDetails movie={movie} />}
      </div>
    </div>
  );
};

// Export the MoviePage component as the default export
export default MoviePage;
