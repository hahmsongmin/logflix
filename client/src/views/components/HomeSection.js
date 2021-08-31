import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


const Container = styled.div`
    height: 100vh;
`;
const Grid = styled.div`
    margin-top: 25px;
`;


const HomeSection = ({children}) => (
    <Container>
        <Grid>{children}</Grid>
    </Container>
);


HomeSection.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};


export default HomeSection;