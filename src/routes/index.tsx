import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import FeedIndex from './feed/Index';
import CasesIndex from './cases';
import CasesNew from './cases/new';
import CasesEdit from './cases/edit';
import { AuthorizationCallback } from '@/hooks/auth';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/oauth/cb' element={<AuthorizationCallback />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<FeedIndex />} />
          <Route path='/cases' element={<CasesIndex />} />
          <Route path='/cases/new' element={<CasesNew />} />
          <Route path='/cases/edit/:case_id' element={<CasesEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
