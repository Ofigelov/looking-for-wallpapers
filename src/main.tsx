import { createRoot } from "react-dom/client";
import { HomePage } from "./components/home-page/home-page";
import { StrictMode } from "react";
import "./general/scss/index.scss";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
);
