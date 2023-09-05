import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Routes,
  Route,
} from 'react-router-dom';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

interface User {
  email?: string;
  password?: string;
}
interface Store {
  user?: User;
  setUser?: Dispatch<SetStateAction<User | undefined>>;
}

export const StoreContext = createContext<Store>({});

function App() {
  const [user, setUser] = useState<User>();

  return (
    <StoreContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route element={<UnAuthenticatedRoutes />}>
            <Route path='/' element={<Auth />} />
          </Route>
          <Route element={<AuthenticatedRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </StoreContext.Provider>
  );
}

export default App;

const AuthenticatedRoutes = () => {
  const { user } = useContext(StoreContext);

  if (user?.email && user.email.length > 3) {
    return <Outlet />;
  }
  return <Navigate to='/' />;
};

const UnAuthenticatedRoutes = () => {
  const { user } = useContext(StoreContext);

  if (!user || user.email?.length === 0) {
    return <Outlet />;
  }
  return <Navigate to='/dashboard' />;
};
