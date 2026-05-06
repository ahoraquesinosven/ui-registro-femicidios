import {Outlet} from 'react-router-dom';
import {useQuery} from 'react-query';
import UserAvatar from '@/components/UserAvatar';
import {useAccessToken, RequiresAuthorization} from '@/hooks/auth';
import {fetchCurrentUser} from '@/api/aqsnv/profiles';
import { Link } from 'react-router-dom';

function UserPic() {
  const token = useAccessToken();
  const {data} = useQuery({
    queryKey: ["me"],
    queryFn: () => fetchCurrentUser(token),
  });


  if (data) {
    return (
      <div className="navbar-nav dflex">
        <UserAvatar user={data} showName={false} />
      </div>
    );
  } else {
    return (
      <></>
    );
  }
}

function Nav() {
  return (
    <div className="container my-3">
      <nav className="navbar bg-warning navbar-expand-lg rounded-4 py-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Registro de Femicidios</Link>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="btn btn-light" to="/cases/new">
                Cargar un caso nuevo
              </Link>
            </li>
            <li className="nav-item">
              <Link className='btn btn-light ms-2' to="/cases">
                Consultar casos
              </Link>
            </li>
          </ul>
          <UserPic />
        </div>
      </nav>
    </div>
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
