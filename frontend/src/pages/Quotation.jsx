import { Link } from 'react-router-dom';
import Button from '../components/Buttons';
import styles from '../styles/Quotation.module.css';
import { useState } from 'react';


function Quotation() {
  const [name, setName] = useState(''); // client's name
  const [equipments, setEquipments] = useState([]); // products names
  const [description, setDescription] = useState([]); // products descriptions

  









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
            <legend className={styles.legend}>Productos registrados</legend>

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

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <caption className={styles.caption}>Productos no registrados</caption>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Descripción</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>

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
          <Button type="submit" text="Continuar" variant="default" />
        </form>
      </div>

      <div className={styles.divider}>
        <div className={`${styles.paper}`}>
          <header>
            <h2>Resumen</h2>
          </header>
        </div>
      </div>

    </div>
  );
}

export default Quotation
