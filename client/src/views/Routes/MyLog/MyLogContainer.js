import axios from "axios";
import React, { Component } from "react";
import MyLogPresenter from "./MyLogPresenter";
import { PORT } from "../../../App";

class MyLogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      Results: null,
      error: null,
      loading: true,
    };
  }
  async componentDidMount() {
    try {
      const { data } = await axios(`http://localhost:${PORT}/myLogInfo`, {
        method: "post",
        withCredentials: true,
      });
      this.setState({
        username: data.user.username,
        Results: data.myLog.contents,
      });
    } catch (error) {
      this.setState({ error: "저장된 정보가 없습니다." });
    } finally {
      this.setState({ loading: false });
    }
  }
  render() {
    const { Results, username, error, loading } = this.state;
    return (
      <MyLogPresenter
        Results={Results}
        username={username}
        error={error}
        loading={loading}
      />
    );
  }
}

export default MyLogContainer;
