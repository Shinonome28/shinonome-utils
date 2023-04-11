import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

export default function useAtleastScreenSize({ breakpoint, sizeInPixels }) {
  const alwaySuccessMediaQuery = "(min-width: 0px)";
  const theme = useTheme();
  const matchBreakPoint = useMediaQuery(
    breakpoint ? theme.breakpoints.up(breakpoint) : alwaySuccessMediaQuery
  );
  const matchSizeInPixels = useMediaQuery(
    sizeInPixels ? `(min-width: ${sizeInPixels}px)` : alwaySuccessMediaQuery
  );
  return matchBreakPoint && matchSizeInPixels;
}
