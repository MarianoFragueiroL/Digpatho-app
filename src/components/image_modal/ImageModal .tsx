import { useState } from 'react';
import Modal from 'react-modal';
import PaintableImage from './PaintImage'; // Ajusta la ruta según sea necesario
import { ImageModalProps } from '@/types/components/images/interfaces';

// Configuración para que el modal se monte en el elemento root
Modal.setAppElement('#__next');



const ImageModal: React.FC<ImageModalProps> = ({ src, alt }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [color, setColor] = useState('#ff0000');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleColorChange = (selectedColor: string) => {
    setColor(selectedColor);
  };

  return (
    <div>
      <img className='w-100' src={src} alt={alt} onClick={openModal} style={{ cursor: 'pointer' }} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
            border: 'none',
            background: 'none',
          },
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              marginRight: '10px', 
              justifyContent: 'center' 
            }}
          >
            <div 
              onClick={() => handleColorChange('#ff0000')} 
              style={{
                width: '30px', 
                height: '30px', 
                backgroundColor: '#ff0000', 
                cursor: 'pointer', 
                marginBottom: '10px'
              }}
            />
            <div 
              onClick={() => handleColorChange('#00ff00')} 
              style={{
                width: '30px', 
                height: '30px', 
                backgroundColor: '#00ff00', 
                cursor: 'pointer', 
                marginBottom: '10px'
              }}
            />
            <div 
              onClick={() => handleColorChange('#0000ff')} 
              style={{
                width: '30px', 
                height: '30px', 
                backgroundColor: '#0000ff', 
                cursor: 'pointer'
              }}
            />
          </div>
          <button
            onClick={closeModal}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            &times;
          </button>
        </div>
        <PaintableImage src={src} alt={alt} color={color} />
      </Modal>
    </div>
  );
};

export default ImageModal;
