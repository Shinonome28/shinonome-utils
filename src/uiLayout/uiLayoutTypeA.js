import { Box, Container, CssBaseline } from "@mui/material";
import AppBarTypeA from "../components/AppBarTypeA";
import ControlledAlert from "../components/ControlledAlert";
import ToggleColorMode from "../components/ToggleColorMode";
import GlobalAlertMessageContextProvider from "../context/globalAlertMessageContext";
import CurrentLanguageContextProvider from "../context/userLanguageSettingContext";

function UILayoutTypeA(props) {
  return (
    <ToggleColorMode>
      <CssBaseline />

      <GlobalAlertMessageContextProvider>
        <CurrentLanguageContextProvider>
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
        </CurrentLanguageContextProvider>
      </GlobalAlertMessageContextProvider>
    </ToggleColorMode>
  );
}

export default UILayoutTypeA;
