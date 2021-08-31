import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    padding: 50px;
`;

const Title = styled.span`
    padding: 0px 20px;
    font-size: 1.3rem;
    font-weight: 600;
`;

const Grid = styled.div`
    margin-top: 25px;
    margin-bottom: 20px;
    padding: 0px 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-gap: 30px;
    grid-column: 30px;
`;


const LogSection = ({title, children}) => (
    <Container>
        <Title>{title}</Title>
        <Grid>{children}</Grid>
    </Container>
);


LogSection.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};


export default LogSection;