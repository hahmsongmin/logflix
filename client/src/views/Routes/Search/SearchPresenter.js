import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Loader from "../../components/Loader";
import Section from "../../components/Section";
import Message from "../../components/Message";
import Poster from "../../components/Poster";
import Helmet from "react-helmet";

const Container = styled.div`
    padding: 50px 0px;
    width: 100%;
`;

const Form = styled.form`
    width: 100%;
    margin-bottom: 50px;
`;

const Input = styled.input`
    color: white;
    all: unset;
    height: 50px;
    font-size: 2rem;
    text-align: center;
    &:focus {
        border-bottom: 3px solid #ffff;
        transition: border-bottom 0.5s ease-in-out;
    }
`;

const Button = styled.button`
    all: unset;
`;

const SearchIcon = styled(FaSearch)`
    font-size: 30px;
    margin-left: 10px;
    cursor: pointer;
`;

const SearchBox = styled.div`
    width: 30%;
    padding: 50px 50px;
    display: flex;
    align-items: center;

`;

const SearchPresenter = ({ movieResults, tvResults, searchTerm, error, loading, handleSubmit, updateTerm }) => (
    <Container>
        <Helmet>
            <title>Search | Logflix</title>
        </Helmet>
        <Form onSubmit={handleSubmit}>
            <SearchBox>
                <Input placeholder="검색어를 입력해주세요" value={searchTerm} onChange={updateTerm}></Input>
                <Button><SearchIcon /></Button>
            </SearchBox>
        </Form>
        {loading ? ( 
            <Loader /> 
        ) : (
        <>
           {movieResults && movieResults.length > 0 && (<Section title="영화">{movieResults.map(movie=> (
            <Poster 
                key={movie.id} 
                id={movie.id} 
                imageUrl={movie.poster_path}
                title={movie.original_title}
                rating={movie.vote_average}
                year={movie.release_date ? movie.release_date.substring(0, 4) : ""}
                isMovie={true}
            />))}
           </Section>
           )}
           {tvResults && tvResults.length > 0 && (
            <Section title="TV프로그램">
                {tvResults.map(tv=> (
            <Poster 
                key={tv.id} 
                id={tv.id} 
                imageUrl={tv.poster_path}
                title={tv.original_name}
                rating={tv.vote_average}
                year={tv.first_air_date ? tv.first_air_date.split("-")[0] : ""}
            />))}
            </Section>
           )}
           {error && <Message color="#e74c3c" text={error} />}
           {tvResults && movieResults && tvResults.length ===0 && movieResults.length ===0 && <Message text="검색결과가 없습니다." color="#95a5a6"/>}
        </>
        )}
    </Container>
);

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  error: PropTypes.string,
  searchTerm: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired
};

export default SearchPresenter;