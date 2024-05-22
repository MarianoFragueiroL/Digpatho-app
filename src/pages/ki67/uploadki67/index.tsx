
import React, { useState, FormEvent } from 'react';
import Ki67Form from '../../../components/ki67/ki67Form';
import loginAuth from '@/utils/auth/loginAuth';
import {ImageData, ErrorsUpdateValuesImage} from '../../../types/ki67/interfaces'
import styles from './uploadki67.module.css'
import { useLoader } from '@/context/LoaderContext';
import API from '../../../utils/API';
import { allUrl } from '@/types/urlsvariables';
import ImageModal from '@/components/image_modal/ImageModal ';



const Ki67Page: React.FC = () => {
  const [imagesData, setImagesData] = useState<ImageData[]>([]);
  const { setLoading } = useLoader();
  const [errors, setErrors] = useState<ErrorsUpdateValuesImage>({});



  const handleUpdatedImage = ( data:ImageData, index: number) => {
    const newImageInfo: ImageData = {
      id: data.id,
      name: data.name,
      ia_ki67: data.ia_ki67,
      ia_positive_cells: data.ia_positive_cells,
      ia_negative_cells: data.ia_negative_cells,
      ia_total_cells: data.ia_total_cells,
      index: index,
      url_image_upload: data.url_image_upload,
      url_ia_image_result: data.url_ia_image_result,
      doc_ki67: data.ia_ki67,
      doc_total_cells: data.ia_total_cells,
      doc_positive_cells: data.ia_positive_cells,
      doc_negative_cells: data.ia_negative_cells||0,
      doc_wrong_negative_cells: [],
      doc_wrong_positive_cells: [],
      doc_add_negative_cells: [],
      doc_add_positive_cells: [],
    };
    setImagesData(prevImages => [...prevImages, newImageInfo]);
  };

  const updateImageInfo = (index: number, newValues: Partial<ImageData>) => {
    setImagesData(prevImages => prevImages.map((image, idx) => {
      if (idx === index) {
        return { ...image, ...newValues };
      }
      return image;
    }));
  };

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof ImageData) => {
    const values = e.target.value.split(/[;,]/).map(item => item.trim());        
    let newValues: Partial<ImageData> = {};
    let doc_wrong_positives_cells: string[] = imagesData[index].doc_wrong_positive_cells||[];
    let doc_add_positive_cells: string[] = imagesData[index].doc_add_positive_cells||[];
    let doc_add_negative_cells: string[] = imagesData[index].doc_add_negative_cells||[];
    let doc_wrong_negative_cells: string[] = imagesData[index].doc_wrong_negative_cells||[];
    let negativesTotal: number = imagesData[index].doc_negative_cells;
    let positive: number = imagesData[index].ia_positive_cells || 0;
    let total: number = imagesData[index].ia_total_cells || 0;
    let iaNegative: number = imagesData[index].ia_negative_cells || 0;
    
    if (field === 'doc_wrong_negative_cells' || field === 'doc_wrong_positive_cells' || field === 'doc_add_negative_cells' || field === 'doc_add_positive_cells') {
      newValues[field] = values;  // Assigning string array directly      
    }
    
    positive = positive +  doc_add_positive_cells.length - doc_wrong_positives_cells.length;
    negativesTotal = iaNegative + doc_add_negative_cells.length - doc_wrong_negative_cells.length;

    total =  positive + negativesTotal;
    
    newValues.doc_ki67 = total > 0 ? (positive/ total) * 100 : 0;

    newValues.doc_total_cells = total;
    newValues.doc_positive_cells = positive;
    newValues.doc_negative_cells = negativesTotal;
    updateImageInfo(index, newValues);
  };
  const handleUpdateValues = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await API.put( `${allUrl.bkUpdateki67ImageData}${imagesData[0].id}`, imagesData[0]);
      console.log(response);
      if(response.status){
        console.log(response);
        
      }
    } catch (err:any) {
      console.log(err);
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      }
      console.log('Failed to login');
    } finally {
      setLoading(false);
    }
    
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
        <div className={'container '+styles.c_card} key={index}>
          <div className='d-flex'>
              <div className='col-4 m-3'>
                <img className='w-100' src={`${image.url_image_upload}`} alt="Original" />
              </div>
              <div className='col-4 m-3 d-flex flex-column'>
              <div>
                <ImageModal src={image.url_ia_image_result} alt="Processed" />
              </div>
                <div className='d-flex '>
                  <div className='d-flex flex-column'>
                    <label className={styles.formLabel}>IA KI67</label>
                    <input type='text'  value={image.ia_ki67} disabled />
                  </div>
                  <div className='d-flex flex-column'>
                      <label className={styles.formLabel}>IA TOTAL CELLS</label>
                      <input type='text' value={image.ia_total_cells} disabled />
                  </div>
                </div>
                <div className='d-flex '>
                  <div className='d-flex flex-column'>
                    <label className={styles.formLabel}>IA POSITVE CELLS</label>
                    <input type='text' value={image.ia_positive_cells} disabled/>
                  </div>
                  <div className='d-flex flex-column'>
                    <label className={styles.formLabel}>IA NEGATIVE CELLS</label>
                    <input type='text' value={image.ia_negative_cells} disabled/>
                  </div>
                </div>
              </div>
              <div  className='col-4 '>
                <form className='d-flex flex-wrap' onSubmit={handleUpdateValues}>
                  <div  className='d-flex flex-column col-4 m-3'>
                    <div  className='d-flex flex-column'>
                      <label className={styles.formLabel}>KI67</label>
                      <input type='text' value={image.doc_ki67} name='doc_ki67' disabled/>
                    </div>
                    <div className='d-flex flex-column'>
                        <label className={styles.formLabel}>TOTAL CELLS</label>
                        <input type='text' name='doc_total_cells' value={image.doc_total_cells} disabled />
                    </div>
                  </div>
                  <div  className='d-flex flex-column col-4 m-3'>
                    <div className='d-flex flex-column'>
                      <label className={styles.formLabel}>POSITVE CELLS</label>
                      <input type='text' name='doc_positive_cells' value={image.doc_positive_cells} disabled/>
                    </div>
                    <div className='d-flex flex-column'>
                      <label className={styles.formLabel}>NEGATIVE CELLS</label>
                      <input type='text' name='doc_negative_cells' value={image.doc_negative_cells} disabled/>
                    </div>
                    
                  </div>
                  <div  className='d-flex flex-column col-8 m-3'>
                  <div className='d-flex flex-column'>
                      <div className='d-flex flex-column'>
                        <label className={styles.formLabel}>WRONG POSITVE CELLS</label>
                        <input type='text' name='doc_wrong_positive_cells' onChange={(e) => handleInputChange(e, index, 'doc_wrong_positive_cells')}
                        className={errors.doc_wrong_positive_cells ? styles.error : ''}/>
                        {errors.doc_wrong_positive_cells && (
                          <span className="error-message">Make sure the last value is not a , or ;</span>
                        )}
                      </div>
                      <div className='d-flex flex-column'>
                        <label className={styles.formLabel}>WRONG NEGATIVE CELLS</label>
                        <input type='text' name='doc_wrong_negative_cells' onChange={(e) => handleInputChange(e, index, 'doc_wrong_negative_cells')} 
                        className={errors.doc_wrong_negative_cells ? styles.error : ''}/>
                        {errors.doc_wrong_negative_cells && (
                          <span className="error-message">Make sure the last value is not a , or ;</span>
                        )}
                      </div>
                  </div>
                  <div className='d-flex flex-column'>
                      <div className='d-flex flex-column'>
                        <label className={styles.formLabel}>ADD POSITVE CELLS</label>
                        <input type='text' name='doc_add_positive_cells' onChange={(e) => handleInputChange(e, index, 'doc_add_positive_cells')}
                        className={errors.doc_add_positive_cells ? styles.error : ''}/>
                        {errors.doc_add_positive_cells && (
                          <span className="error-message">Make sure the last value is not a , or ;</span>
                        )}
                      </div>
                      <div className='d-flex flex-column'>
                        <label className={styles.formLabel}>ADD NEGATIVE CELLS</label>
                        <input type='text' name='doc_add_negative_cells' onChange={(e) => handleInputChange(e, index, 'doc_add_negative_cells')} 
                        className={errors.doc_add_negative_cells ? styles.error : ''}/>
                        {errors.doc_add_negative_cells && (
                          <span className="error-message">Make sure the last value is not a , or ;</span>
                        )}
                      </div>
                  </div>
                  <div className=' d-flex align-items-center justify-content-end m-3'>
                    <button className='btn btn-success' type="submit" > Update Resutls </button>
                  </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
      ))
    )}
    </div>
  );
};

export default loginAuth( Ki67Page);
