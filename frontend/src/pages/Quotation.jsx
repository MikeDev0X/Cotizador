import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Buttons';
/* import Modal from '../components/Modal'; */
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from '../assets/logo.png';
import ModalProduct from '../components/ModalProduct';
import useTabTitle from '../hooks/useTabTitle';
import styles from '../styles/Quotation.module.css';

function Quotation() {
  useTabTitle('Nueva cotización');
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
          <header className={styles.paperHeader}>
            <div className={styles.paperHeaderGroup}>
              <img src={Logo} alt="Logo" className={styles.logo} />
            </div>

            <div className={styles.paperHeaderGroup}>
              <span>H Y M HEALTHCARE SA DE CV</span>
              <span>HMH210819114</span>
              <h4>Cotización</h4>
            </div>

            <div className={styles.paperHeaderGroup}>
              <div className={styles.folioAndDate}>
                <span>FOLIO: <span className={styles.folio}>1337</span></span>
                <span>FECHA: 27/05/2023</span>
              </div>
            </div>
          </header>

          <div className={styles.paperContent}>
            <span>Leonardo Morales</span>

            <table>
              <thead>
                <tr>
                  <th>Cantidad</th>
                  <th>Producto</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Producto 1</td>
                  <td>$100,000 MX</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Producto 2</td>
                  <td>$100,000 MX</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Producto 3</td>
                  <td>$100,000 MX</td>
                </tr>
              </tbody>
            </table>
          </div>

          <footer>
            <div className={styles.footerGroup}>
              <div className={styles.footerGroupItem}>
                <span>OBSERVACIONES:</span><p>Cotización Contado</p>
              </div>

              <div className={styles.footerGroupItem}>
                <span>GARANT&#205;A:</span>
                <p>.*18 Meses de Garantía en Equipo de Ultrasonido Chison Nuevo (Unidad principal); **12 Meses de Garantía en Transductores Chison Nuevos; ***12 Meses de Garantía en Batería integrada al equipo; ****Impresoras, reguladores y accesorios la garantía es directo con fabricante.</p>
              </div>
            </div>

            <div className={styles.footerGroup}>
              <div className={styles.footerGroupItem}>
                <div className={styles.row}>
                  <span>SUBTOTAL</span>
                  <span>$96,638.00</span>
                </div>
                <div className={styles.row}>
                  <span>IVA</span>
                  <span>$15,414.08</span>
                </div>
                <div className={styles.row}>
                  <span>COSTO DE ENTREGA:</span>
                  <span>$700.00</span>
                </div>
                <div className={styles.row}>
                  <span>MONTO TOTAL</span>
                  <span>$112,800.00</span>
                </div>
              </div>
              <span>
                COTIZACIÓN CON VALIDEZ DE 7 DÍAS POSTERIOR A LA FECHA DE EMISIÓN
              </span>
            </div>

          </footer>

          <Button type="button" text="Confirmar" variant="default" />
        </div>
      </div>
    </div>
  );
}

export default Quotation
