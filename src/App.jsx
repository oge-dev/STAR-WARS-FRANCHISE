import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header.jsx";
import MovieList from "./Pages/movieList/movieList.jsx";
import MoviePage from "./Pages/moviePage/moviePage.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </div>
  );
}

export default App;
