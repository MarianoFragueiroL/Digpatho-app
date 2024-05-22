import { ImageModalProps } from '@/types/components/images/interfaces';
import { useState } from 'react';
import Modal from 'react-modal';

// Configuración para que el modal se monte en el elemento root
Modal.setAppElement('#__next');



const ImageModal: React.FC<ImageModalProps> = ({ src, alt }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <img src={src} alt={alt} style={{ maxHeight: '90vh', maxWidth: '90vw' }} />
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            &times;
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
