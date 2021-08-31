import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import styled from "styled-components";
import Helmet from "react-helmet";
import axios from "axios";
import { PORT } from "../../App";

const ErrorMessage = styled.span`
  color: #f39c12;
`;

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinSeccess: null,
      isJoinOK: false,
      joinError: null,
    };
  }

  submitJoin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.password.value;
    const password2 = event.target.password2.value;

    try {
      const response = await axios(`http://localhost:${PORT}/join`, {
        method: "post",
        data: {
          email,
          username,
          password,
          password2,
        },
      });
      if (!response.data.error) {
        this.setState({
          joinSeccess: response.data,
          isJoinOK: true,
        });
      } else {
        this.setState({
          isJoinOK: false,
          joinError: response.data.error,
        });
      }
    } catch (error) {
      this.setState({ joinError: error.message });
    }
  };

  render() {
    const { isJoinOK, joinError } = this.state;
    return (
      <>
        <Helmet>
          <title>Join | Logflix</title>
        </Helmet>
        {isJoinOK ? (
          <Redirect to="/login" />
        ) : (
          <>
            <div className="users-form">
              {joinError ? (
                <ErrorMessage>{joinError}</ErrorMessage>
              ) : (
                <span>LOGFLIX JOIN</span>
              )}
            </div>
            <form
              method="POST"
              onSubmit={this.submitJoin}
              className="users-join-form"
            >
              <input
                placeholder="Email"
                name="email"
                type="email"
                required
                autoComplete="off"
              />
              <input
                placeholder="Username"
                name="username"
                type="text"
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
              <input
                placeholder="Confirm Password"
                name="password2"
                type="password"
                required
                autoComplete="off"
              />
              <input type="submit" value="Join" />
              <div className="social-login">
                <Link to="" className="social-login__btn">
                  <FaGithub className="github-icon"></FaGithub> 깃허브 로그인
                  &rarr;
                </Link>
              </div>
              <div className="users-join-form__btn-switch">
                <span>Already have an account?</span>
                <Link
                  to="/login"
                  className="users-join-form__btn-switch__create"
                >
                  Login now &rarr;
                </Link>
              </div>
            </form>
          </>
        )}
      </>
    );
  }
}

export default Join;
