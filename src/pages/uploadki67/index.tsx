
import React, { useState } from 'react';
import Ki67Form from '../../components/ki67/ki67Form';
import { useRouter } from 'next/router';
import loginAuth from '@/utils/auth/loginAuth';
import {ImageData} from '../../types/updateki67file/interfaces'



const Ki67Page: React.FC = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const handleUpdatedImage = ( data:ImageData) => {
    console.log('image updated');
    console.log(data.original_image);
    setImageData(data);
  };

  return (
    <div>
      <h1>Upload KI-67 Image</h1>
      <Ki67Form  onUpdateFile= {handleUpdatedImage} />
      {imageData && (
        <div>
          <img src={`data:image/jpeg;base64,${imageData.original_image}`} alt="Original" />
          <img src={`data:image/jpeg;base64,${imageData.converted_image}`} alt="Processed" />
          <p>Ki67 Index: {imageData.ki67}</p>
          <p>Positive Cells: {imageData.positive}</p>
          <p>Total Cells: {imageData.total}</p>
        </div>
      )}
    </div>
  );
};

export default loginAuth( Ki67Page);
