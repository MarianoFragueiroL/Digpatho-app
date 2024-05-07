import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextPage } from 'next';
import { verifyToken } from './auth'
import { useLoggedContext, useAllowedContext } from '@/context/AppContext';
import { useLoader } from '@/context/LoaderContext';

const loginAuth = <P extends object>(WrappedComponent: NextPage<P>): NextPage<P> => {
  
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const { setLoading } = useLoader();
    const { setIsLogged } = useLoggedContext();
    const { setIsAllowed } = useAllowedContext();

    useEffect(() => {
      async function checkAuth() {
        const token = localStorage.getItem('token');
        setLoading(true);
        const isValidToken = token ? await verifyToken(token) : false;
        setIsLogged(isValidToken);
        localStorage.setItem("isLogged", isValidToken ? "true" : "false");
        if (!isValidToken ) {
          setLoading(false);
          router.replace('/auth/login');
        }
        setLoading(false);
      }
  
      checkAuth();
  }, [router, setIsLogged, setIsAllowed, setLoading]);

    return <WrappedComponent {...props} />;
  };
  AuthComponent.displayName = `loginAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return AuthComponent;
};

export default loginAuth;
