import React, { useState } from "react";
import styled from "styled-components";
import Background from "../components/Background";
import AppHeader from "../components/AppHeader";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../global/Firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginClick = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      // If login is successful, navigate to home
      navigate("/home");
    } catch (error) {
      // If login fails, display an error message
      setErrorMessage("Invalid email or password");
    }
  };

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) navigate("/home");
  });

  return (
    <ContainerMain>
      <Background />
      <div className="screenItems">
        <AppHeader login />
        <div className="containerForm flex direction_column align-center justify-center">
          <div className="form flex justify-center direction_column">
            <div className="title">
              <h3>LogIn</h3>
            </div>
            <div className="container flex direction_column">
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
              {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
              <button onClick={handleLoginClick}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </ContainerMain>
  );
}

const ContainerMain = styled.div`
  position: relative;

  .screenItems {
    height: 100vh;
    position: absolute;
    width: 100vw;
    top: 0;
    left: 0;
    display: grid;
    grid-template-rows: 15vh 85vh;
    background-color: rgba(0, 0, 0, 0.6);

    .containerForm {
      height: 85vh;
      gap: 2rem;

      .form {
        align-items: center;
        padding: 1.5rem;
        width: 50vw;
        gap: 1.5rem;
        color: white;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.6);
        
        input {
          padding: 1rem 1rem;
          width: 25rem;
        }

        button {
          justify-content: center;
          align-items: center;
          padding: 1rem 1rem;
          width: 10rem;
          background-color: #de101b;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 17;
          border-radius: 7px;
          margin: auto;
          margin-top: 25px;
        }
      }
    }
  }
`;

const ErrorText = styled.div`
  color: #ff0000;
  margin-top: 2px;
  font-size: 14px;
  text-align: center;
`;
