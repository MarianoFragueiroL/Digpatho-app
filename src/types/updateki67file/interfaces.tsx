export interface ImageData {
    name: string;
    original_image: string; // Base64 encoded string
    converted_image: string; // Base64 encoded string of the processed image
    ki67: number;
    positive: number;
    total: number;
    width?: number;
    height?: number;
    index?: number;
  }
  
export interface UpdateFileProps {
    onUpdateFile: (data: ImageData, index: number) => void;
}