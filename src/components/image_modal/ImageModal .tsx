import { useState } from 'react';
import Modal from 'react-modal';
import PaintableImage from './PaintImage'; // Ajusta la ruta según sea necesario
import { ImageModalProps } from '@/types/components/images/interfaces';
import styles from './Imagemodal.module.css';

// Configuración para que el modal se monte en el elemento root
Modal.setAppElement('#__next');



const ImageModal: React.FC<ImageModalProps> = ({ src, onImageSave}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [color, setColor] = useState('#ff0000');
  const [imageDataUrl, setImageDataUrl] = useState(src);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    onImageSave(imageDataUrl);
  };
  const handleSave = (dataUrl: string) => {
    setImageDataUrl(dataUrl);
  };

  const handleColorChange = (selectedColor: string) => {
    setColor(selectedColor);
  };

  return (
    <div className='d-flex'>
        <img className='w-100' src={src} onClick={openModal} style={{ cursor: 'pointer' }} />

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
            overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
            content: {
            display: 'flex',
            flexDirection: 'column',
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
        <div className={styles.topcontainer} >
            <div className={styles.colorscontainer} >
                <div className='d-flex m-3'>
                    <div  onClick={() => handleColorChange('#ff0000')} className={styles.colorboxred} />
                    <div onClick={() => handleColorChange('#00ff00')} className={styles.colorboxgreen} />
                    <div onClick={() => handleColorChange('#0000ff')} className={styles.colorboxblue} />
                </div>
                <button onClick={closeModal}  className={styles.buttonclose}>
                    &times;
                </button>
            </div>

        </div>
        <PaintableImage src={src} color={color} onSave={handleSave}/>
        </Modal>
    </div>
  );
};

export default ImageModal;
