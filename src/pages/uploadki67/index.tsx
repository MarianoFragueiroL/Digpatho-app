
import React from 'react';
import Ki67Form from '../../components/ki67/ki67Form';
import { useRouter } from 'next/router';
import loginAuth from '@/utils/auth/loginAuth';

const Ki67Page: React.FC = () => {
  const router = useRouter();


  return (
    <div>
      <h1>Upload KI-67 Image</h1>
      <Ki67Form  />
    </div>
  );
};

export default loginAuth( Ki67Page);
