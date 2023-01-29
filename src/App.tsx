import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./compoments/Layout";
import Login from "./views/Login";
import Home from "./views/Home";
import User from "./views/User";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/user/:id" element={<User />} />
          <Route
            path="*"
            element={
              <div className="container404">
                <h1>404</h1>
              </div>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
