export interface ImageData {
    name: string;
    url_image_upload: string; // url  string
    url_ia_image_result: string; // url  string of the processed image
    ia_ki67: number;
    ia_positive_cells: number;
    ia_negative_cells?: number;
    ia_total_cells: number;
    width?: number;
    height?: number;
    index?: number;
  }
  
export interface UpdateFileProps {
    onUpdateFile: (data: ImageData, index: number) => void;
}

export interface AnalysisImage {
  url: string;
  name: string;
  analysis: string;
  already_committed: boolean;
}

export interface AnalysisProps {
  images: AnalysisImage[];
}