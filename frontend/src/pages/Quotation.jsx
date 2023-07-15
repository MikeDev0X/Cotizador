import { Link } from 'react-router-dom';
import styles from '../styles/Quotation.module.css';
import { useState } from 'react';


function Quotation() {
  const [name, setName] = useState(''); // client's name
  const [equipments, setEquipments] = useState([]); // products names
  const [description, setDescription] = useState([]); // products descriptions

  









  return (
    <div className={styles.container}>
      <header>
        <h1>Nueva cotización</h1>
      </header>
      <Link to="/">&larr; Volver</Link>

      <form className={styles.form}>
        <fieldset className={styles.formGroup}>
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" placeholder="Leonardo" required />
        </fieldset>

        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupLegend}>Productos registrados</legend>

          <div className={styles.item}>
            <label htmlFor="products">Producto</label>
            <select name="products" id="products">
              <option selected disabled hidden /* value="-1" */>---</option>
              <option value="1">Producto 1</option>
              <option value="2">Producto 2</option>
              <option value="3">Producto 3</option>
            </select>
          </div>

          <div className={styles.item}>
            <label htmlFor="quantity">Cantidad</label>
            <input type="number" id="quantity" name="quantity" placeholder="1" required />
          </div>

          <div className={styles.item}>
            <label htmlFor="description">Descripción</label>
            <textarea name="description" id="description" /* cols="30" rows="3" */ placeholder="Descripción del producto"></textarea>
          </div>

          <div className={styles.item}>
            <label htmlFor="price">Precio</label>
            <input type="number" id="price" name="price" placeholder="100000" required />
          </div>

          <div className={styles.item}>
            <label htmlFor="shippingCost">Costo de envío</label>
            <input type="number" id="shippingCost" name="shippingCost" placeholder="1000" required />
          </div>

          <div className={styles.item}>
            <label htmlFor="warranty">Garantía</label>
            <select name="products" id="warranty">
              <option selected disabled hidden /* value="-1" */>---</option>
              <option value="1">Garantía 1</option>
              <option value="2">Garantía 2</option>
              <option value="3">Garantía 3</option>
            </select>
          </div>

        </fieldset>

      </form>
    </div>
  );
}

export default Quotation
