import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import MovieCard from '../components/MovieCard';
import { Row } from 'react-bootstrap';

export default function Movies(){
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/movies')
      .then(res => {
        const data = res.data.movies || res.data.results || res.data;
        setMovies(data);
      })
      .catch(err => {
        console.error(err);
        setMovies([]);
      });
  }, []);

  return (
    <>
      <h2 className="mt-3">Now Playing</h2>
      <Row xs={2} md={3} lg={4}>
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </Row>
    </>
  );
}
