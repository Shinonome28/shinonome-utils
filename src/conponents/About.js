import { Typography } from "@mui/material";
import { Box } from "@mui/material";

function About() {
  return (
    <Box>
      <Typography fontSize={28} sx={{
        mt: 2,
        mb: 2
      }}>About this project</Typography>
      <Typography fontSize={18}>
        Welcome to Ciao Toolbox, this is a collection of utils that I develop to
        pratice my shills. No correctnees, in-time bug fix or other guarantees.
        However, you are still welcomed to give me some suggestions and I will
        reply it. You can find out my contacts in the following.
      </Typography>
    </Box>
  );
}

export default About;
