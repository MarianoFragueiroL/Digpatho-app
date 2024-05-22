export interface ImageModalProps {
    src: string;
    onImageSave: (dataUrl: string) => void;
  }


export interface PaintableImageProps {
    src: string;
    color: string;
    onSave: (dataUrl: string) => void;
  }
