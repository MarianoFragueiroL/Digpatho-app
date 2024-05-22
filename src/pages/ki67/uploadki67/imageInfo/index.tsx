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
    <div className="d-flex justify-content-center">
      <div className="col-4 m-3">
        <img className="w-100" src={`${image.url_image_upload}`} alt="Original" />
      </div>
      <div className="col-4 m-3 d-flex flex-column">
        <div>
          <ImageModal src={modifiedImage} onImageSave={handleImageSave} />
        </div>
      </div>
    </div>
  );
};

export default ImageInfo;