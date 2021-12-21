import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/listgroup";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import Loader from "./common/loader";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: {},
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
    loader: true,
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const result = await getMovies();
    if (result) {
      const { data: movies } = result;
      this.setState({ movies, genres, loader: false });
    }
  }
  handleDelete = async (id) => {
    const originalMovies = [...this.state.movies];
    const movies = originalMovies.filter((m) => m._id !== id);
    this.setState({ movies });
    try {
      await deleteMovie(id);
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted!");
      this.setState({ movies: originalMovies });
    }
    let currentPage = this.state.currentPage;
    let lastPage = Math.ceil(
      (this.state.movies.length - 1) / this.state.pageSize
    );
    if (currentPage > lastPage) currentPage = lastPage;
    this.setState({ currentPage });
  };
  handleDetails = (id) => {};

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: {},
      currentPage: 1,
    });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      sortColumn,
      movies: allMovies,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else
      filtered =
        selectedGenre && selectedGenre._id
          ? allMovies.filter((m) => {
              return m.genres.name === selectedGenre.name;
            })
          : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    // const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    // if (count === 0)
    //   return <p className="container">There is no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();
    const { user } = this.props;
    const { loader } = this.state;
    return (
      <React.Fragment>
        {loader && (
          <div className="offset-5">
            <Loader />
          </div>
        )}
        {!loader && (
          <div className="row">
            <div className="col-3">
              <ListGroup
                items={genres}
                selectedItem={selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
            </div>
            <div className="col">
              {user && user.isAdmin && (
                <Link to="/movies/new" className="btn btn-primary">
                  New Movie
                </Link>
              )}
              <p>
                Showing {movies.length} of {totalCount} movies from database.
              </p>
              <div className="col-4">
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
              </div>
              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onDelete={this.handleDelete}
                onDetails={this.handleDetails}
                onLike={this.handleLike}
                onSort={this.handleSort}
              />
              <Pagination
                itemCount={totalCount}
                onPageChange={this.handlePageChange}
                pageSize={pageSize}
                currentPage={currentPage}
                selectedGenre={selectedGenre}
              />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
