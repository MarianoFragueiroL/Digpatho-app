import React, { FormEvent } from 'react';
import styles from '../../pages/ki67/uploadki67/uploadki67.module.css';
import { ImageDetailsFormProps } from '@/types/ki67/interfaces';



const ImageDetailsForm: React.FC<ImageDetailsFormProps> = ({
  image,
  index,
  errors,
  handleInputChange,
  handleUpdateValues,
}) => {
  return (
    <form className="d-flex flex-wrap justify-content-center" onSubmit={handleUpdateValues}>
        <div className="d-flex">
            <div className='col-6 d-flex'> 
                <div className="d-flex flex-column col-4 m-3">
                    <div className="d-flex flex-column">
                        <label className="formLabel">IA KI67</label>
                        <input type="text" value={image.ia_ki67} disabled />
                    </div>
                    <div className="d-flex flex-column">
                        <label className="formLabel">IA TOTAL CELLS</label>
                        <input type="text" value={image.ia_total_cells} disabled />
                    </div>

                </div>
                <div className="d-flex flex-column col-4 m-3">
                    <div className="d-flex flex-column">
                        <label className="formLabel">IA POSITVE CELLS</label>
                        <input type="text" value={image.ia_positive_cells} disabled />
                    </div>
                    <div className="d-flex flex-column">
                        <label className="formLabel">IA NEGATIVE CELLS</label>
                        <input type="text" value={image.ia_negative_cells} disabled />
                    </div>
                </div>
            </div>
            <div className='col-6 d-flex'> 
                <div className="d-flex flex-column col-4 m-3">
                    <div className="d-flex flex-column">
                        <label className={styles.formLabel}>KI67</label>
                        <input type="text" value={image.doc_ki67} name="doc_ki67" disabled />
                    </div>
                    <div className="d-flex flex-column">
                        <label className={styles.formLabel}>TOTAL CELLS</label>
                        <input type="text" name="doc_total_cells" value={image.doc_total_cells} disabled />
                    </div>

                </div>
                <div className="d-flex flex-column col-4 m-3">
                    <div className="d-flex flex-column">
                        <label className={styles.formLabel}>POSITVE CELLS</label>
                        <input type="text" name="doc_positive_cells" value={image.doc_positive_cells} disabled />
                    </div>
                    <div className="d-flex flex-column">
                        <label className={styles.formLabel}>NEGATIVE CELLS</label>
                        <input type="text" name="doc_negative_cells" value={image.doc_negative_cells} disabled />
                    </div>
                </div>
            </div>
      </div>
        <div className="d-flex flex-column col-8 m-3">
            <div className="d-flex align-items-center justify-content-end m-3">
                <button className="btn btn-success" type="submit">
                    Update Results
                </button>
            </div>
        </div>
    </form>
  );
};

export default ImageDetailsForm;
