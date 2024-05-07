
import React, { useState } from 'react';
import Ki67Form from '../../../components/ki67/ki67Form';
import loginAuth from '@/utils/auth/loginAuth';
import {ImageData} from '../../../types/ki67/interfaces'
import styles from './uploadki67.module.css'


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
    <div className={styles.form_container}>
      <div className={styles.title}>
        <h1>Upload KI-67 Image</h1>

      </div>
      <Ki67Form  onUpdateFile= {handleUpdatedImage} />
      {imagesData.length > 0 && (
      imagesData.map((image, index) => (
        <div className='container ' key={index}>
          <div>
            <p>Ki67 Index: {image.ki67}</p>
            <p>Positive Cells: {image.positive}</p>
            <p>Total Cells: {image.total}</p>
          </div>
          <div className='d-flex'>
            <div className='col-6 m-3'>
              <img className='w-100' src={`data:image/jpeg;base64,${image.original_image}`} alt="Original" />

            </div>
            <div className='col-6 m-3'>
              <img className='w-100' src={`data:image/jpeg;base64,${image.converted_image}`} alt="Processed" />
            </div>
          </div>
        </div>
      ))
    )}
    </div>
  );
};

export default loginAuth( Ki67Page);
