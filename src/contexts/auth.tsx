import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

interface IUser {
  email: string;
  avatarUrl: string;
}

type AuthContextType = {
  user: IUser | null;
  loading: boolean
  logIn?: (email: string, password: string) => Promise<void>;
  logOut?: any;
};
const AuthContext = createContext<AuthContextType>({user: null, loading: false});
const useAuth = () => useContext(AuthContext);
const defaultUser = {
  email: 'sandra@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
}

function AuthProvider(props: any) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const logIn = useCallback(async (email, password) => {
    // Send login request
    console.log(email, password);

    setUser({
      email,
      avatarUrl: defaultUser.avatarUrl
    });
  }, []);

  const logOut = useCallback(() => {
    // Clear user data

    setUser(null);
  }, []);

  useEffect(() => {
    // Retrieve and save user data on initial load

    setUser(defaultUser);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, loading }} {...props} />
  );
}

export { AuthProvider, useAuth }
