import { Outlet, Link as RouterLink } from '@tanstack/react-router';
import { useQuery } from 'react-query';
import UserAvatar from '@/components/UserAvatar';
import { fetchCurrentUser } from '@/api/aqsnv/profiles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ButtonLink } from '@/components/links';

const navLinkActiveProps = {
  sx: { backgroundColor: 'rgba(255, 255, 255, 0.16)', fontWeight: 600 },
};
// Match on pathname only: `exact` so "/" (Noticias) doesn't match every route, and
// `includeSearch: false` so "Consultar casos" stays highlighted with filters in the URL.
const navLinkActiveOptions = { exact: true, includeSearch: false } as const;

// The Toolbar links differ only in their destination — preset the shared color and
// active styling here. Typed as `typeof ButtonLink` (a TanStack LinkComponent) so the
// typed `to`/`params` survive the wrapper.
const AppBarLink: typeof ButtonLink = (props) => (
  <ButtonLink
    color="inherit"
    activeProps={navLinkActiveProps}
    activeOptions={navLinkActiveOptions}
    {...props}
  />
);

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
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          <AppBarLink to="/cases/new">Cargar caso</AppBarLink>
          <AppBarLink to="/cases">Consultar casos</AppBarLink>
          <AppBarLink to="/">Noticias</AppBarLink>
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
