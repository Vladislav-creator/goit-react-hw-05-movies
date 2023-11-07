import Home from "pages/Home"; import MovieDetails from "pages/MovieDetails";
import Movies from "pages/Movies";
import css from "./App.module.css"
import { NavLink, Route, Routes } from 'react-router-dom';
export const App = () => {
  return (
    <div>
      <header className={css.header}>
        <NavLink className={css.headerLink} to="/">
          Home
        </NavLink>
        <NavLink className={css.headerLink} to="/movies">
        Movies
        </NavLink>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />} />
        </Routes>
      </main>
    </div>
  );
};
