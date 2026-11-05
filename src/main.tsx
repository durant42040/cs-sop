import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ExamplesBrowser from "./examples-browser";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode><ExamplesBrowser /></StrictMode>,
);
