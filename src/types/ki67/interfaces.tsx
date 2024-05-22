import React, { FormEvent } from 'react';

export interface ImageData {
  id: string;
  name: string;
  ia_ki67: number;
  ia_positive_cells: number;
  ia_negative_cells: number;
  ia_total_cells: number;
  index: number;
  url_image_upload: string;
  url_ia_image_result: string;
  doc_ki67: number;
  doc_total_cells: number;
  doc_positive_cells: number;
  doc_negative_cells: number;
  doc_wrong_negative_cells: string[];
  doc_wrong_positive_cells: string[];
  doc_add_negative_cells: string[];
  doc_add_positive_cells: string[];
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

export interface ImageInfoProps {
  image: ImageData;
  modifiedImage: string;
  handleImageSave: (dataUrl: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof ImageData) => void;
  index: number;
  errors: Record<string, string>;
}


export interface ImageDetailsFormProps {
  image: ImageData;
  index: number;
  errors: ErrorsUpdateValuesImage;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof ImageData) => void;
  handleUpdateValues: (e: FormEvent) => void;
}

export interface ImageUploadFormProps {
  onUpdateFile: (data: ImageData, index: number) => void;
}

export interface ErrorsUpdateValuesImage {
  [key: string]: string; // Esto asegura que ErrorsUpdateValuesImage sea compatible con Record<string, string>
}