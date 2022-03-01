import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Auth from "./Auth";

const Layout = () => {
    return (
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
