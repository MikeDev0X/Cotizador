import { useEffect, useRef } from 'react';
import styles from '../styles/Modal.module.css';

const Modal = ({ title, children, open, onClose }) => {
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
          <h1>{title}</h1>
        </header>
        <div className={styles.content}>
          {children}
        </div>
        <footer>
          <button onClick={handleClose}>Close</button>
          <button className={styles.default} onClick={handleClose}>Close</button>
        </footer>
      </dialog>
    </>
  );
}

export default Modal;
