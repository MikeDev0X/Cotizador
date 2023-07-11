import { Link } from 'react-router-dom';
import styles from '../styles/Quotation.module.css'
function Quotation() {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Nueva cotización</h1>
      <Link to="/">&larr; Volver</Link>
    </div>
  );
}

export default Quotation
