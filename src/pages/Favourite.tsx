import React, { useContext, useEffect, useRef, useState } from "react";
import { SkyWarContext } from "../context/SkyWarContext";
import TableComponent from "../Components/Table";
import { HeadingText, HomeContainer, SearchContainer, SearchInput } from "./Styles";

const Favourite = () => {
  const {
    isLoading,
    planetMemo,
    planetIsLoading,
    setCurrentPage,
    errorMessage,
    handleFavourite,
    favourite,
    possibleGender
    
  } = useContext(SkyWarContext);

  const toggleFavourite = (data: any) => {
    handleFavourite(data);
  }

  return (
    <HomeContainer>
      <HeadingText>Favourite Characters</HeadingText>

      <TableComponent
        data={Object.values(favourite)}
        isLoading={isLoading}
        planetMemo={planetMemo}
        planetIsLoading={planetIsLoading}
        setCurrentPage={setCurrentPage}
        currentPage={1}
        totalPages={1}
        errorMessage={errorMessage}
        toggleFavourite={toggleFavourite}
        favourite={favourite}
        possibleGender={possibleGender}
      />
    </HomeContainer>
  );
};

export default Favourite;
