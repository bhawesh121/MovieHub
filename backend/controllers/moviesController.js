const axios = require('axios');
const TMDB_BASE = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

exports.nowPlaying = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const resp = await axios.get(`${TMDB_BASE}/movie/now_playing`, { params: { api_key: API_KEY, page } });
    res.json({ movies: resp.data.results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ movies: [] });
  }
};

exports.movieDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await axios.get(`${TMDB_BASE}/movie/${id}`, { params: { api_key: API_KEY } });
    // generate simple showtimes
    const showtimes = generateShowtimes();
    res.json({ movie: resp.data, showtimes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Movie fetch failed' });
  }
};

function generateShowtimes() {
  const today = new Date();
  const times = ['10:00', '13:30', '16:30', '19:30', '22:30'];
  const showtimes = [];
  for(let d=0; d<3; d++){
    const date = new Date(today);
    date.setDate(today.getDate() + d);
    times.forEach(t => showtimes.push({ label: `${date.toISOString().slice(0,10)} ${t}`, value: `${date.toISOString().slice(0,10)}T${t}` }));
  }
  return showtimes;
}
