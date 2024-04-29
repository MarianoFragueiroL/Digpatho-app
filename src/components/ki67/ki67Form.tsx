import React, { useState } from 'react';

type ImageFile = File | null;

const Ki67Form: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files) {
      const newImages = [...images];
      newImages[index] = event.target.files[0];
      setImages(newImages);
    }
  };

  const handleAddImage = () => {
    if (images.length < 10) {
      setImages([...images, null]);
    }
    console.log(images);
    
  };
  const deleteImage = (index: number) => {
    console.log(index);
    
    const newImages = images.filter((_, i) => i !== index);
    console.log(newImages);
    setImages(newImages);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Minimun 1 image upload
    if (images.some(image => image !== null)) {
      const formData = new FormData();
      images.forEach(image => {
        if (image) formData.append('images', image);
      });

      // Aquí iría la llamada a la API para enviar las imágenes
      // Por ejemplo: await axios.post('tu-api-url', formData);
      console.log('Formulario enviado');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {images.map((image, index) => (
        <div key={index}>
          <input type="file" onChange={(e) => handleImageChange(e, index)} />
          <button type="button" onClick={()=>deleteImage(index)}>-</button>
        </div>
      ))}
      {images.length < 10 && (
        <button type="button" onClick={handleAddImage}>+</button>
      )}
      <button type="submit" disabled={images.every(image => image === null)}>Enviar</button>
    </form>
  );
}

export default Ki67Form;
