import { Outlet, Link as RouterLink } from '@tanstack/react-router';
import { useQuery } from 'react-query';
import UserAvatar from '@/components/UserAvatar';
import { fetchCurrentUser } from '@/api/aqsnv/profiles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ButtonLink } from '@/components/links';

function UserPic() {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => fetchCurrentUser(),
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
          <ButtonLink color="inherit" to="/cases/new">
            Cargar caso
          </ButtonLink>
          <ButtonLink color="inherit" to="/cases" sx={{ ml: 1 }}>
            Consultar casos
          </ButtonLink>
          <ButtonLink color="inherit" to="/" sx={{ ml: 1 }}>
            Noticias
          </ButtonLink>
        </Box>
        <UserPic />
      </Toolbar>
    </AppBar>
  );
}

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
