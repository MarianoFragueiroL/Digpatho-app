import React, { useState } from 'react';
import API from '../../utils/API';
import {UpdateFileProps} from '../../types/updateki67file/interfaces'
import { useLoader } from '../../context/LoaderContext';

type ImageFile = {
    file: File | null;
    id: string;
  };



const Ki67Form: React.FC<UpdateFileProps> = ({onUpdateFile}) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const { setLoading } = useLoader();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files) {
        const file = event.target.files ? event.target.files[0] : null;
        const newImages = [...images];
        newImages[index] = { ...newImages[index], file };
        setImages(newImages);
    }
  };

  const handleAddImage = () => {
    if (images.length < 10) {
        setImages(prevImages => [
            ...prevImages,
            { file: null, id: `image-${prevImages.length}-${new Date().getTime()}` }
        ]);
    }
    
  };
  const deleteImage = (index:number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Minimun 1 image upload
    if (images.some(image => image !== null)) {
      const formData = new FormData();
      for (let index = 0; index < images.length; index++) {
        const image = images[index];
        if (image.file) formData.append('image_upload', image.file);;
          event.preventDefault();
          setLoading(true);
          try {
            const response = await API.post('/api/processki67',  formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            });
            onUpdateFile(response.data, index);
          } catch (err) {
            console.log('error', err);
          } finally {
            console.log('finally');
            setLoading(false);
          }
      };
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        {images.length < 10 && (
            <button type="button" onClick={handleAddImage}>+</button>
        )}
      {images.map((image, index) => (
          <div key={image.id}>
          <input type="file" onChange={(e) => handleImageChange(e, index)} 
          />
            <button type="button" onClick={()=>deleteImage(index)}>-</button>
        </div>
      ))}
      <button type="submit" disabled={images.every(image => image === null)}>Enviar</button>
    </form>
  );
}

export default Ki67Form;
