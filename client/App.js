import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import Footer from "./components/Nav/Footer";
import Home from "./components/Home";
import ProjectDetails from "./components/ProjectDetails";
import ProductForm from "./components/ProductForm";
import CreateProductForm from "./components/CreateProductForm";
import { Grid } from "@mui/material";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Grid container direction="column" spacing={3}>
          <Grid item xs={1}>
            <Navbar />
          </Grid>
          <Grid item container xs={10} sx={{ minHeight: "100vh" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Home />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/product/:id" element={<ProductForm />} />
              <Route
                path="/:projectId/createProduct"
                element={<CreateProductForm />}
              />
            </Routes>
          </Grid>
          <Grid item xs={1}>
            <Footer />
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  );
};

export default App;
