import {Outlet} from 'react-router-dom';
import {useQuery} from 'react-query';
import {useAccessToken} from './hooks/auth';
import {getCurrentUser} from './api/aqsnv/auth';

const UserPic = () => {
  const token = useAccessToken();
  const {data} = useQuery({
    queryKey: ["me"],
    queryFn: () => getCurrentUser(token.accessToken!),
  });


  if (data) {
    return (
      <div className="navbar-nav dflex align-items-center">
        <img src={data.pictureUrl} style={{width: "2em", height: "2em", borderRadius: "50%"}} className='me-1' />
        <span className="navbar-text">{data.name}</span>
      </div>
    );
  } else {
    return (
      <></>
    );
  }
};

const Nav = () => {
  return (
    <nav className="navbar bg-body-tertiary navbar-expand-lg" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Registro de Femicidios</a>
        <UserPic />
      </div>
    </nav>
  );
}

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default Layout;

