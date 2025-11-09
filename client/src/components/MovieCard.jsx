import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <Col className="mb-4 fade-in">
      <Card className="movie-card">
        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
        <Card.Body>
          <Card.Title className="text-white">{movie.title}</Card.Title>
          <Link to={`/movies/${movie.id}`} className="btn btn-primary w-100 mt-2">
            Details
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
