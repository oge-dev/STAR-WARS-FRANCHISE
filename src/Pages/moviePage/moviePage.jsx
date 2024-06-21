import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieDetails from "../../components/movieDetails/movieDetails.jsx";
import Loader from "../../components/loader/loader.jsx";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/films/${id}/`)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
        setError(error.message);
        setMovie(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="Movie-Details-wrapper">
      <div className="error">
        {error && (
          <p className="error-message">{`Error Occurred while Fetching Movies - ${error}`}</p>
        )}
      </div>
      <div className="loader">{loading && <Loader />}</div>
      <div className="MovieDetails">
        {movie && <MovieDetails movie={movie} />}
      </div>
    </div>
  );
};

export default MoviePage;
