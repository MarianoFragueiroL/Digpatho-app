import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextPage } from 'next';
import {verifyToken} from './auth'

const loginAuth = <P extends object>(WrappedComponent: NextPage<P>): NextPage<P> => {
  return (props: P) => {
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
          const token = localStorage.getItem('token');
          
          const isValidToken = token ? await verifyToken(token) : false;          
          if (!isValidToken) {
            router.replace('/auth/login');
          }
        }
  
        checkAuth();
      }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default loginAuth;

