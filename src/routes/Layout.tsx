import { Outlet, Link as RouterLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import UserAvatar from '@/components/UserAvatar';
import { useAccessToken, RequiresAuthorization } from '@/hooks/auth';
import { fetchCurrentUser } from '@/api/aqsnv/profiles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function UserPic() {
  const token = useAccessToken();
  const { data } = useQuery({
    queryKey: ["me", token],
    queryFn: () => fetchCurrentUser(token),
  });

  if (data) {
    return <UserAvatar user={data} showName={false} />;
  }
  return null;
}

function Nav() {
  return (
    <AppBar position="static" sx={{marginBottom: "1em"}} color='secondary'>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: 'none', color: 'inherit', mr: 2 }}
        >
          Registro de Femicidios
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={RouterLink} to="/cases/new">
            Cargar caso
          </Button>
          <Button color="inherit" component={RouterLink} to="/cases" sx={{ ml: 1 }}>
            Consultar casos
          </Button>
          <Button color="inherit" component={RouterLink} to="/" sx={{ ml: 1 }}>
            Noticias
          </Button>
        </Box>
        <UserPic />
      </Toolbar>
    </AppBar>
  );
}

export default function Layout() {
  return (
    <RequiresAuthorization>
      <Nav />
      <Outlet />
    </RequiresAuthorization>
  );
}
