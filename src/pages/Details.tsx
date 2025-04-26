import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SkyWarContext } from "../context/SkyWarContext";
import {
  DetailsContainer,
  SectionTitle,
  InfoRow,
  Label,
  Value,
  List,
  ListItem,
  BackButton,
} from "./Styles";

const Details = () => {
  const {
    charactersList = {},
    favourite = {},
    planetMemo = {},
  } = useContext(SkyWarContext);

  const navigate = useNavigate();
  const params = useParams();
  const userId: any = params.id;

  const [starshipNames, setStarshipNames] = useState<string[]>([]);
  const [filmTitles, setFilmTitles] = useState<string[]>([]);

  useEffect(() => {
    if (!charactersList?.[userId] && !favourite?.[userId]) {
      navigate("/");
    }
  }, []);

  const {
    hair_color,
    eye_color,
    gender,
    films = [],
    starships = [],
    homeworld = "",
    name = "",
  } = charactersList?.[userId] || favourite?.[userId] || {};

  // Fetch starship names
  useEffect(() => {
    const fetchStarships = async () => {
      try {
        if (starships.length > 0) {
          const results = await Promise.all(
            starships.map((url) =>
              fetch(url)
                .then((res) => res.json())
                .then((data) => {
                  const { result = {} } = data || {};
                  const { properties = {} } = result || {};
                  return properties.name || "";
                })
            )
          );
          setStarshipNames(results);
        } else {
          setStarshipNames([]);
        }
      } catch (error) {
        console.error("Error fetching starships", error);
        setStarshipNames([]);
      }
    };
    if (starships.length) {
      fetchStarships();
    }
  }, [starships]);

  // Fetch film titles
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        if (films.length > 0) {
          const results = await Promise.all(
            films.map((url) =>
              fetch(url)
                .then((res) => res.json())
                .then((data) => {
                  const { result = {} } = data || {};
                  const { properties = {} } = result || {};
                  return properties.title || "";
                })
            )
          );
          setFilmTitles(results);
        } else {
          setFilmTitles([]);
        }
      } catch (error) {
        console.error("Error fetching films", error);
        setFilmTitles([]);
      }
    };
    if (films.length) {
      fetchFilms();
    }
  }, [films]);

  return (
    <DetailsContainer>
      <BackButton onClick={() => navigate("/")}>← Go Back to Home</BackButton>

      <h2>{name}</h2>
      <InfoRow>
        <Label>Hair Color:</Label>
        <Value>{hair_color}</Value>
      </InfoRow>
      <InfoRow>
        <Label>Eye Color:</Label>
        <Value>{eye_color}</Value>
      </InfoRow>
      <InfoRow>
        <Label>Gender:</Label>
        <Value>{gender}</Value>
      </InfoRow>
      <InfoRow>
        <Label>Home Planet:</Label>
        <Value>{planetMemo?.[homeworld]}</Value>
      </InfoRow>

      <SectionTitle>Films</SectionTitle>
      <List>
        {filmTitles.length > 0 ? (
          filmTitles.map((title, i) => <ListItem key={i}>{title}</ListItem>)
        ) : (
          <ListItem>No Films</ListItem>
        )}
      </List>

      <SectionTitle>Starships</SectionTitle>
      <List>
        {starshipNames.length > 0 ? (
          starshipNames.map((ship, i) => <ListItem key={i}>{ship}</ListItem>)
        ) : (
          <ListItem>No Starships</ListItem>
        )}
      </List>
    </DetailsContainer>
  );
};

export default Details;
