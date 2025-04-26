import React from 'react';
import {HeaderWrapper, Logo, Nav} from './styles';
import { Routes, Route, Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Logo><img width="48" height="48" src="https://img.icons8.com/color/48/star-wars.png" alt="star-wars"/></Logo>
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/favourite">Favourite</Link>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
