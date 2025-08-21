import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from '@/components/Layout';
import FeedIndex from './feed/Index';
import CasesIndex from './cases';
import CasesNew from './cases/new';
import {AuthorizationCallback} from '@/hooks/auth';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/oauth/cb' element={<AuthorizationCallback />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<FeedIndex />} />
          <Route path='/cases' element={<CasesIndex />} />
          <Route path='/cases/new' element={<CasesNew />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
