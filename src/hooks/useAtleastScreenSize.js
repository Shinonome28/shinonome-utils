import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

export default function useAtleastScreenSize({ breakpoint, sizeInPixels }) {
  const alwaysSuccessMediaQuery = "(min-width: 0px)";
  const theme = useTheme();
  const matchBreakPoint = useMediaQuery(
    breakpoint ? theme.breakpoints.up(breakpoint) : alwaysSuccessMediaQuery
  );
  const matchSizeInPixels = useMediaQuery(
    sizeInPixels ? `(min-width: ${sizeInPixels}px)` : alwaysSuccessMediaQuery
  );
  return matchBreakPoint && matchSizeInPixels;
}
