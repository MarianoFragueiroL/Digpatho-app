// components/withAuth.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextPage } from 'next';
import {verifyToken} from './auth'

const withAuth = <P extends object>(WrappedComponent: NextPage<P>): NextPage<P> => {
  return (props: P) => {
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
          const token = localStorage.getItem('token'); // Este método solo funciona en el cliente
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

export default withAuth;

