import React from "react";
import { deleteBorder } from "./api";
import GlobalStyle from "./components/GlobalStyle";
import Header from "./components/Header";
import CRouter from "./router/Router";

function App() {
  return (
    <>
      <GlobalStyle />
      <CRouter />
    </>
  );
}

export default App;
