import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/Movieheist.png";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoIosLogOut, IoMdArrowDropdown } from "react-icons/io";
import { firebaseAuth } from "../global/Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import userImg from "../assets/Movieheist.png";

export default function AppNavigation({ isScrolledDown }) {
  const [isDrop, setDrop] = useState(false);
  const navigate = useNavigate();
  const links = [
    { name: "Home", link: "/home" },
    { name: "Movies", link: "/movies" },
    { name: "TV shows", link: "/tv" },
    { name: "My Favorites", link: "/favList" },
    { name: "Recommendations", link: "/recommended" },
    { name: "My Reviews", link: "/reviews" },
  ];

  const [displaySearch, setDisplaySearch] = useState(false);
  const [valueFocus, setValueFocus] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) navigate("/login");
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <ContainerMain>
      <nav className={`flex ${isScrolledDown ? "isScrolled" : ""}`}>
        <div className="flex leftSide align-center">
          <div className="appLogo flex align-center justify-center">
            <img src={logo} alt="app logo" />
          </div>
          <ul className="flex links">
            {links.map(({ name, link }) => (
              <li key={link}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rightSide flex align-center">
          <div className={`search ${displaySearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setDisplaySearch(true)}
              onBlur={() => {
                if (!valueFocus) {
                  setDisplaySearch(false);
                }
              }}
            >
              <FaSearch></FaSearch>
            </button>
            <input
              type="search"
              placeholder="Search"
              onMouseEnter={() => setValueFocus(true)}
              onMouseLeave={() => setValueFocus(false)}
              onBlur={() => {
                setDisplaySearch(false);
                setValueFocus(false);
              }}
            />
            <button onClick={() => signOut(firebaseAuth)}>
              <IoIosLogOut></IoIosLogOut>
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <div
                style={{
                  border: "1px solid white",
                  borderRadius: 20,
                  padding: 10,
                }}
              >
                <img
                  style={{
                    height: 20,
                    width: 20,
                  }}
                  src={userImg}
                  alt=""
                  srcset=""
                />
              </div> */}
                <IoMdArrowDropdown
                  onClick={() => setDrop(!isDrop)}
                  style={{ cursor: "pointer", height: '2rem ' }}
                ></IoMdArrowDropdown>
                {isDrop ? (
                  <div style={{ position: "absolute", top: "100%" }}>
                    <DropdownList>
                      <li>
                        <Link to="/favList">My Favorites</Link>
                      </li>
                      <li>
                        <Link to="/recommended">Recommended</Link>
                      </li>
                      <li>
                        <Link to="/forgot-password">Forgot Password</Link>
                      </li>
                      <li>
                        <button onClick={() => signOut(firebaseAuth)}>
                          Logout
                        </button>
                      </li>
                    </DropdownList>
                  </div>
                ) : null}
             </div>
          </div>
        </div>
      </nav>
    </ContainerMain>
  );
}

const ContainerMain = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .leftSide {
      gap: 2rem;
      .appLogo {
        img {
          height: 8rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2.5rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .rightSide {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          font-size: 2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.4s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;

const DropdownList = styled.ul`
  list-style-type: none;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 150px;
  overflow: hidden; 
  li {
    padding: 8px 16px;
    white-space: nowrap;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    a,
    button {
      color: white;
      text-decoration: none;
      background: none;
      border: none;
      cursor: pointer;
      display: block;
      width: 100%;
      text-align: left;
      &:hover {
        color: #de101b;
      }
    }
  }
`;

