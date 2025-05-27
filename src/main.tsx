import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./general/scss/index.scss";
import { Layout } from "./components";
import { Header } from "./features";
import { RuleAside } from "./features/RuleAside";
import { RuleMainGrid } from "./features/RuleMainGrid";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <Layout header={<Header />} aside={<RuleAside />} main={<RuleMainGrid />} />
  </StrictMode>,
);
