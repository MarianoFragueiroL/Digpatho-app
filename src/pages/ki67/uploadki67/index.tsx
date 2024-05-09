
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
      ia_ki67: data.ia_ki67,
      ia_positive_cells: data.ia_positive_cells,
      ia_total_cells: data.ia_total_cells,
      index: index,
      url_image_upload: data.url_image_upload,
      url_ia_image_result: data.url_ia_image_result,
    };
    setImagesData(prevImages => [...prevImages, newImageInfo]);
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.title}>
        <h1>Upload KI-67 Image</h1>
      </div>
      {imagesData.length == 0 && (
        <div className={'container'+styles.c_card}>
          <Ki67Form  onUpdateFile= {handleUpdatedImage} />
        </div>
      )}
      {imagesData.length > 0 && (
      imagesData.map((image, index) => (
        <div className={'container'+styles.c_card} key={index}>
          <div className='d-flex'>
              <div className='col-4 m-3'>
                <img className='w-100' src={`${image.url_image_upload}`} alt="Original" />
              </div>
              <div className='col-4 m-3 d-flex flex-column'>
                <img className='w-100' src={`${image.url_ia_image_result}`} alt="Processed" />
                <div className='d-flex '>
                  <div className='d-flex flex-column'>
                    <label className={styles.formLabel}>IA KI67</label>
                    <input value={image.ia_ki67}/>
                  </div>
                  <div className='d-flex flex-column'>
                      <label className={styles.formLabel}>IA TOTAL CELLS</label>
                      <input value={image.ia_total_cells}/>
                  </div>
                </div>
                <div className='d-flex '>
                    <div className='d-flex flex-column'>
                      <label className={styles.formLabel}>IA POSITVE CELLS</label>
                      <input value={image.ia_positive_cells}/>
                    <div className='d-flex flex-column'>
                      <label className={styles.formLabel}>IA NEGATIVE CELLS</label>
                      <input value={image.ia_total_cells}/>
                  </div>
                </div>
                </div>
              </div>
              <div  className='col-4'>
                <input/>
             </div>
          </div>
        </div>
      ))
    )}
    </div>
  );
};

export default loginAuth( Ki67Page);
