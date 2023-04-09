import {
  IconButton,
  Toolbar,
  Typography,
  Box,
  AppBar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext } from "react";
import { ColorModeContext } from "./ToggleColorMode";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";

function MainAppBar() {
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [archorsEls, setArchorEls] = useImmer({});
  const menuConfig = {
    Generators: {
      "String Utils": "/string-utils",
    },
  };

  const handleNavMenuClose = (key, event) => {
    setArchorEls((draft) => {
      draft[key] = null;
    });
  };

  const handleNavMenuOpen = (key, event) => {
    setArchorEls((draft) => {
      draft[key] = event.currentTarget;
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon></MenuIcon>
          </IconButton>

          <Typography
            variant="h6"
            component="a"
            sx={{
              textDecoration: "none",
              color: "inherit",
              mr: 2,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Shinonome Site
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            {Object.keys(menuConfig).map((key) => (
              <Box key={`navmenu-${key}`}>
                <Typography
                  fontSize={16}
                  fontWeight={500}
                  component="a"
                  onClick={(event) => handleNavMenuOpen(key, event)}
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  {key.toUpperCase()}
                </Typography>
                <Menu
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(archorsEls[key])}
                  onClose={(event) => handleNavMenuClose(key, event)}
                  anchorEl={archorsEls[key]}
                >
                  {Object.keys(menuConfig[key]).map((subKey) => {
                    return (
                      <MenuItem
                        onClick={(event) => handleNavMenuClose(key, event)}
                        key={`navsubmenu-${key}-${subKey}`}
                      >
                        <Typography
                          textAlign="center"
                          component="a"
                          onClick={() => navigate(menuConfig[key][subKey])}
                          sx={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          {subKey}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Box>
            ))}
          </Box>

          <Box>
            <IconButton
              color="inherit"
              aria-label="brightness"
              size="medium"
              onClick={colorMode.toggleColorMode}
            >
              {colorMode.currentMode === "light" ? (
                <Brightness4Icon />
              ) : (
                <Brightness7Icon />
              )}
            </IconButton>
            <IconButton color="inherit" size="medium" aria-label="settings">
              <SettingsIcon></SettingsIcon>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainAppBar;
