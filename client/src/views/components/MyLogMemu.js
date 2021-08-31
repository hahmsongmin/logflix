import React from "react";
import styled from "styled-components";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import axios from "axios";
import { PORT } from "../../App";

const UserEditIcon = styled(FaUserEdit)`
  font-size: 1.3rem;
  margin-left: 20px;
`;

const UserDeleteIcon = styled(AiOutlineUserDelete)`
  font-size: 1.3rem;
  margin-left: 20px;
`;

const UserDelete = styled.a`
  cursor: pointer;
`;
const MyLogMemu = () => {
  return (
    <div id="mySideNav" className="sideNav">
      <a href="/user/edit" id="profileEdit">
        정보수정
        <UserEditIcon />
      </a>
      <UserDelete
        href="/"
        onClick={async () => {
          try {
            await axios(`http://localhost:${PORT}/userDelete`, {
              method: "get",
              withCredentials: true,
            });
          } catch (error) {
            console.log(error);
          }
        }}
        id="contact"
      >
        회원탈퇴
        <UserDeleteIcon />
      </UserDelete>
    </div>
  );
};

export default MyLogMemu;
