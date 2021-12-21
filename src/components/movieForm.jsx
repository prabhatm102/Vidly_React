import React from "react";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import Form from "./common/form";
import Loader from "./common/loader";
import { Fragment } from "react/cjs/react.production.min";

export default class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      stock: "",
      rate: "",
    },
    errors: {},
    genres: [],
    loader: true,
  };
  schema = {
    title: Joi.string().min(3).required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    stock: Joi.number().min(0).max(100).label("Stock"),
    rate: Joi.number().min(0).max(10).label("Rate"),
  };
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      if (!movie) return this.props.history.replace("/not-found");
      const data = { ...this.state.data };
      data.title = movie.title;
      data.genreId = movie.genres;
      data.stock = movie.numberInStock;
      data.rate = movie.dailyRentalRate;
      this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
    this.setState({ loader: false });
  }
  mapToViewModel() {
    const { data } = this.state;
    return {
      _id: this.props.match.params.id,
      id: data.genreId,
      title: data.title,
      numberInStock: data.stock,
      dailyRentalRate: data.rate,
    };
  }
  async doSubmit() {
    this.props.history.replace("/movies");
    return await saveMovie(this.mapToViewModel());
  }
  render() {
    const { loader } = this.state;
    return (
      <Fragment>
        {loader && (
          <div className="offset-5">
            <Loader />
          </div>
        )}
        {!loader && (
          <div className="row">
            <h1 className="text-center">Movie Form</h1>
            <form onSubmit={this.handleSubmit} className="offset-4 col-4">
              {this.renderInput("title", "Title")}
              {this.renderSelect("genreId", "Genre", this.state.genres)}
              {this.renderInput("stock", "Stock", "number")}
              {this.renderInput("rate", "Rate", "number")}
              {this.renderButton("Save")}
            </form>
          </div>
        )}
      </Fragment>
    );
  }
}
