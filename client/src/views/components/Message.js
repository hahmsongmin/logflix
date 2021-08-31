import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 100px;
`;

const Text = styled.span`
    color: ${props => props.color};
    font-size: 2rem;
    font-weight: 600;
`;

const Message = ({color, text}) => (
    <Container>
        <Text color={color}>{text}</Text>
    </Container>
)

Message.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default Message;