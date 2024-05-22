import React from 'react';
import { ImageInfoProps } from '../../../../types/ki67/interfaces';
import ImageModal from '@/components/image_modal/ImageModal ';



const ImageInfo: React.FC<ImageInfoProps> = ({
  image,
  modifiedImage,
  handleImageSave,
  handleInputChange,
  index,
  errors
}) => {
  return (
    <div className="d-flex justify-content-end">
      <div className="col-4 m-3">
        <img className="w-100" src={`${image.url_image_upload}`} alt="Original" />
      </div>
      <div className="col-4 m-3 d-flex flex-column">
        <div>
          <ImageModal src={modifiedImage} onImageSave={handleImageSave} />
        </div>
        <div className="d-flex">
          <div className="d-flex flex-column">
            <label className="formLabel">IA KI67</label>
            <input type="text" value={image.ia_ki67} disabled />
          </div>
          <div className="d-flex flex-column">
            <label className="formLabel">IA TOTAL CELLS</label>
            <input type="text" value={image.ia_total_cells} disabled />
          </div>
        </div>
        <div className="d-flex">
          <div className="d-flex flex-column">
            <label className="formLabel">IA POSITVE CELLS</label>
            <input type="text" value={image.ia_positive_cells} disabled />
          </div>
          <div className="d-flex flex-column">
            <label className="formLabel">IA NEGATIVE CELLS</label>
            <input type="text" value={image.ia_negative_cells} disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageInfo;