import styled from "styled-components";

export const HeaderWrapper = styled.header`
  background-color: #282c34;
  color: white;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
`;

export const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;
  a {
    color: white;
    text-decoration: none;
    font-size: 15px;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
      background-color: #007bff;
      transform: scale(1.05);
    }

    &:active {
      background-color: #0056b3;
    }
  }
`;
