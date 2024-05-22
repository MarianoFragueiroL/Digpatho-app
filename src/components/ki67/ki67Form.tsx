import React, { useState } from 'react';
import API from '../../utils/API';
import { UpdateFileProps } from '../../types/ki67/interfaces';
import { useLoader } from '../../context/LoaderContext';
import { allUrl } from '@/types/urlsvariables';

type ImageFile = {
  file: File | null;
  id: string;
};

const Ki67Form: React.FC<UpdateFileProps> = ({ onUpdateFile }) => {
  const [images, setImages] = useState<ImageFile[]>([{ file: null, id: `image-0-${new Date().getTime()}` }]);
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
      setImages((prevImages) => [
        ...prevImages,
        { file: null, id: `image-${prevImages.length}-${new Date().getTime()}` }
      ]);
    }
  };

  const deleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Minimun 1 image upload
    if (images.some((image) => image.file !== null)) {
      const formData = new FormData();
      for (let index = 0; index < images.length; index++) {
        const image = images[index];
        if (image.file) formData.append('image_upload', image.file);
      }
      setLoading(true);
      try {
        const response = await API.post(allUrl.bkProcesski67ImageData, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        onUpdateFile(response.data, images.length - 1); // Assuming response.data is ImageData
      } catch (err) {
        console.log('error', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <form className="m-5" onSubmit={handleSubmit}>
        {images.length < 10 && (
          <div className="d-flex align-items-center m-3">
            <label className="form-label">Add another Image</label>
            <button className="btn btn-secondary m-4" type="button" onClick={handleAddImage}>+</button>
          </div>
        )}
        {images.map((image, index) => (
          <div key={image.id} className="d-flex flex-column m-3">
            <div className="col-6">
              <label className="form-label">Select the image</label>
            </div>
            <div className="d-flex">
              <div className="col-4"></div>
              <div className="col-3 d-flex align-items-center m-3">
                <input className="form-control btn btn-outline-secondary" type="file" onChange={(e) => handleImageChange(e, index)} />
              </div>
              <div className="col-2 d-flex align-items-center">
                <button className="btn btn-danger m-3" type="button" onClick={() => deleteImage(index)}>
                  <img className="color-white" src="/icons/lnr-trash.svg" />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="d-flex align-items-center justify-content-end">
          <button className="btn btn-success" type="submit" disabled={images.every((image) => image.file === null)}>Send</button>
        </div>
      </form>
    </div>
  );
}

export default Ki67Form;
