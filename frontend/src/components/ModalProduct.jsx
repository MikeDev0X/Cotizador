import { useEffect, useRef } from 'react';
import styles from '../styles/Modal.module.css';

const ModalProduct = ({ open, onClose }) => {
    const dialog = useRef(null);

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);

    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <dialog ref={dialog}>
                <header>
                    <h1>Registar nuevo producto</h1>
                </header>
                <form className={styles.content}>
                    <fieldset className={styles.formGroup}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name" className={styles.label}>Nombre</label>
                            <input type="text" className={styles.input} id="name" name="name" placeholder="Nombre del producto" required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="description" className={styles.label}>Descripcción</label>
                            <textarea name="description" className={styles.textarea} id="description" /* cols="30" rows="3" */ placeholder="Descripción del producto" title='Contenido no editable' readOnly></textarea>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="price" className={styles.label}>Precio</label>
                            <input type="number" className={styles.input} id="price" name="price" placeholder="$100,000 MX" required />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="warranty" className={styles.label}>Garantía</label>
                            <input type="text" className={styles.input} id="warranty" name="warranty" placeholder="Garantía del producto" required />
                        </div>
                    </fieldset>
                    <footer>
                        <button onClick={handleClose}>Cancel</button>
                        <button onClick={handleClose}>Register</button>
                    </footer>
                </form>
            </dialog>
        </>
    );
}

export default ModalProduct;
