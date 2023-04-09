import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { createContext, useMemo, useState } from "react";

const ColorModeContext = createContext();

function ToggleColorMode(props) {
  const isPreferDarkMode = useMediaQuery("(prefers-color-scheme: dark");
  const [mode, setMode] = useState(isPreferDarkMode ? "dark" : "light");
  const colorMode = useMemo(() => {
    return {
      toggleColorMode() {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      currentMode: mode,
    };
  }, [mode]);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleColorMode;
export { ColorModeContext };
