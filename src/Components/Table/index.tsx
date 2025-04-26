import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TableWrapper,
  Table,
  Tr,
  Th,
  Td,
  SkeletonCell,
  LoadMoreWrapper,
  LoadMoreButton,
  NoDataRow,
  ErrorMessage,
  FavouriteToggle,
} from "./styles";
import { CharacterListProps, SkyWarContext } from "../../context/SkyWarContext";
import favouriteIcon from "../../assets/icons/favourite.png";
import notFavouriteIcon from "../../assets/icons/not-favourite.png";

type PlanetMemoType = Record<string, string>;

interface TableComponentProps {
  data: CharacterListProps[];
  isLoading: boolean | null;
  planetIsLoading: boolean | null;
  planetMemo: PlanetMemoType | undefined;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  errorMessage?: string;
  toggleFavourite: (e: any, data: any) => void;
  favourite: Record<string, CharacterListProps>;
  possibleGender?: string[];
}

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  isLoading,
  planetMemo,
  planetIsLoading,
  setCurrentPage,
  currentPage,
  totalPages,
  errorMessage,
  toggleFavourite,
  favourite,
  possibleGender = [],
}) => {
  const { handleUpdateGender } = useContext(SkyWarContext);

  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const threshold = 150;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - threshold
      ) {
        if (!isLoading && !planetIsLoading && currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, planetIsLoading, currentPage, totalPages, setCurrentPage]);

  const noData = !isLoading && !planetIsLoading && data.length === 0;
  const showLoadMoreButton =
    !isLoading && !planetIsLoading && currentPage < totalPages;

  const handleNavigate = (id: string) => {
    navigate(`/details/people/${id}`);
  };

  const handleChange = (e: any, uid: string) => {
    handleUpdateGender(e.target.value, uid);
  };

  return (
    <TableWrapper>
      <Table>
        <thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Gender</Th>
            <Th>Height</Th>
            <Th>Planet</Th>
            <Th>Is Favourite</Th>
          </Tr>
        </thead>
        <tbody>
          {noData ? (
            <NoDataRow>
              <Td colSpan={5}>{"No data available"}</Td>
            </NoDataRow>
          ) : (
            <>
              {data.map((row: any) => (
                <Tr key={row.uid} onClick={() => handleNavigate(row.uid)}>
                  <Td>{row.uid}</Td>
                  <Td>{row.name}</Td>
                  <Td>
                    {possibleGender.length > 0 ? (
                      <select
                        id="dropdown"
                        value={row.gender}
                        onChange={(e) => handleChange(e, row.uid)}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        style={{
                          padding: "3px 10px",
                          borderRadius: 8,
                          border: "1px solid #ccc",
                          marginLeft: 10,
                          width: 145,
                        }}
                      >
                        {possibleGender.map((gender) => {
                          return (
                            <option key={gender} value={gender}>
                              {gender}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <Td>{row.gender || "N/A"}</Td>
                    )}
                  </Td>
                  <Td>{row.height || "N/A"}</Td>
                  {!planetMemo?.[row.homeworld || ""] && planetIsLoading ? (
                    <Td>
                      <SkeletonCell />
                    </Td>
                  ) : (
                    <Td>{planetMemo?.[row.homeworld || ""] || "N/A"}</Td>
                  )}
                  <Td>
                    <FavouriteToggle
                      isActive={!!favourite?.[row.uid]}
                      onClick={(e) => toggleFavourite(e, row)}
                    >
                      <img
                        width="15"
                        height="15"
                        src={favourite?.[row.uid] ? favouriteIcon : notFavouriteIcon}
                        alt={favourite?.[row.uid] ? "Favourite" : "Not Favourite"}
                      />
                    </FavouriteToggle>
                  </Td>
                </Tr>
              ))}

              {isLoading &&
                Array.from({ length: 10 }).map((_, i) => (
                  <Tr key={`skeleton-${i}`}>
                    <Td>
                      <SkeletonCell />
                    </Td>
                    <Td>
                      <SkeletonCell />
                    </Td>
                    <Td>
                      <SkeletonCell />
                    </Td>
                    <Td>
                      <SkeletonCell />
                    </Td>
                    <Td>
                      <SkeletonCell />
                    </Td>
                    <Td>
                      <SkeletonCell />
                    </Td>
                  </Tr>
                ))}
            </>
          )}
        </tbody>
      </Table>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      {showLoadMoreButton && (
        <LoadMoreWrapper>
          <LoadMoreButton onClick={() => setCurrentPage(currentPage + 1)}>
            Load More
          </LoadMoreButton>
        </LoadMoreWrapper>
      )}
    </TableWrapper>
  );
};

export default TableComponent;
