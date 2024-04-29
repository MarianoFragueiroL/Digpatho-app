
import React from 'react';
import Ki67Form from '../../components/ki67/ki67Form';
import { useRouter } from 'next/router';

const Ki67Page: React.FC = () => {
  const router = useRouter();


  return (
    <div>
      <h1>Upload KI-67 Image</h1>
      <Ki67Form  />
    </div>
  );
};

export default Ki67Page;
