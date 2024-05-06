import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { NextPage } from 'next';
import { verifyToken } from './auth'
import { isLoggedContext, isAllowedContext } from '@/context/AppContext';


const loginAuth = <P extends object>(WrappedComponent: NextPage<P>): NextPage<P> => {
  
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const { setIsLogged } = isLoggedContext();
    const { setIsAllowed } = isAllowedContext();

    useEffect(() => {
        async function checkAuth() {
          const token = localStorage.getItem('token');
          const isValidToken = token ? await verifyToken(token) : false;
          if (!isValidToken) {
            setIsLogged(false);
            setIsAllowed(false);
            localStorage.setItem("isLogged", "false");
            router.replace('/auth/login');
          }
        }
  
        checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
  AuthComponent.displayName = `loginAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return AuthComponent;
};

export default loginAuth;
