import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

interface IUser {
  username: string;
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
  username: 'أحمد عتال',
  avatarUrl: 'https://media-exp1.licdn.com/dms/image/C4E03AQFR22tJZ3KvpQ/profile-displayphoto-shrink_400_400/0/1636040503228?e=1671667200&v=beta&t=hAc_sAXPfyLgqFlBzujnRDvot7VvoZydSEDvE36GaVM'
}

function AuthProvider(props: any) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const logIn = useCallback(async (username, password) => {
    // Send login request
    console.log(username, password);

    setUser({
      username: username,
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
