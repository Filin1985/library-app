import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookForm from "./components/BookForm";
import BookItemList from "./components/BookItemList";
import Header from "./components/Header";
import PageCount from "./components/PageCount";
import StatisticLink from "./components/StatisticLink";
import Statistic from "./components/Statistic";
import { BookProvider } from "./context/BookContext";
import Login from "./components/Login";
import Register from "./components/Register";
import { requestGet } from "./utils/request";
import About from "./components/About";

export const AuthContext = React.createContext({ user: null });

function App() {
  const [user, setUser] = useState(null);

  const updateCurrentUser = useCallback(async () => {
    const newUser = await requestGet("/api/users/me");
    setUser(newUser);
  }, []);

  useEffect(() => {
    updateCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, updateCurrentUser }}>
      <BookProvider>
        <Router>
          <Header text={"Это моя библиотека"} />
          <div className="container">
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route
                exact
                path="/api/books"
                element={
                  <>
                    <BookForm />
                    <PageCount />
                    <BookItemList />
                  </>
                }
              ></Route>

              <Route path="/login" element={<Login />} />

              <Route path="/statistic" element={<Statistic />} />
            </Routes>
            <StatisticLink />
          </div>
        </Router>
      </BookProvider>
    </AuthContext.Provider>
  );
}

export default App;
