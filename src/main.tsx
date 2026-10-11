import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import App from "./app/App.tsx";
import "./styles/index.css";
import "./lib/analytics"; // Initialize analytics auto-tracking

createRoot(document.getElementById("root")!).render(
  // reducedMotion="user" makes every motion/react animation respect the OS-level
  // prefers-reduced-motion setting automatically, site-wide.
  <MotionConfig reducedMotion="user">
    <App />
  </MotionConfig>
);
