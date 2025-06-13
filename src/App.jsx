import { Outlet } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeContext";

export function App() {
  return (
    <ThemeProvider>
      <Header />
      {/* <Home /> */}
      <Outlet />
    </ThemeProvider>
  );
}
