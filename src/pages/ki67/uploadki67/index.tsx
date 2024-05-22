import React, { useState, FormEvent } from 'react';
import loginAuth from '@/utils/auth/loginAuth';
import { ImageData, ErrorsUpdateValuesImage } from '../../../types/ki67/interfaces';
import styles from './uploadki67.module.css';
import { useLoader } from '@/context/LoaderContext';
import API from '../../../utils/API';
import { allUrl } from '@/types/urlsvariables';
import ImageUploadForm from '@/components/ki67/ImageUploadForm';
import ImageInfo from './imageInfo';
import ImageDetailsForm from '@/components/ki67/ImageDetailsForm';
import { base64ToFile } from '@/utils/base64ToFile';


const Ki67Page: React.FC = () => {
  const [imagesData, setImagesData] = useState<ImageData[]>([]);
  const { setLoading } = useLoader();
  const [errors, setErrors] = useState<ErrorsUpdateValuesImage>({});
  const [modifiedImage, setModifiedImage] = useState<string>('');

  const handleImageSave = (dataUrl: string) => {
    setModifiedImage(dataUrl);
    setImagesData(prevImages =>
      prevImages.map(image =>
        image.url_ia_image_result === modifiedImage
          ? { ...image, url_ia_image_result: dataUrl }
          : image
      )
    );
  };

  const handleUpdatedImage = (data: ImageData, index: number) => {
    const newImageInfo: ImageData = {
      ...data,
      index: index,
      doc_wrong_negative_cells: [],
      doc_wrong_positive_cells: [],
      doc_add_negative_cells: [],
      doc_add_positive_cells: [],
    };
    setModifiedImage(data.url_ia_image_result);
    setImagesData((prevImages) => [...prevImages, newImageInfo]);
  };

  const updateImageInfo = (index: number, newValues: Partial<ImageData>) => {
    setImagesData((prevImages) =>
      prevImages.map((image, idx) => {
        if (idx === index) {
          return { ...image, ...newValues };
        }
        return image;
      })
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof ImageData) => {
    const values = e.target.value.split(/[;,]/).map((item) => item.trim());
    let newValues: Partial<ImageData> = {};
    let doc_wrong_positives_cells: string[] = imagesData[index].doc_wrong_positive_cells || [];
    let doc_add_positive_cells: string[] = imagesData[index].doc_add_positive_cells || [];
    let doc_add_negative_cells: string[] = imagesData[index].doc_add_negative_cells || [];
    let doc_wrong_negative_cells: string[] = imagesData[index].doc_wrong_negative_cells || [];
    let negativesTotal: number = imagesData[index].doc_negative_cells;
    let positive: number = imagesData[index].ia_positive_cells || 0;
    let total: number = imagesData[index].ia_total_cells || 0;
    let iaNegative: number = imagesData[index].ia_negative_cells || 0;

    if (
      field === 'doc_wrong_negative_cells' ||
      field === 'doc_wrong_positive_cells' ||
      field === 'doc_add_negative_cells' ||
      field === 'doc_add_positive_cells'
    ) {
      newValues[field] = values; // Assigning string array directly
    }

    positive = positive + doc_add_positive_cells.length - doc_wrong_positives_cells.length;
    negativesTotal = iaNegative + doc_add_negative_cells.length - doc_wrong_negative_cells.length;

    total = positive + negativesTotal;

    newValues.doc_ki67 = total > 0 ? (positive / total) * 100 : 0;

    newValues.doc_total_cells = total;
    newValues.doc_positive_cells = positive;
    newValues.doc_negative_cells = negativesTotal;
    updateImageInfo(index, newValues);
  };

  const handleUpdateValues = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      const imageFile = base64ToFile(modifiedImage, 'edited-image.png');

      formData.append('image_upload', imageFile);
      formData.append('data', JSON.stringify(imagesData[0]));
      const response = await API.put(`${allUrl.bkUpdateki67ImageData}${imagesData[0].id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.status == 200) {
        console.log(response.status);
      }
      else{
        console.log('Show error popup');
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      }
      console.log('Failed to update',err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.title}>
        <h1>Upload KI-67 Image</h1>
      </div>
      {imagesData.length === 0 ? (
        <ImageUploadForm onUpdateFile={handleUpdatedImage} />
      ) : (
        imagesData.map((image, index) => (
          <div className={'container ' + styles.c_card} key={index}>
            <ImageInfo
              image={image}
              modifiedImage={modifiedImage}
              handleImageSave={handleImageSave}
              handleInputChange={handleInputChange}
              index={index}
              errors={errors}
            />
            <ImageDetailsForm
              image={image}
              index={index}
              errors={errors}
              handleInputChange={handleInputChange}
              handleUpdateValues={handleUpdateValues}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default loginAuth(Ki67Page);
