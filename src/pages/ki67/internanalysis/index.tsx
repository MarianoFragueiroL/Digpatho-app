import { useState } from 'react';
import type {  NextPage } from 'next';
import { AnalysisImage, AnalysisProps } from '@/types/ki67/interfaces';



const InterobAnalysis: NextPage<AnalysisProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<AnalysisImage | null>(null);

  return (
    <>
    {selectedImage &&
        <div>
        <h1>Image Analysis</h1>
        <div>
            {images.map((img, index) => (
            <div key={index} onClick={() => setSelectedImage(img)}>
                {img.name} {img.already_committed && <span>✔️</span>}
            </div>
            ))}
        </div>
        {selectedImage && (
            <div>
              <img src={selectedImage.url} alt="Selected" />
              <p>{selectedImage.analysis}</p>
              {!selectedImage.already_committed && <button>Submit Analysis</button>}
            </div>
        )}
        </div>
    }
    </>
  );
};



export default InterobAnalysis;