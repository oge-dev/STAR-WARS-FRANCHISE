// Import necessary modules and components from react, axios, and React Router
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./movieDetails.css";

// MovieDetails component receives a 'movie' prop
const MovieDetails = ({ movie }) => {
  // State to hold details of characters, planets, starships, vehicles, and species
  const [details, setDetails] = useState({
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
  });

  // useEffect hook to fetch details when 'movie' prop changes
  useEffect(() => {
    // Function to fetch data from given URLs and update state
    const fetchDetails = async (urls, key) => {
      const data = await Promise.all(
        urls.map((url) => axios.get(url).then((res) => res.data))
      );
      setDetails((prevDetails) => ({ ...prevDetails, [key]: data }));
    };

    // Fetch details for each category from movie object
    fetchDetails(movie.characters, "characters");
    fetchDetails(movie.planets, "planets");
    fetchDetails(movie.starships, "starships");
    fetchDetails(movie.vehicles, "vehicles");
    fetchDetails(movie.species, "species");
  }, [movie]); // Depend on 'movie' prop changes

  // Render movie details UI
  return (
    <div className="movieDetails-container">
      <div className="movieDetails">
        {/* Link to navigate back to the movie list page */}
        <Link to="/">← Back to list</Link>
        <div className="title-director-producer">
          {/* Movie title, director, and producer */}
          <h2>{movie.title}</h2>
          <p>Director: {movie.director}</p>
          <p>Producer: {movie.producer}</p>
        </div>
        <div className="desc">
          {/* Description of the movie */}
          <h4>Description</h4>
          <p>{movie.opening_crawl}</p>
        </div>
        <hr className="hr" />
        <div className="characters">
          {/* List of characters */}
          <h3>Characters</h3>
          <ul>
            {details.characters.map((character) => (
              <li key={character.url}>{character.name}</li>
            ))}
          </ul>
        </div>
        <hr className="hr" />
        <div className="planets">
          {/* List of planets */}
          <h3>Planets</h3>
          <ul>
            {details.planets.map((planet) => (
              <li key={planet.url}>{planet.name}</li>
            ))}
          </ul>
        </div>
        <hr className="hr" />
        <div className="species">
          {/* List of species */}
          <h3>Species</h3>
          <ul>
            {details.species.map((species) => (
              <li key={species.url}>{species.name}</li>
            ))}
          </ul>
        </div>
        <hr className="hr" />
        <div className="starships">
          {/* List of starships */}
          <h3>Starships</h3>
          <ul>
            {details.starships.map((starship) => (
              <li key={starship.url}>{starship.name}</li>
            ))}
          </ul>
        </div>
        <hr className="hr" />
        <div className="vehicle">
          {/* List of vehicles */}
          <h3>Vehicles</h3>
          <ul>
            {details.vehicles.map((vehicle) => (
              <li key={vehicle.url}>{vehicle.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Export the MovieDetails component as the default export
export default MovieDetails;
