import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "../../components/Section";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Poster from "../../components/Poster";
import Helmet from "react-helmet";

const Container = styled.div`
    padding: 50px 0px;
    width: 100%;
`;

const MoviesPresenter = ({ nowPlaying, popular, upcoming, error, loading }) => (
<>
    <Helmet>
        <title>Movies | Logflix</title>
    </Helmet>
    {loading ? ( 
        <Loader /> 
    ) : (
        <Container>
            {nowPlaying && nowPlaying.length > 0 && <Section title="현재 상영영화">{nowPlaying.map(movie => 
            <Poster 
                key={movie.id} 
                id={movie.id} 
                imageUrl={movie.poster_path}
                title={movie.original_title}
                rating={movie.vote_average}
                year={movie.release_date ? movie.release_date.split("-")[0] : ""}
                isMovie={true}
            />)}</Section>}
            {upcoming && upcoming.length > 0 && <Section title="업데이트 영화">{upcoming.map(movie => 
            <Poster 
                key={movie.id} 
                id={movie.id} 
                imageUrl={movie.poster_path}
                title={movie.original_title}
                rating={movie.vote_average}
                year={movie.release_date ? movie.release_date.split("-")[0] : ""}
                isMovie={true}
            />)}</Section>}
            {popular && popular.length > 0 && <Section title="박스오피스">{popular.map(movie => 
            <Poster 
                key={movie.id} 
                id={movie.id} 
                imageUrl={movie.poster_path}
                title={movie.original_title}
                rating={movie.vote_average}
                year={movie.release_date ? movie.release_date.split("-")[0] : ""}
                isMovie={true}
            />)}</Section>}

            {error && <Message color="#e74c3c" text={error} />}
        </Container>
    )}
</>
);


//https://velog.io/@eunjin/React-PropTypes-%EC%93%B0%EB%8A%94-%EC%9D%B4%EC%9C%A0-%EB%B0%A9%EB%B2%95 // typeScript 대안

MoviesPresenter.propTypes = {
    nowPlaying: PropTypes.array,
    popular: PropTypes.array,
    upcoming: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
};

export default MoviesPresenter;