import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Buttons';
/* import Modal from '../components/Modal'; */
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalProduct from '../components/ModalProduct';
import styles from '../styles/Quotation.module.css';


function Quotation() {
  const [name, setName] = useState(''); // client's name
  const [equipments, setEquipments] = useState([]); // products names
  const [description, setDescription] = useState([]); // products descriptions











  const [modalProductOpen, setModalProductOpen] = useState(false);
  /* const [modalOpen, setModalOpen] = useState(false); */

  const openModalProduct = () => {
    setModalProductOpen(true);
  }

  const closeModalProduct = () => {
    setModalProductOpen(false);
  }

  /* const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  } */

  return (
    <div className={styles.container}>
      <div className={styles.divider}>
        <header>
          <h1>Nueva cotización</h1>
        </header>
        <Link to="/" className={styles.link}>&larr; Volver</Link>

        <form className={styles.form}>
          <fieldset className={styles.formGroup}>
            <legend className={styles.legend}>Cliente</legend>
            <label htmlFor="name" className={styles.label}>Nombre</label>
            <input type="text" className={styles.input} id="name" name="name" placeholder="Leonardo Morales" required autoFocus />
          </fieldset>

          <fieldset className={styles.formGroup}>
            <div className={styles.legendButtonContainer}>
              <legend className={styles.legend}>Productos registrados</legend>

              <button type="button" className={`${styles.button} ${styles.default}`} onClick={openModalProduct}>Registrar nuevo producto<FontAwesomeIcon icon={faPlus} /></button>

              <ModalProduct open={modalProductOpen} onClose={closeModalProduct} />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="products" className={styles.label}>Producto</label>
              <select name="products" id="products" className={styles.select}>
                <option selected disabled hidden /* value="-1" */>---</option>
                <option value="1">Producto 1</option>
                <option value="2">Producto 2</option>
                <option value="3">Producto 3</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="quantity" className={styles.label}>Cantidad</label>
              <input type="number" className={styles.input} id="quantity" name="quantity" placeholder="1" required />
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
              <select name="products" id="warranty" className={styles.select}>
                <option selected disabled hidden /* value="-1" */>---</option>
                <option value="1">Garantía 1</option>
                <option value="2">Garantía 2</option>
                <option value="3">Garantía 3</option>
              </select>
            </div>
          </fieldset>
          <Button type="submit" text="Agregar" variant="default" />
        </form>

        <form className={styles.form}>
          <fieldset className={styles.formGroup}>
            <legend className={styles.legend}>Facturación</legend>

            <div className={styles.inputGroup}>
              <label htmlFor="shippingCost" className={styles.label}>Costo de envío</label>
              <input type="number" className={styles.input} id="shippingCost" name="shippingCost" placeholder="$1000 MX" required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="validity" className={styles.label}>Validez</label>
              <input type="date" className={styles.input} id="validity" name="validity" required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="deliveryTime" className={styles.label}>Tiempo de entrega</label>
              <input type="number" className={styles.input} id="deliveryTime" name="deliveryTime" placeholder="15 días" required />
            </div>
          </fieldset>
          {/* disabled button until fields are filled */}
          <Button type="submit" text="Continuar" variant="default" />
        </form>
        {/* <Button type="button" text="Modal" variant="default" onClick={openModal} /> */}
      </div>

      <div className={styles.divider}>
        <div className={`${styles.paper}`}>
          <header>
            <h2>Resumen</h2>
          </header>
          <Button type="button" text="Confirmar" variant="default" />
        </div>
      </div>
    </div>
  );
}

export default Quotation
