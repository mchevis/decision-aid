import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import Footer from "./components/Nav/Footer";
import Home from "./components/Home";
import ProjectDetails from "./components/ProjectDetails";
import ProductForm from "./components/ProductForm";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/product/:id" element={<ProductForm />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
