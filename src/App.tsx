import React from "react";
import { BrowserRouter } from "react-router-dom";
import SkywarRoutes from "./routes/SkywarRoutes";
import { SkyWarProvider } from "./context/SkyWarContext";

const App: React.FC = () => (
  <SkyWarProvider>
    <BrowserRouter>
      <SkywarRoutes />
    </BrowserRouter>
  </SkyWarProvider>
);

export default App;
