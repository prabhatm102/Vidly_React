import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth, { login } from "../services/authService";
import { Redirect } from "react-router-dom";

export default class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().min(8).label("Password"),
  };
  // username = React.createRef();
  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="row">
        <h1 className="text-center">Login Form</h1>
        <form onSubmit={this.handleSubmit} className="offset-4 col-4">
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}
