import * as genreAPI from "./fakeGenreService";

const movies = [
  {
    _id: "61b32351beca727f138a3b08",
    title: "movie1",
    genre: { _id: "61a4a85b5f0e862230ba5741", name: "Action" },
    numberInStock: 4,
    dailyRentalRate: 140,
    publishDate: "2021-12-16T18:30:00.000Z",
    liked: true,
  },
  {
    _id: "61b32351beca727f138a3b09",
    title: "movie2",
    genre: { _id: "61a4a85b5f0e862230ba5742", name: "Comedy" },
    numberInStock: 15,
    dailyRentalRate: 70,
    publishDate: "2021-12-22T18:30:00.000Z",
  },
  {
    _id: "61b32351beca727f138a3b010",
    title: "movie3",
    genre: { _id: "61a4a85b5f0e862230ba5743", name: "Thriller" },
    numberInStock: 57,
    dailyRentalRate: 50,
    publishDate: "2021-12-14T18:30:00.000Z",
  },
  {
    _id: "61b32351beca727f138a3b011",
    title: "movie4",
    genre: { _id: "61a4a85b5f0e862230ba5744", name: "Sci-fi" },
    numberInStock: 27,
    dailyRentalRate: 90,
    publishDate: "2021-12-18T18:30:00.000Z",
  },
  {
    _id: "61b32351beca727f138a3b012",
    title: "movie5",
    genre: { _id: "61a4a85b5f0e862230ba5741", name: "Action" },
    numberInStock: 7,
    dailyRentalRate: 50,
    publishDate: "2021-11-24T18:30:00.000Z",
  },
  {
    _id: "61b32351beca727f138a3b013",
    title: "movie6",
    genre: { _id: "61a4a85b5f0e862230ba5745", name: "Drama" },
    numberInStock: 124,
    dailyRentalRate: 160,
    publishDate: "2021-10-04T18:30:00.000Z",
    liked: true,
  },
  {
    _id: "61b32351beca727f138a3b014",
    title: "movie7",
    genre: { _id: "61a4a85b5f0e862230ba5742", name: "Comedy" },
    numberInStock: 155,
    dailyRentalRate: 170,
    publishDate: "2021-12-19T18:30:00.000Z",
  },
  {
    _id: "61b32351beca727f138a3b015",
    title: "movie8",
    genre: { _id: "61a4a85b5f0e862230ba5743", name: "Thriller" },
    numberInStock: 257,
    dailyRentalRate: 70,
    publishDate: "2021-11-28T18:30:00.000Z",
  },
  {
    _id: "61b32351beca727f138a3b016",
    title: "movie9",
    genre: { _id: "61a4a85b5f0e862230ba5744", name: "Sci-fi" },
    numberInStock: 47,
    dailyRentalRate: 95,
    publishDate: "2021-12-03T18:30:00.000Z",
  },
  {
    _id: "61b32351beca727f138a3b017",
    title: "movie0",
    genre: { _id: "61a4a85b5f0e862230ba5741", name: "Action" },
    numberInStock: 87,
    dailyRentalRate: 120,
    publishDate: "2021-11-27T18:30:00.000Z",
  },
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find((m) => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find((m) => m._id === movie._id);
  if (!movieInDb) movieInDb = {};

  movieInDb.title = movie.title;
  movieInDb.genre = genreAPI.genres.find((g) => g._id === movie.genres._id);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find((m) => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}
