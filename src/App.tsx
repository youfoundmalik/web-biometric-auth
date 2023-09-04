import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Routes,
  Route,
} from 'react-router-dom';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} /> */}
        <Route element={<UnAuthenticatedRoutes />}>
          <Route path='/' element={<Auth />} />
        </Route>
        <Route element={<AuthenticatedRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  );
}

export default App;

const AuthenticatedRoutes = () => {
  const isAuth = false;
  if (isAuth) {
    return <Outlet />;
  }
  return <Navigate to='/' />;
};

const UnAuthenticatedRoutes = () => {
  const isAuth = false;
  if (!isAuth) {
    return <Outlet />;
  }
  return <Navigate to='/dashboard' />;
};
