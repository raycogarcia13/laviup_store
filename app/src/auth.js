import { 
  createContext, 
  useContext, 
  useState 
} from "react";
import { useNavigate, Navigate } from 'react-router-dom';
import localStorageUtil from "./utils/storage";

const AuthContext = createContext(null);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorageUtil.getToken());
  const [user, setUser] = useState(localStorageUtil.get('user')?localStorageUtil.get('user').user:null);

  const handleLogin = (data) => {

    if(data.user?.role){
        console.log('auth', data)
        setToken(data.token);
        setUser(data.user);
        localStorageUtil.setToken(data.token);
        console.log(data.user)
        localStorageUtil.set(data.user,'user');
  
        const {rol} = data.user.role;
        switch(rol){
          case 'Administrador':
            navigate('/admin',{replace:true});
            break;
          case 'Store':
            navigate('/store',{replace:true});
            break;
        } 
      }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorageUtil.clearToken();
    localStorageUtil.clear('user');

    navigate('/login',{replace:true});
  };

  const value = {
    token,
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedRoute = ({ children }) => {
  const token = localStorageUtil.getToken();
  const user = localStorageUtil.get('user');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const NoAuthRoute = ({ children }) => {
  const { token,user } = useAuth();

  if (token && user) {
    const {rol} = user.role;
    let val=<Navigate to="/" replace />;
    switch(rol){
      case 'Administrador':
        val = <Navigate to="/admin" replace />;
        break;
      case 'Store':
        val = <Navigate to="/store" replace />;
        break;
    } 
    return val
  }

  return children;
};


export {
  useAuth,
  AuthProvider,
  ProtectedRoute,
  NoAuthRoute
}

