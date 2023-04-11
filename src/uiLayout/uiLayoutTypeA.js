import { Box, Container, CssBaseline } from "@mui/material";
import AppBarTypeA from "../components/AppBarTypeA";
import ControlledAlert from "../components/ControlledAlert";
import GlobalAlertMessageContextProvider from "../context/globalAlertMessageContext";
import ToggleColorMode from "../components/ToggleColorMode";

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
