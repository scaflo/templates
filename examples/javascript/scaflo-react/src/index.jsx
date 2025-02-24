import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
