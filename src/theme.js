import { ThemeProvider, createTheme } from "@mui/material";

const noButtonTextTransformTheme = createTheme({
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiStepButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default function UseTheme(props) {
  return (
    <ThemeProvider theme={noButtonTextTransformTheme}>
      {props.children}
    </ThemeProvider>
  );
}
