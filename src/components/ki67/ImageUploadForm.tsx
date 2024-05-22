import React from 'react';
import Ki67Form from './ki67Form';
import { ImageUploadFormProps } from '@/types/ki67/interfaces';



const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ onUpdateFile }) => {
  return (
    <div className="container">
      <Ki67Form onUpdateFile={onUpdateFile} />
    </div>
  );
};

export default ImageUploadForm;
