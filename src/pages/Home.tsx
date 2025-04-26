import React, { useContext, useEffect, useRef, useState, ChangeEvent, MouseEvent } from "react";
import { SkyWarContext } from "../context/SkyWarContext";
import TableComponent from "../Components/Table";
import {
  HeadingText,
  HomeContainer,
  SearchContainer,
  SearchInput,
} from "./Styles";
import useDebounce from "../hooks/useDebounce";
import { CharacterType, CharacterResponseType } from "./types";

const Home = () => {
  const {
    getSkyWarCharacterList,
    currentPage,
    getOtherProperties,
    charactersList,
    isLoading,
    planetMemo,
    planetIsLoading,
    setCurrentPage,
    totalPages,
    getExtractDetails,
    errorMessage,
    setIsLoading,
    handleFavourite,
    favourite,
    possibleGender,
    setSearchQuery,
    searchQuery
  } = useContext(SkyWarContext);

  const skipNextEffect = useRef<boolean>(false); // 👈 Ref to skip effect

  const handleGetPeopleDetails = () => {
    getSkyWarCharacterList(currentPage, searchQuery)
      .then((response: any) => {
        if (searchQuery) {
          const searchResponse: CharacterType[] = response.map((character: CharacterResponseType) => {
            setIsLoading(true);
            const { properties, uid = "" } = character || {};
            return {
              uid,
              name: properties?.name,
              gender: favourite?.[uid]?.gender || properties?.gender,
              homeworld: properties?.homeworld,
              url: properties?.url,
              isFavourite: false,
              hair_color: properties?.hair_color,
              eye_color: properties?.eye_color,
              films: properties?.films || [],
              starships: properties?.starships || [],
            };
          });
          setIsLoading(false);
          getExtractDetails(searchResponse, searchQuery);
        } else {
          getOtherProperties(response);
        }
      })
      .catch(() => {
        setIsLoading(false);
        skipNextEffect.current = true;
        const rollbackPage = Math.max(currentPage - 1, 1);
        setCurrentPage(rollbackPage);
      });
  };

  const debouncedChangeHandler = useDebounce(setSearchQuery, 500);

  useEffect(() => {
    if (skipNextEffect.current) {
      skipNextEffect.current = false;
      return;
    }

    if (
      currentPage === 1 &&
      searchQuery === "" &&
      Object.keys(charactersList).length > 0
    ) {
      return;
    }

    handleGetPeopleDetails();
  }, [currentPage, searchQuery]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedChangeHandler(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const toggleFavourite = (e: MouseEvent<HTMLButtonElement>, data: CharacterType) => {
    e.stopPropagation();
    handleFavourite(data);
  };

  return (
    <HomeContainer>
      <HeadingText>Character Listing</HeadingText>

      <SearchContainer>
        <SearchInput
          type="text"
          onChange={handleSearch}
          defaultValue={searchQuery}
          placeholder="Search by name..."
        />
      </SearchContainer>

      <TableComponent
        data={Object.values(charactersList)}
        isLoading={isLoading}
        planetMemo={planetMemo}
        planetIsLoading={planetIsLoading}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        errorMessage={errorMessage}
        toggleFavourite={toggleFavourite}
        favourite={favourite}
        possibleGender={possibleGender}
      />
    </HomeContainer>
  );
};

export default Home;
