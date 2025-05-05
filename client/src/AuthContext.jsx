import { createContext, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [users, setUser] = useState(null);
  const history = useHistory();

  // Check if the token has expired
  const checkTokenExpiry = () => {
    const token = sessionStorage.getItem('authToken');
    const expiryTime = sessionStorage.getItem('tokenExpiryTime');

    if (token && expiryTime) {
      if (Date.now() > expiryTime) {
        logout();
        return false;
      }
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('tokenExpiryTime');
    setUser(null);
    history.push('/login'); // Redirect to login after logout
  };



  useEffect(() => {
    if (!checkTokenExpiry()) {
      history.push('/login'); // Redirect to login if token is expired
    }
  }, []);

  return (
    <AuthContext.Provider value={{ users, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
