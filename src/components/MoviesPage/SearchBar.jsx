import { useState } from 'react';

import css from './MoviesPage.module.css';

const Form = ({onSubmit}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if(!query)return
    onSubmit(query)
  
  };

  const handleSearchParams = ({ target: { value } }) => {
    setQuery(value);
  };

  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <input className={css.searchInput}
        type="text"
        placeholder="Name movie"
        autoFocus
        value={query}
        onChange={handleSearchParams}
      />
      <button className={css.searchButton} type="submit" disabled={!query}>
        Search
      </button>
    </form>
  );
};

export default Form;