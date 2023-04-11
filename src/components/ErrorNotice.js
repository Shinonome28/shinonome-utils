import { Typography, Box } from "@mui/material";
import { useState, useMemo } from "react";
import { Navigate } from "react-router-dom";

export default function ErrorNotice({ text }) {
  let [redirectCoutdown, setRedirectCountdown] = useState(10);
  let countdownInterval = useMemo(
    () =>
      setInterval(() => {
        setRedirectCountdown((redirectCoutdown) => redirectCoutdown - 1);
      }, 1000),
    []
  );
  if (redirectCoutdown <= 0) {
    clearInterval(countdownInterval);
  }
  return (
    <Box>
      <Typography fontWeight={500} fontSize={28} textAlign="center">
        {text}
      </Typography>
      <Typography fontWeight={400} fontSize={22} textAlign="center">
        After {redirectCoutdown} second(s) will redirect to home page.
      </Typography>
      {redirectCoutdown <= 0 ? <Navigate to="/" /> : null}
    </Box>
  );
}
