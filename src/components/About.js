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

export default function About() {
  return (
    <Box>
      <Typography
        fontSize={28}
        sx={{
          mt: 2,
          mb: 2,
        }}
      >
        About This Site
      </Typography>
      <Typography fontSize={18}>
        Welcome to Shinonome Website, this is a collection of utils and other
        demos that I develop to pratice my skills. No correctnees, in-time bug
        fix or other guarantees. However, you are still welcomed to give me some
        suggestions and I will reply it. You can find out my contacts below.You
        can use the menus and the sub-menus in the app bar to find the tools you
        need in the website.
      </Typography>
      <Divider
        sx={{
          mt: 2,
          mb: 1,
        }}
      ></Divider>
      <Box>
        <List>
          {/* <ListItem disablePadding>
            <ListItemText>Contace Me:</ListItemText>
          </ListItem> */}

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => window.open("https://github.com/Shinonome28")}
            >
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText>Contact Me On Github</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => window.open("mailto://coderbaka@outlook.com")}
            >
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText>Contact Me With Email</ListItemText>
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
            <ListItemText>Update notes:</ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText>4/11/2023 the first version</ListItemText>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
