import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Auth from "./Auth";
import { useGlobalContext } from "../context/GlobalContext";

const Layout = () => {
    const { fetchingUser } = useGlobalContext();
    return fetchingUser ? (
        <div className="loading">
            <h2>Loading...</h2>
        </div>
    ) : (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path="/" element={<Auth />} />
                <Route exact path="/register" element={<Auth register />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Layout;
