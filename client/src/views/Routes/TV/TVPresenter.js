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

const TVPresenter = ({ topRated, popular, airingToday, error, loading }) => (
    <>
    <Helmet>
        <title>TV Program | Logflix</title>
    </Helmet>
    {loading ? ( <Loader /> 
    ) : (
    <Container>
        {topRated && topRated.length > 0 && <Section title="평점 TOP 프로그램">{topRated.map(tv=>
        <Poster 
            key={tv.id} 
            id={tv.id} 
            imageUrl={tv.poster_path}
            title={tv.original_name}
            rating={tv.vote_average}
            year={tv.first_air_date.split("-")[0]}
        />)}
        </Section>}

        {popular && popular.length > 0 && <Section title="인기 프로그램">{popular.map(tv=>
        <Poster 
            key={tv.id} 
            id={tv.id} 
            imageUrl={tv.poster_path}
            title={tv.original_name}
            rating={tv.vote_average}
            year={tv.first_air_date.split("-")[0]}
        />)}
        </Section>}

        {airingToday && airingToday.length > 0 && <Section title="오늘방영 프로그램">{airingToday.map(tv=>
        <Poster 
            key={tv.id} 
            id={tv.id} 
            imageUrl={tv.poster_path}
            title={tv.original_name}
            rating={tv.vote_average}
            year={tv.first_air_date ? tv.first_air_date.substring(0, 4) : ""}
        />)}
        </Section>}

        {error && <Message color="#e74c3c" text={error} />}
    </Container>
    )}
    </>
);
TVPresenter.propTypes = {
    topRated: PropTypes.array,
    popular: PropTypes.array,
    airingToday: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
};

export default TVPresenter;