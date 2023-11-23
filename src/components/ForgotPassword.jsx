import React, { useState } from "react";
import styled from "styled-components";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "../global/Firebase";
import { Link } from "react-router-dom";
import logo from "../assets/Movieheist.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetClick = async () => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      setResetSent(true);
      setErrorMessage("");
    } catch (error) {
      setResetSent(false);
      setErrorMessage(
        "Error sending reset email. Please check your email address."
      );
    }
  };

  return (
    <Container>
      <div className="flex direction_column align-center justify-center">
        <img className="logo" src={logo} alt="" />
      </div>
      <div className="title">
        <h3>Forgot Password</h3>
      </div>
      {resetSent ? (
        <>
          <p style={{ marginTop: "1.9rem" }}>
            Password reset email sent. Please check your email and follow the
            instructions.
          </p>
          <div style={{marginTop: "2rem"}}>
            <Link style={{ color: "red" }} to="/login">
              Back to Login
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="containerForm flex direction_column align-center justify-center">
            <div className="form flex justify-center direction_column">
              <p>Enter your email address to receive a password reset link.</p>
              <input
                type="email"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
              {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
              <button onClick={handleResetClick}>Reset Password</button>
              <div>
                <Link style={{ color: "red" }} to="/login">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  .title {
    font-size: 1.5rem;
  }
  .logo {
    height: 15rem;
  }
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
`;

const ErrorText = styled.div`
  color: #ff0000;
  margin-top: 2px;
  font-size: 14px;
  text-align: center;
`;
