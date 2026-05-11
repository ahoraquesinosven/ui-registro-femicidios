import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function BlockLoader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', m: 5 }}>
      <CircularProgress />
    </Box>
  );
}
