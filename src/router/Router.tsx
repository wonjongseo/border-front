import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login, { LOGIN_PATH } from "../screen/Login";
import BorderPage, { BORDER_PATH } from "../screen/BorderPage";
import Home, { HOME_PATH } from "../screen/Home";
import Header from "../components/Header";
import Join, { JOIN_PATH } from "../screen/Join";
import Logout, { LOGOUT_PATH } from "../screen/Logout";
import BorderDetail, { BORDER_DETAIL_PATH } from "../screen/BorderDetail";
import BordersPage from "../screen/BordersPage";
function CRouter() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={LOGIN_PATH} element={<Login />} />
          <Route path={JOIN_PATH} element={<Join />} />
          <Route path={LOGOUT_PATH} element={<Logout />} />
          <Route path={BORDER_DETAIL_PATH} element={<BorderDetail />} />
          <Route path={BORDER_PATH + "/*"} element={<BorderPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default CRouter;
