import React, { useState, useEffect } from "react";
import AppNavigation from "../components/AppNavigation";
import { FaInfoCircle, FaPlay } from "react-icons/fa";
import { AiOutlineInfo } from "react-icons/ai";
import "../styles/Home.css";
import styled from "styled-components";

export default function Home() {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const API_KEY = "b93a64480573ce5248c28b200d79d029";

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setFeaturedMovie(data.results[randomIndex]);
      } catch (error) {
        console.error("Error fetching featured movie:", error.message);
      }
    };

    fetchFeaturedMovie();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledDown(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <MainContainer>
      <AppNavigation isScorlledDown={isScrolledDown}></AppNavigation>
      {featuredMovie && (
        <div className="featured">
          <img
            src={`https://image.tmdb.org/t/p/original${featuredMovie.poster_path}`}
            alt={featuredMovie.title}
            className="bgImg"
          />
          <div className="Container">
            <div className="title">
              <h1 style={{color: 'red'}}>{featuredMovie.title}</h1>
              <p>{featuredMovie.overview}</p>
            </div>
            <div className="buttons flex">
              <button className="flex justify-center align-center">
                <FaPlay>Play</FaPlay> Play
              </button>
              <button className="flex justify-center align-center">
                <AiOutlineInfo></AiOutlineInfo>
                More Info
              </button>
            </div>
          </div>
        </div>
      )}
    </MainContainer>
  );
}

const MainContainer = styled.div`
background-color: black;
.featured {
  position: relative;
  .bgImg {
    filter: brightness(30%);
    object-fit: cover;
    height: 100vh;
    width: 100vw;
  }
  .Container {
    margin-top: 3rem;
    position: absolute;
    bottom: 2rem;
    color: white;
    width: 50%;
    margin-left: 5rem;
    .title {
      h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
      p {
        font-size: 1.6rem;
        line-height: 1.4;
      }
    }
    .buttons {
      margin: 2rem 0;
      gap: 1rem;
      button {
        font-size: 1.4rem;
        gap: 1rem;
        border-radius: 0.2rem;
        padding: 0.5rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: none;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
          opacity: 0.8;
        }
        &:nth-of-type(2) {
          background-color: rgba(109, 109, 110, 0.7);
          color: white;
          svg {
            font-size: 1.8rem;
          }
        }
      }
    }
  }
}
`;
