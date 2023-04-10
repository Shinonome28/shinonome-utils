import { Box, Container } from "@mui/material";
import MainAppBar from "./conponents/MainAppBar";
import { Routes, Route } from "react-router-dom";
import About from "./conponents/About";
import StringUtils from "./conponents/StringUtils";
import PageNotFound from "./conponents/PageNotFound";
import UncertaintyCalculator from "./conponents/UncertaintyCalculator";
import ControlledAlert from "./conponents/ControlledAlert";

function App() {
  return (
    <Box>
      <MainAppBar></MainAppBar>
      <ControlledAlert></ControlledAlert>
      <Container
        maxWidth="md"
        sx={{
          mt: 2,
        }}
      >
        <Routes>
          <Route path="/" element={<About />}></Route>
          <Route path="/string-utils" element={<StringUtils />}></Route>
          <Route
            path="/uncertatinty-calculator"
            element={<UncertaintyCalculator />}
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
