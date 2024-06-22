// Importing necessary modules and components
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header.jsx";
import MovieList from "./Pages/movieList/movieList.jsx";
import MoviePage from "./Pages/moviePage/moviePage.jsx";

// Main App component
function App() {
  return (
    <div className="App">
      {/* Header component */}
      <Header />
      <Routes>
        {/* Route for movie list */}
        <Route path="/" element={<MovieList />} />
        {/* Route for individual movie page */}
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </div>
  );
}

export default App;
