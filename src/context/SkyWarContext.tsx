import React, { createContext, useContext, useState, ReactNode } from "react";

export type CharacterListProps = {
  uid: string;
  name: string;
  url: string;
  gender?: string;
  homeworld?: string;
  height?: number;
  isFavourite?: boolean;
  hair_color: string;
  eye_color: string;
  films: string[],
  starships: string[]
};

export type PlanetMemoType = Record<string, string>;

export type SkywarContextType = {
  charactersList: Record<string, CharacterListProps>;
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean | null;
  planetIsLoading: boolean | null;
  planetMemo?: PlanetMemoType;
  errorMessage: string;
  searchQuery?: string;
  setIsLoading: (isLoading: boolean) => void;
  setCurrentPage: (page: number) => void;
  handleFavourite: (data: any) => void;
  possibleGender: string[];
  favourite: Record<string, CharacterListProps>;
  setSearchQuery: (value: string) => void;
  getSkyWarCharacterList: (
    page: number,
    searchQuery: any
  ) => Promise<CharacterListProps[]>;
  getOtherProperties: (allCharacters: CharacterListProps[]) => void;
  getExtractDetails: (data: CharacterListProps[], searchQuery?: string) => void;
  handleUpdateGender: (value: string, id: string) => void;
};

const SkyWarContext = createContext<SkywarContextType>({
  charactersList: {},
  totalRecords: 0,
  totalPages: 0,
  currentPage: 1,
  isLoading: null,
  planetIsLoading: null,
  errorMessage: "",
  planetMemo: {},
  possibleGender: [],
  searchQuery: '',
  setCurrentPage: () => {},
  getSkyWarCharacterList: async () => [],
  getOtherProperties: () => {},
  getExtractDetails: () => {},
  setIsLoading: () => {},
  handleFavourite: () => {},
  handleUpdateGender: () => {},
  setSearchQuery: () => {},
  favourite: {},
});

const SkyWarProvider = ({ children }: { children: ReactNode }) => {
  const [charactersList, setCharactersList] = useState<
    Record<string, CharacterListProps>
  >({});
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [planetMemo, setPlanetMemo] = useState<PlanetMemoType>({});
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [planetIsLoading, setPlanetIsLoading] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [favourite, setFavourite] = useState<
    Record<string, CharacterListProps>
  >({});
  const [possibleGender, setPossibleGender] = useState<Array<string>>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getSkyWarCharacterList = async (
    page: number,
    searchQuery: string
  ): Promise<CharacterListProps[]> => {
    setIsLoading(true);
    setErrorMessage("");
    if (searchQuery || page === 1) {
      setCharactersList({});
    }
    try {
      const response = await fetch(
        `https://www.swapi.tech/api/people?page=${page}&limit=15&name=${searchQuery}`
      );
      const data = await response.json();
      setTotalRecords(data.total_records || 0);
      setTotalPages(data.total_pages || 1);
      setCurrentPage(page || 1);
      setIsLoading(false);
      return searchQuery ? data.result : data.results;
    } catch (error) {
      console.error("Failed to fetch characters", error);
      setErrorMessage("Error Fetching Data. Please Try again.");
      setIsLoading(false);
      throw error;
    }
  };

  const getPlanetDetails = async (urls: string[]) => {
    setPlanetIsLoading(true);
    try {
      const allPlanetDetails = await Promise.all(
        urls.map((url) =>
          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              const planetName = data?.result?.properties?.name || "";
              setPlanetMemo((prev) => ({ ...prev, [url]: planetName }));
              return planetName;
            })
        )
      );
      setPlanetIsLoading(false);
      return allPlanetDetails;
    } catch (err) {
      setPlanetIsLoading(false);
      setIsLoading(false);
      console.error("Error fetching planet details", err);
    }
  };

  const getExtractDetails = (
    details: CharacterListProps[],
    searchQuery = ""
  ) => {
    const { peopleDetails, planetArr } = details.reduce(
      (
        acc: {
          peopleDetails: Record<string, CharacterListProps>;
          planetArr: string[];
        },
        val
      ) => {
        const { uid, homeworld = "" } = val;
        return {
          peopleDetails: { ...acc.peopleDetails, [uid]: val },
          planetArr:
            acc.planetArr.includes(homeworld) || planetMemo?.[homeworld]
              ? acc.planetArr
              : [...acc.planetArr, homeworld],
        };
      },
      { peopleDetails: {}, planetArr: [] }
    );

    if (searchQuery) {
      setCharactersList(peopleDetails);
    } else {
      setCharactersList((prev) => ({ ...prev, ...peopleDetails }));
    }

    getPlanetDetails(planetArr);
  };

  const handleFavourite = (data: any) => {
    if (favourite?.[data.uid]) {
      const {
        [data.uid]: {},
        ...rest
      } = favourite || {};
      setFavourite(rest);
    } else {
      setFavourite((prev: any) => {
        return {
          ...prev,
          [data.uid]: data,
        };
      });
    }
  };

  const handleUpdateGender = (value: string, id: string) => {
    if (charactersList?.[id]) {
      setCharactersList((prev: any) => {
        return { ...prev, [id]: { ...prev?.[id], gender: value } };
      });
    }

    if(favourite?.[id]) {
      setFavourite((prev: any) => {
        return { ...prev, [id]: { ...prev?.[id], gender: value } };
      })
    }
  };

  const getOtherProperties = async (allCharacters: CharacterListProps[]) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const allData = await Promise.all(
        allCharacters.map((char) =>
          fetch(char.url)
            .then((res) => res.json())
            .then((data) => {
              const props = data?.result?.properties || {};
              setPossibleGender((prev: any[]) => {
                return prev.includes(props?.gender)
                  ? prev
                  : [...prev, props?.gender];
              });
              return {
                uid: data?.result?.uid,
                name: props?.name,
                gender: favourite?.[data?.result?.uid] ? favourite?.[data?.result?.uid].gender :props?.gender,
                homeworld: props?.homeworld,
                height: props?.height,
                url: char.url,
                isFavourite: false,
                hair_color: props.hair_color,
                eye_color: props.eye_color,
                films: props.films || [],
                starships: props.starships || []
              };
            })
        )
      );
      getExtractDetails(allData);
    } catch (err) {
      console.error("Failed to fetch character details", err);
      setErrorMessage("Error Fetching Data. Please Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SkyWarContext.Provider
      value={{
        charactersList,
        totalRecords,
        totalPages,
        currentPage,
        isLoading,
        planetIsLoading,
        planetMemo,
        setCurrentPage,
        getSkyWarCharacterList,
        getOtherProperties,
        getExtractDetails,
        setIsLoading,
        errorMessage,
        handleFavourite,
        favourite,
        possibleGender,
        handleUpdateGender,
        setSearchQuery,
        searchQuery
      }}
    >
      {children}
    </SkyWarContext.Provider>
  );
};

export { SkyWarProvider, SkyWarContext };
