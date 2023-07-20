import { useEffect, useRef, useState } from "react";
import styles from "../styles/Modal.module.css";

const ModalProduct = ({ open, onClose }) => {
  const dialog = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [warranty, setWarranty] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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

  useEffect(() => {
    /* const areInputsEmpty = !name || !description || !price || !warranty;
    setIsButtonDisabled(areInputsEmpty); */
    if (
      name !== "" &&
      description !== "" &&
      price !== "" &&
      warranty !== ""
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, description, price, warranty]);

  return (
    <>
      <dialog ref={dialog}>
        <header>
          <h1>Registar nuevo producto</h1>
        </header>
        <form className={styles.content}>
          <fieldset className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Nombre
              </label>
              <input
                type="text"
                className={styles.input}
                id="name"
                name="name"
                placeholder="Nombre del producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="description" className={styles.label}>
                Descripcción</label>
              <textarea
                className={styles.textarea}
                id="description"
                name="description"
                /* cols="30" rows="3" */ placeholder="Descripción del producto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="price" className={styles.label}>
                Precio
              </label>
              <input
                type="number"
                className={styles.input}
                id="price"
                name="price"
                placeholder="$100,000 MX"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="warranty" className={styles.label}>
                Garantía
              </label>
              <input
                type="text"
                className={styles.input}
                id="warranty"
                name="warranty"
                placeholder="Garantía del producto"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                required
              />
            </div>
          </fieldset>
          <footer>
            <button
              className={`${styles.button} ${styles.variant}`}
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button
              className={`${styles.button} ${styles.default}`}
              onClick={handleClose}
              title={isButtonDisabled ? "Llena todos los campos" : undefined}
              disabled={isButtonDisabled}
            >
              Registrar
            </button>
          </footer>
        </form>
      </dialog>
    </>
  );
};

export default ModalProduct;
