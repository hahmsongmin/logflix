import React from "react";
import styled from "styled-components";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Helmet from "react-helmet";
import MyLogPoster from "../../components/MyLogPoster";
import MyLogMemu from "../../components/MyLogMemu";
import LogSection from "../../components/LogSection";

const Container = styled.div`
  width: 100%;
  padding: 50px 50px;
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  font-size: 40px;
  margin-top: 100px;
`;

const MyLogPresenter = ({ Results, username, error, loading }) => {
  return (
    <>
      <Helmet>
        <title>MyLog | Logflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <Message color="#e74c3c" text={error} />
          ) : (
            <UserName>✔ {username} 공간</UserName>
          )}
          <Container>
            <MyLogMemu />
            {Results && Results.length > 0 && (
              <LogSection>
                {" "}
                {Results.map((movie) => (
                  <MyLogPoster
                    key={movie.logId}
                    id={movie.logId}
                    objectId={movie._id}
                    title={movie.logTitle}
                    imageUrl={movie.logPoster}
                    logText={movie.logText}
                    createdAt={movie.createdAt}
                  />
                ))}
              </LogSection>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default MyLogPresenter;
