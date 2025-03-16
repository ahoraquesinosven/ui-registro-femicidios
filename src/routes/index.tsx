import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Layout} from '@/components/Layout';
import {Feed} from './Feed';
import FormContainer from '@/components/FormContainer';
import {AuthorizationCallback} from '@/hooks/auth';
import CaseList from '@/components/CaseList';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/oauth/cb' element={<AuthorizationCallback />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/form' element={<FormContainer />} />
          <Route path='/list' element={<CaseList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
