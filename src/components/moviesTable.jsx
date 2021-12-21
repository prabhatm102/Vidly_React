import Like from "./common/like";
import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

export default class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
    },
    { path: "genres.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },

    {
      key: "like",
      content: (movie) => (
        <Like onClick={() => this.props.onLike(movie)} liked={movie.liked} />
      ),
    },

    {
      key: "Details",
      content: (movie) => (
        <button
          className="btn btn-sm btn-primary"
          onClick={() => this.props.onDetails(movie._id)}
        >
          Details
        </button>
      ),
    },
  ];
  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        className="btn btn-sm btn-danger"
        onClick={() => this.props.onDelete(movie._id)}
      >
        Delete
      </button>
    ),
  };
  content = (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>;
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
      this.columns[0].content = this.content;
    }
  }
  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <div>
        <Table
          data={movies}
          sortColumn={sortColumn}
          columns={this.columns}
          onSort={onSort}
        />
      </div>
    );
  }
}
