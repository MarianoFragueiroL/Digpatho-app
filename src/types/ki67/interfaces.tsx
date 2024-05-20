export interface ImageData {
    id: number;
    name: string;
    url_image_upload: string; // url  string
    url_ia_image_result: string; // url  string of the processed image
    ia_ki67: number;
    ia_positive_cells: number;
    ia_negative_cells?: number;
    ia_total_cells: number;
    doc_ki67?: number;
    doc_positive_cells: number;
    doc_negative_cells: number;
    doc_wrong_negative_cells?: string[];
    doc_wrong_positive_cells?: string[];
    doc_add_negative_cells?: string[];
    doc_add_positive_cells?: string[];
    doc_total_cells?: number;
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
export interface ErrorsUpdateValuesImage {
  doc_wrong_positive_cells?: string[];
  doc_wrong_negative_cells?: string[];
  doc_add_positive_cells?: string[];
  doc_add_negative_cells?: string[];
}