import {
  IconButton,
  Toolbar,
  Typography,
  Box,
  AppBar,
  Menu,
  MenuItem,
  Stack,
  Drawer,
  ListItem,
  List,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext, useState } from "react";
import { ColorModeContext } from "./ToggleColorMode";
import { Link, useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import useGetTr from "../hooks/useGetTr";
import { CurrentLanguageContext } from "../context/userLanguageSettingContext";
import { Check } from "@mui/icons-material";
import SiteConfiguration from "../siteConfiguration";

function AppBarTypeA() {
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [archorsEls, setArchorEls] = useImmer({});
  const [sidebarOpenState, setSidebarOpenState] = useState(false);
  const toggleSidebar = (isOpen) => {
    if (isOpen !== undefined) {
      setSidebarOpenState(isOpen);
      return;
    }
    setSidebarOpenState(sidebarOpenState === true ? false : true);
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
  const tr = useGetTr(["menu-config", "display-languages"]);

  const changeCurrentLanguage = useContext(
    CurrentLanguageContext
  ).changeCurrentLanguage;
  const currentLanguage = useContext(CurrentLanguageContext).currentLanguage;

  const generatorsSubMenuConfig = {};
  generatorsSubMenuConfig[tr("nav-sublist-string-utils")] = "/string-utils";
  const calculatorsSubMenuConfig = {};
  calculatorsSubMenuConfig[tr("nav-sublist-uncertainty-calculators")] =
    "/uncertainty-calculator";
  const menuConfig = {};
  menuConfig[tr("nav-list-generators")] = generatorsSubMenuConfig;
  menuConfig[tr("nav-list-calculator")] = calculatorsSubMenuConfig;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Box
            sx={{
              display: {
                md: "none",
                xs: "",
              },
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={() => toggleSidebar(true)}
              sx={{
                mr: 2,
              }}
            >
              <MenuIcon></MenuIcon>
            </IconButton>
            <Drawer
              anchor="left"
              open={sidebarOpenState}
              onClose={() => toggleSidebar(false)}
            >
              <Box
                onClick={() => toggleSidebar(false)}
                onKeydown={(event) => {
                  if (
                    event.type === "keydown" &&
                    (event.key === "Tab" || event.key === "Shift")
                  ) {
                    return;
                  }
                  toggleSidebar(false);
                }}
                sx={{
                  width: 250,
                }}
              >
                <List>
                  {Object.keys(menuConfig).map((key) => (
                    <ListItem key={key} divider>
                      <Box>
                        <Typography>{key}</Typography>
                        <Box>
                          <List>
                            {Object.keys(menuConfig[key]).map((subKey) => (
                              <ListItem key={subKey}>
                                <Link
                                  to={menuConfig[key][subKey]}
                                  style={{
                                    textDecoration: "none",
                                  }}
                                >
                                  <Typography>{subKey}</Typography>
                                </Link>
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>

          <Stack
            direction="row"
            spacing={0}
            sx={{
              flexGrow: 1,
            }}
          >
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
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                flexGrow: 1,
                display: {
                  md: "flex",
                  xs: "none",
                },
              }}
            >
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
                    {key}
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
            </Stack>
          </Stack>

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
            <Box
              sx={{
                display: "inline-block",
              }}
            >
              <IconButton
                color="inherit"
                size="medium"
                aria-label="settings"
                onClick={(event) => handleNavMenuOpen("settings-menu", event)}
              >
                <SettingsIcon></SettingsIcon>
              </IconButton>

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
                open={Boolean(archorsEls["settings-menu"])}
                onClose={(event) => handleNavMenuClose("settings-menu", event)}
                anchorEl={archorsEls["settings-menu"]}
              >
                {SiteConfiguration.supportLanguages.map((lang) => (
                  <MenuItem
                    key={lang}
                    onClick={() => changeCurrentLanguage(lang)}
                    selected={lang === currentLanguage}
                  >
                    {lang === currentLanguage ? (
                      <>
                        <ListItemIcon>
                          <Check />
                        </ListItemIcon>
                        {tr(lang)}
                      </>
                    ) : (
                      <ListItemText
                        sx={{
                          textAlign: "right",
                        }}
                      >
                        {tr(lang)}
                      </ListItemText>
                    )}
                  </MenuItem>
                ))}
                {/* <Divider /> */}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppBarTypeA;
