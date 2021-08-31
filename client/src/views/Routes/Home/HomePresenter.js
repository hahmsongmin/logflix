import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import HomeSection from "../../components/HomeSection";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import HomePoster from "../../components/HomePoster";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 30;
`;

const HomeText = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffff;
  h1 {
    font-size: 50px;
  }
  p {
    margin-top: 20px;
    font-size: 30px;
  }
`;

const HomeTextButton = styled.button`
  margin-top: 40px;
  padding: 15px 25px;
  font-size: 33px;
  font-weight: bold;
  text-align: center;
  outline: none;
  color: #fff;
  background-color: #e20813;
  border: none;
  border-radius: 25px;
  cursor: pointer;
`;

const HomeTextUser = styled.span`
  font-size: 55px;
  font-weight: bold;
  margin-right: 10px;
  color: #f39c12;
`;

const HomePresenter = (props) => {
  const { popular, videos, error, loading, info } = props;
  let user = false;
  try {
    const {
      user: {
        user: { username },
      },
    } = props;
    user = username;
  } catch {
    user = false;
  }
  return (
    <>
      <Helmet>
        <title>Welcome | Logflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {info ? (
            <div className="userUpdateMessages">
              <span>{info}</span>
            </div>
          ) : (
            ""
          )}
          <HomeSection>
            <HomePoster popular={popular} />
            <HomeText>
              {user ? (
                <>
                  <h1>
                    <HomeTextUser>{user}</HomeTextUser>님, 방문해 주셔서
                    감사합니다.
                  </h1>
                  <p>영화, TV프로그램 정보를 검색, 기록</p>
                  <Link to="/movies">
                    <HomeTextButton>즐거운 하루되세요</HomeTextButton>
                  </Link>
                </>
              ) : (
                <>
                  <h1>영화, TV프로그램 정보를 검색, 기록</h1>
                  <p>콘텐츠를 저장하고 기록하세요.</p>
                  <Link to="/join">
                    <HomeTextButton>가입하고 이용시작</HomeTextButton>
                  </Link>
                </>
              )}
            </HomeText>
            {error && <Message color="#e74c3c" text={error} />}
            <iframe
              title="movies"
              className="HomeYoutube"
              src={
                videos?.length > 0
                  ? `https://www.youtube.com/embed/${videos[0].key}?&autoplay=1&loop=1&autohide=1&playlist=${videos[0].key}`
                  : ""
              }
            ></iframe>
          </HomeSection>
        </Container>
      )}
    </>
  );
};

HomePresenter.propTypes = {
  popular: PropTypes.array,
  videos: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default HomePresenter;
