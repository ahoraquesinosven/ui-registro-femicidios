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
          <Link className="navbar-brand" /*href="#"*/ to="/">Registro de Femicidios</Link>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a
                className='btn btn-light'
                href="https://docs.google.com/forms/d/e/1FAIpQLSekOpLfYzPmzFMoPWwpfQw7VlMHBrraXwvAZyxNswl6ls2VJg/viewform"
                target='_blank'
              >
                Cargar un caso nuevo
              </a>
            </li>
            <li className="nav-item">
              <a
                className='btn btn-light ms-2'
                href="https://docs.google.com/spreadsheets/d/1X7qtXEYP99IGLu9Wtq4ZaJAgP-Jq6ANhseAb_7kfhBg/edit?gid=918511545#gid=918511545"
                target='_blank'>
                Consultar casos
              </a>
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
