import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from 'react';
import styles from '../styles/Modal.module.css';

const ModalPDF = ({ title, children, open, onClose }) => {
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
        <FontAwesomeIcon className={styles.close} icon={faX} onClick={handleClose} />
        <header>
          <h1>{title}</h1>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </dialog>
    </>
  );
}

export default ModalPDF;
