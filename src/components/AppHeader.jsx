import React from "react";
import styled from "styled-components";
import logo from "../assets/Movieheist.png";
import { useNavigate } from "react-router-dom";
export default function AppHeader(props) {
  const navigate = useNavigate();
  return (
    <ContainerHeader>
      <div className="HeaderContainer flex justify-between align-center">
        <div className="logo">
          <img src={logo} alt="Movie Heist logo" />
        </div>
        <div className="btn_signUp">
          <button
            onClick={() => {
              navigate(props.login ? "/login" : "/signup");
            }}
          >
            {props.login ? "Log In" : "Sign In"}
          </button>
        </div>
      </div>
    </ContainerHeader>
  );
}

const ContainerHeader = styled.div`
  padding: 0 5rem;
  .logo {
    margin-top: 25px;
    img {
      height: 8rem;
      width: 10rem;
    }
  }
  .btn_signUp {
    margin-top: 25px;
  }
  button {
    padding: 1rem 1rem;
    width: 7rem;
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 17;
    border-radius: 7px
  }
`;
