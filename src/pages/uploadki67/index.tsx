
import React, { useState } from 'react';
import Ki67Form from '../../components/ki67/ki67Form';
import loginAuth from '@/utils/auth/loginAuth';
import {ImageData} from '../../types/updateki67file/interfaces'



const Ki67Page: React.FC = () => {
  const [imagesData, setImagesData] = useState<ImageData[]>([]);

  const handleUpdatedImage = ( data:ImageData, index: number) => {
    const newImageInfo: ImageData = {
      name: data.name,
      original_image: data.original_image,
      converted_image: data.converted_image,
      ki67: data.ki67,
      positive: data.positive,
      total: data.total,
      index: index
    };
    setImagesData(prevImages => [...prevImages, newImageInfo]);
  };

  return (
    <div>
      <h1>Upload KI-67 Image</h1>
      <Ki67Form  onUpdateFile= {handleUpdatedImage} />
      {imagesData.length > 0 && (
      imagesData.map((image, index) => (
        <div key={index}>
          <img src={`data:image/jpeg;base64,${image.original_image}`} alt="Original" />
          <img src={`data:image/jpeg;base64,${image.converted_image}`} alt="Processed" />
          <p>Ki67 Index: {image.ki67}</p>
          <p>Positive Cells: {image.positive}</p>
          <p>Total Cells: {image.total}</p>
        </div>
      ))
    )}
    </div>
  );
};

export default loginAuth( Ki67Page);
