import { Typography } from "@mui/material";
import { Box } from "@mui/material";

function About() {
  return (
    <Box>
      <Typography fontSize={28} sx={{
        mt: 2,
        mb: 2
      }}>About This Site</Typography>
      <Typography fontSize={18}>
        Welcome to Shinonome Website, this is a collection of utils and other demos that I develop to
        pratice my skills. No correctnees, in-time bug fix or other guarantees.
        However, you are still welcomed to give me some suggestions and I will
        reply it. You can find out my contacts in the side-menu.
      </Typography>
      <Typography fontSize={18}>
        You can use the menus and the sub-menus in the app bar to find the tools you need in the website.
      </Typography>
    </Box>
  );
}

export default About;
