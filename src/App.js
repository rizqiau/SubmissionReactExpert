import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/authUser/action";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import AddThreadPage from "./pages/AddThreadPage";
import LeaderboardsPage from "./pages/LeaderboardsPage";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const loadingBar = useSelector((state) => state.loadingBar);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  const mainContent =
    authUser === null ? (
      <Routes location={location} key={location.pathname}>
        <Route path="/*" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    ) : (
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/threads/:id" element={<DetailPage />} />
        <Route path="/new" element={<AddThreadPage />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    );
  return (
    <>
      <Loading show={loadingBar > 0} />
      {authUser && (
        <header>
          <Navigation authUser={authUser} signOut={onSignOut} />
        </header>
      )}
      <main className="page-content"> {mainContent}</main>
    </>
  );
}

export default App;
