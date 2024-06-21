import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./movieDetails.css";

const MovieDetails = ({ movie }) => {
  const [details, setDetails] = useState({
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
  });

  useEffect(() => {
    const fetchDetails = async (urls, key) => {
      const data = await Promise.all(
        urls.map((url) => axios.get(url).then((res) => res.data))
      );
      setDetails((prevDetails) => ({ ...prevDetails, [key]: data }));
    };

    fetchDetails(movie.characters, "characters");
    fetchDetails(movie.planets, "planets");
    fetchDetails(movie.starships, "starships");
    fetchDetails(movie.vehicles, "vehicles");
    fetchDetails(movie.species, "species");
  }, [movie]);

  return (
    <div className="movieDetails-container">
      <div className="movieDetails">
        <Link to="/">← Back to list</Link>
        <div className="title-director-producer">
          <h2>{movie.title}</h2>
          <p>Director: {movie.director}</p>
          <p>Producer: {movie.producer}</p>
        </div>
        <div className="desc">
          <h4>Description</h4>
          <p>{movie.opening_crawl}</p>
        </div>
        <hr className="hr" />
        <div className="characters">
          <h3>Characters</h3>
          <ul>
            {details.characters.map((character) => (
              <li key={character.url}>{character.name}</li>
            ))}
          </ul>
        </div>
        <hr className="hr" />
        <div className="planets">
          <h3>Planets</h3>
          <ul>
            {details.planets.map((planet) => (
              <li key={planet.url}>{planet.name}</li>
            ))}
          </ul>
        </div>
        <hr className="hr" />
        <div className="species">
          <h3>Species</h3>
          <ul>
            {details.species.map((species) => (
              <li key={species.url}>{species.name}</li>
            ))}
          </ul>
        </div>
        <hr className="hr" />
        <div className="starships">
          <h3>Starships</h3>
          <ul>
            {details.starships.map((starship) => (
              <li key={starship.url}>{starship.name}</li>
            ))}
          </ul>
        </div>

        <hr className="hr" />
        <div className="vehicle">
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

export default MovieDetails;
