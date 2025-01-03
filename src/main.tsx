import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./general/scss/index.scss";
import { Layout } from "./components";
import { Aside, Header, KonaMainGrid } from "./features";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <Layout header={<Header />} aside={<Aside />} main={<KonaMainGrid />} />
  </StrictMode>,
);
