import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { PORT } from "../../App";

const SLink = styled(Link)`
  color: ${(props) => {
    return Boolean(props.selected) ? "#ffff" : "$mainColor";
  }};
  transition: color 0.5s ease-in-out;
`;

const NavBar = (props) => {
  const {
    location: { pathname },
  } = props;
  let loggedIn = false;
  try {
    const { user } = props;
    loggedIn = Boolean(user.loggedIn);
  } catch {
    loggedIn = false;
  }
  return (
    <>
      {loggedIn ? (
        <header className="nav-container">
          <div className="nav__header">
            <div className="nav__navigation-left">
              <a href="/" selected={pathname === "/"}>
                <div className="nav__logo">LOGFLIX</div>
              </a>
              <SLink to="/movies" selected={pathname === "/movies"}>
                영화
              </SLink>
              <SLink to="/tv" selected={pathname === "/tv"}>
                TV프로그램
              </SLink>
              <SLink to="/search" selected={pathname === "/search"}>
                검색
              </SLink>
            </div>
            <div className="nav__navigation-right-Login">
              <a
                onClick={async () => {
                  try {
                    await axios(`http://localhost:${PORT}/logout`, {
                      method: "get",
                      withCredentials: true,
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
                href="/"
              >
                로그아웃
              </a>
              <Link to="/mylog">내공간</Link>
            </div>
          </div>
        </header>
      ) : (
        <header className="nav-container">
          <div className="nav__header">
            <div className="nav__navigation-left">
              <SLink to="/" selected={pathname === "/"}>
                <div className="nav__logo">LOGFLIX</div>
              </SLink>
            </div>
            <div className="nav__navigation-right">
              <Link to="/login">로그인</Link>
              <Link to="/join">가입하기</Link>
            </div>
          </div>
        </header>
      )}
    </>
  );
};
export default withRouter(NavBar);
// https://wonit.tistory.com/303 참고
// withRouter는 Router가 아닌 component에게 Router특성을 부여
// Router는 location, match, history를 사용
