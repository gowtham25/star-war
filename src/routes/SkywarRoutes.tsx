import { Routes, Route, Link } from "react-router-dom";
import Details from "../pages/Details";
import Favourite from "../pages/Favourite";
import Home from "../pages/Home";
import Header from "../Components/Header";

const AppRoutes = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/details/people/:id" element={<Details />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
