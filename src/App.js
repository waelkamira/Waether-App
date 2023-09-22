import * as React from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Project from "./project";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Project />
      </div>
    </ThemeProvider>
  );
}

export default App;
