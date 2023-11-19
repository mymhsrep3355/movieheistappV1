import React, { useState } from "react";
import styled from "styled-components";
import Background from "../components/Background";
import AppHeader from "../components/AppHeader";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../global/Firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
//   console.log(values);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previousVal) => ({
      ...previousVal,
      [name]: value,
    }));
  };

  const handleJoinNowClick = () => {
    setShowPassword(true);
  };

  const handleSignUpClick = async () => {
    
    try {
        const {email, password} = values;
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
        // navigate("/login");
    } catch (error) {
        
    }
  };
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) navigate("/home");
  });

  return (
    <ContainerMain showPassword={showPassword}>
      <Background />
      <div className="screenItems">
        <AppHeader login />
        <div className="body flex direction_column align-center justify-center">
          <div className="text flex justify-center direction_column">
            <h1>Welcome! To Movie Heist</h1>
            <h2>Enjoy Immersive Content & Authenticity</h2>
          </div>
          <div className="signUpForm">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            )}
            <div>
              {!showPassword && (
                <button className="formBtn" onClick={handleJoinNowClick} type="button">
                  Join Now
                </button>
              )}
            </div>
          </div>
          <div className="loginbtn">
            <button onClick={handleSignUpClick} type="button">
              Sign Up
            </button>
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

    .body {
      gap: 2rem;

      .text {
        align-items: center;
        justify-content: center;
        color: white;
        gap: 1rem;
        text-align: center;
        font-size: 1.5rem;
      }

      .signUpForm {
        width: 50%;
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};

        input {
          background-color: #0d0707;
          color: white;
          border: 0.9px solid black;
          &:focus {
            outline: none;
          }
          padding: 1rem;
          font-size: 0.9rem;
          margin: auto;
          width: 100%;
        }

        .formBtn {
          justify-content: center;
          align-items: center;
          padding: 1rem;
          width: 12rem;
          background-color: red;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 17;
          border-radius: 7px;
        }
      }

      button {
        justify-content: center;
        align-items: center;
        padding: 1rem;
        width: 7rem;
        background-color: red;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 17;
        border-radius: 7px;
      }
    }
  }
`;
