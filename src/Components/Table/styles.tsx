import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background-color: #fff;
  margin-bottom: 1.5rem;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Segoe UI", sans-serif;
  min-width: 600px; /* Enables horizontal scrolling on smaller screens */
`;

export const Tr = styled.tr`
  transition: background-color 0.2s;
  cursor: pointer;
  &:nth-child(even) {
    background-color: #f9fbfc;
  }
`;

export const Th = styled.th`
  padding: 1rem;
  text-align: left;
  background-color: #f0f4f8;
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;

  @media (max-width: 600px) {
    font-size: 0.85rem;
    padding: 0.75rem;
  }
  &:nth-child(1) {
    width: 10%;
  }
  &:nth-child(2) {
    width: 35%;
  }
  &:nth-child(3) {
    width: 20%;
  }
  &:nth-child(4) {
    width: 15%;
  }
  &:nth-child(5) {
    width: 10%;
  }
  &:nth-child(6) {
    width: 10%;
  }
`;

export const Td = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: #444;

  @media (max-width: 600px) {
    font-size: 0.85rem;
    padding: 0.5rem 0.75rem;
  }
`;

export const SkeletonCell = styled.div`
  height: 1rem;
  background: linear-gradient(to right, #e0e0e0 0%, #f8f8f8 50%, #e0e0e0 100%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  border-radius: 4px;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

export const LoadMoreWrapper = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

export const LoadMoreButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 90%;
    font-size: 0.95rem;
  }
`;

export const NoDataRow = styled.tr`
  td {
    text-align: center;
    padding: 2rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: #888;
    background-color: #f9f9f9;

    @media (max-width: 600px) {
      font-size: 1rem;
      padding: 1.5rem;
    }
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: #d9534f;
  font-weight: 500;
  font-size: 1rem;
`;

export const FavouriteToggle = styled.div<{ isActive: boolean }>`
  font-size: 1.2rem;
  cursor: pointer;
  background: transparent;
  border: none;
  color: ${(props) => (props.isActive ? "blue" : "#ccc")};
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => (props.isActive ? "#ffd700" : "#888")};
  }

  &:focus {
    outline: none;
  }
`;
