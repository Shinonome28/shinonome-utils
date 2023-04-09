import { Box, Container } from "@mui/material";
import MainAppBar from "./conponents/MainAppBar";
import { Routes, Route } from "react-router-dom";
import About from "./conponents/About";
import StringUtils from "./conponents/StringUtils";
import Blog from "./conponents/Blog";

function App() {
  return (
    <Box>
      <MainAppBar></MainAppBar>
      <Container maxWidth="md" sx={{
        mt: 2
      }}>
        <Routes>
          <Route path="/" element={<About />}></Route>
          <Route path="/string-utils" element={<StringUtils />}></Route>
          <Route path="/blog" element={<Blog></Blog>}></Route>
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
