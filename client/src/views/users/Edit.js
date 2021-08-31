import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import Home from "../Routes/Home/index";
import styled from "styled-components";
import Helmet from "react-helmet";
import axios from "axios";
import { PORT } from "../../App";

const ErrorMessage = styled.span`
  color: #f39c12;
`;

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editSeccess: null,
      isEditOK: false,
      editError: null,
      info: null,
    };
  }

  submitEdit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const password1 = event.target.password1.value;
    const password2 = event.target.password2.value;

    try {
      const response = await axios(`http://localhost:${PORT}/userEdit`, {
        method: "post",
        data: {
          username,
          password,
          password1,
          password2,
        },
        withCredentials: true,
      });
      if (!response.data.error) {
        this.setState({
          editSeccess: response.data,
          info: response.data.info,
          isEditOK: true,
        });
      } else {
        this.setState({
          isEditOK: false,
          editError: response.data.error,
        });
      }
    } catch (error) {
      this.setState({ editError: error.message });
    }
  };
  render() {
    let Username = null;
    const { info, isEditOK, editError } = this.state;
    try {
      const {
        user: { username },
      } = this.props.user;
      Username = username;
    } catch {
      Username = "";
    }
    return (
      <>
        <Helmet>
          <title>Edit | Logflix</title>
        </Helmet>
        {isEditOK ? (
          <Route path="/" render={() => <Home info={info} />} />
        ) : (
          <>
            <div className="users-form">
              {editError ? (
                <ErrorMessage>{editError}</ErrorMessage>
              ) : (
                <span>LOGFLIX EDIT</span>
              )}
            </div>
            <form
              method="POST"
              onSubmit={this.submitEdit}
              className="users-join-form"
            >
              <input
                placeholder={`${Username}`}
                name="username"
                type="text"
                required
                autoComplete="off"
              />
              <input
                placeholder="Current Password"
                name="password"
                type="password"
                required
                autoComplete="off"
              />
              <input
                placeholder="Change of Password"
                name="password1"
                type="password"
                autoComplete="off"
              />
              <input
                placeholder="Confirm Password"
                name="password2"
                type="password"
                autoComplete="off"
              />
              <input type="submit" value="Edit" />
              <div className="social-login">
                <Link to="/mylog" className="social-login__btn">
                  <TiArrowBack className="github-icon"></TiArrowBack>돌아가기
                </Link>
              </div>
              <div className="users-join-form__btn-switch">
                <span>수정하실 정보만 입력하시면 됩니다.</span>
              </div>
            </form>
          </>
        )}
      </>
    );
  }
}

export default Edit;
