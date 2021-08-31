import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FcLike } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { PORT } from "../../App";

const Image = styled.div`
  background-image: url(${(props) =>
    `https://image.tmdb.org/t/p/w300${props.bgUrl}`});
  height: 450px;
  background-size: cover;
  border-radius: 20px;
  margin-bottom: 10px;
  transition: opacity 0.1s linear;
`;

const LikeIcon = styled(FcLike)`
  font-size: 20px;
`;

const SLink = styled(Link)`
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  cursor: pointer;
`;

const DeleteIcon = styled(MdDelete)`
  color: #f39c12;
  font-size: 30px;
  cursor: pointer;
  margin-bottom: 10px;
`;

// Scss 로

const MyLogPoster = ({ logText, createdAt, id, objectId, title, imageUrl }) => {
  return (
    <div className="container">
      <div className="log-container">
        <div className="log__inner">
          <div className="log__inner-front">
            <Image bgUrl={imageUrl} />
          </div>
          <div className="log__inner-back">
            <div className="log__inner-text">
              <DeleteIcon
                onClick={async () => {
                  try {
                    await axios(`http://localhost:${PORT}/myLogDelete`, {
                      method: "post",
                      data: {
                        objectId,
                      },
                      withCredentials: true,
                    });
                  } catch {
                  } finally {
                    window.location.replace("/mylog");
                  }
                }}
              />
              <div id="title">{title}</div>
              <div id="text">{logText}</div>
              <div id="day">{createdAt}</div>
              <SLink to={`/movie/${id}`}>
                자세히
                <LikeIcon />
              </SLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MyLogPoster.propTypes = {
  id: PropTypes.number.isRequired,
  objectId: PropTypes.object.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default MyLogPoster;
