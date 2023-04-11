import { Box, Container, CssBaseline } from "@mui/material";
import AppBarTypeA from "../conponents/AppBarTypeA";
import ControlledAlert from "../conponents/ControlledAlert";
import GlobalAlertMessageContextProvider from "../context/globalAlertMessageContext";
import ToggleColorMode from "../conponents/ToggleColorMode";
// import { Link, Navigate } from "react-router-dom";

function UILayoutTypeA(props) {
  return (
    <ToggleColorMode>
      <CssBaseline />
      <GlobalAlertMessageContextProvider>
        <Box>
          <AppBarTypeA></AppBarTypeA>
          <ControlledAlert></ControlledAlert>
          <Container
            maxWidth="md"
            sx={{
              mt: 2,
            }}
          >
            {props.children}
          </Container>
        </Box>
      </GlobalAlertMessageContextProvider>
    </ToggleColorMode>
  );
}

export default UILayoutTypeA;
