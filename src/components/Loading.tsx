import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export function BlockLoader() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: 5 }}>
      <CircularProgress />
    </Box>
  );
}
