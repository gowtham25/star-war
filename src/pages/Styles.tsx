import styled, { keyframes } from "styled-components";

export const HomeContainer = styled.div`
  margin: 0 10px;
`;

export const HeadingText = styled.h3`
    // width: 90%;
    // padding-left: 5%;
`;


// export const HomeContainer = styled.div`
//   max-width: 1000px;
//   margin: 2rem auto;
//   padding: 1rem;
// `;

// export const HeadingText = styled.h1`
//   font-size: 2rem;
//   font-weight: 700;
//   margin-bottom: 1.5rem;
//   text-align: center;
//   color: #1a1a1a;
// `;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;


export const DetailsContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  background: #f5f5f5;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
`;

export const Label = styled.span`
  font-weight: bold;
  color: #333;
`;

export const Value = styled.span`
  color: #666;
`;

export const SectionTitle = styled.h3`
  margin-top: 30px;
  margin-bottom: 10px;
  color: #2c3e50;
`;

export const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

export const ListItem = styled.li`
  margin-bottom: 6px;
  color: #444;
`;

export const FavouriteButton = styled.button`
  margin-top: 30px;
  background-color: #ffca28;
  color: #000;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #ffc107;
  }
`;

export const BackButton = styled.button`
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  color: #333;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ccc;
  }
`;