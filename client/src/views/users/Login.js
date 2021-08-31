import React, { Component } from "react";
import { FaGithub } from "react-icons/fa";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { PORT } from "../../App";

const ErrorMessage = styled.span`
  color: #f39c12;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginSeccess: null,
      isLoginOK: false,
      LoginError: null,
    };
  }

  submitLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      const response = await axios(`http://localhost:${PORT}/login`, {
        method: "post",
        data: {
          email,
          password,
        },
        withCredentials: true,
      });
      if (!response.data.error) {
        this.setState({
          LoginSeccess: response.data,
          isLoginOK: true,
        });
        sessionStorage.setItem("loggedIn", true);
      } else {
        this.setState({
          LoginError: response.data.error,
          isLoginOK: false,
        });
      }
    } catch (error) {
      this.setState({ LoginError: error.message });
    }
  };

  render() {
    const { isLoginOK, LoginError } = this.state;
    return (
      <>
        <Helmet>
          <title>Login | Logflix</title>
        </Helmet>
        {isLoginOK ? (
          window.location.replace("/")
        ) : (
          <>
            <div className="users-form">
              {LoginError ? (
                <ErrorMessage>{LoginError}</ErrorMessage>
              ) : (
                <span>LOGFLIX LOGIN</span>
              )}
            </div>
            <form
              method="POST"
              onSubmit={this.submitLogin}
              className="users-login-form"
            >
              <input
                placeholder="Email"
                name="email"
                type="email"
                required
                autoComplete="off"
              />
              <input
                placeholder="Password"
                name="password"
                type="password"
                required
                autoComplete="off"
              />
              <input type="submit" value="Login" />
              <div className="social-login">
                <Link to="" className="social-login__btn">
                  <FaGithub className="github-icon"></FaGithub> 깃허브 로그인
                  &rarr;
                </Link>
              </div>
              <div className="users-login-form__btn-switch">
                <span>New to LOGFLIX?</span>
                <Link
                  to="/join"
                  className="users-login-form__btn-switch__create"
                >
                  Create your account &rarr;
                </Link>
              </div>
            </form>
          </>
        )}
      </>
    );
  }
}

export default Login;
