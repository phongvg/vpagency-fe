import App from "@/App";
import "@/styles/app.css";
import "@/styles/index.css";
import { createRoot } from "react-dom/client";

document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(<App />);
