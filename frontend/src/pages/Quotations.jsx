import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import useTabTitle from "../hooks/useTabTitle";
import styles from '../styles/Quotations.module.css';

function Quotation() {
  useTabTitle("Cotizaciones");

  const data = [
    {
      id: 1,
      client: "Mario Rivera",
      createdBy: "Leonardo Morales",
      createdAt: "2021-09-01",
    },
    {
      id: 2,
      client: "Mario Rivera",
      createdBy: "Leonardo Morales",
      createdAt: "2021-09-01",
    },
    {
      id: 3,
      client: "Mario Rivera",
      createdBy: "Leonardo Morales",
      createdAt: "2021-09-01",
    },
    {
      id: 4,
      client: "Mario Rivera",
      createdBy: "Leonardo Morales",
      createdAt: "2021-09-01",
    },
    {
      id: 5,
      client: "Mario Rivera",
      createdBy: "Leonardo Morales",
      createdAt: "2021-09-01",
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Cotizaciones</h1>
        <Link to="/nueva-cotizacion" className={styles.default}>Nueva Cotización <FontAwesomeIcon icon={faPlus} /></Link>
      </header>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Folio</th>
            <th>Cliente</th>
            <th>Creado por</th>
            <th>Creado en</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.client}</td>
              <td>{item.createdBy}</td>
              <td>{item.createdAt}</td>
              <td>
                Acciones
                {/* <Link to={`/cotizaciones/${item.id}`} className={styles.default}>Ver</Link>
                <Link to={`/cotizaciones/${item.id}/editar`} className={styles.default}>Editar</Link>
                <Link to={`/cotizaciones/${item.id}/pdf`} className={styles.default}>PDF</Link> */}
              </td>
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          <tr>
            <td colSpan="5">Total: {data.length}</td>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
}

export default Quotation;
