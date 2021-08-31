import "./scss/base.scss";
import React, { Component } from "react";
import BrowserRouter from "./Router";
import axios from "axios";

export const PORT = process.env.PORT || 7777;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLogin: false,
    };
  }
  componentDidMount = async () => {
    const user = await axios(`http://localhost:${PORT}/`, {
      method: "get",
      withCredentials: true,
    });
    if (user.data.loggedIn) {
      this.setState({
        user: user.data,
        isLogin: true,
      });
    }
  };

  render() {
    const { user, isLogin } = this.state;
    return (
      <>
        <BrowserRouter user={user} isLogin={isLogin} />
      </>
    );
  }
}
export default App;
