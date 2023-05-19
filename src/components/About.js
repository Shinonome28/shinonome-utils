import {
  Divider,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Box,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import useGetTr from "../hooks/useGetTr";

export default function About() {
  const tr = useGetTr(["about-site", "update-logs"]);
  const updateLogs = [
    ["5/8/2023", tr("update-log-2")],
    ["4/11/2023", tr("update-log-1")],
  ];

  return (
    <Box>
      <Typography
        fontSize={28}
        sx={{
          mt: 2,
          mb: 2,
        }}
      >
        {tr("title")}
      </Typography>
      <Typography fontSize={18}>{tr("about")}</Typography>
      <Divider
        sx={{
          mt: 2,
          mb: 1,
        }}
      ></Divider>
      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => window.open("https://github.com/Shinonome28")}
            >
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText>{tr("contact-github")}</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => window.open("mailto://coderbaka@outlook.com")}
            >
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText>{tr("contact-email")}</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider
        sx={{
          mt: 2,
          mb: 1,
        }}
      ></Divider>
      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemText>
              <Typography variant="h6">{tr("update-notice")}</Typography>
            </ListItemText>
          </ListItem>
          {updateLogs.map((item) => (
            <ListItem disablePadding key={item[0]}>
              <ListItemText>
                {item[0]} {item[1]}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
