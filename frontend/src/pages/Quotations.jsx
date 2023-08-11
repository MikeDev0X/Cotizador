import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useTabTitle from "../hooks/useTabTitle";
import styles from "../styles/Quotations.module.css";

function Quotation() {
  useTabTitle("Cotizaciones");

  const [entries, setEntries] = useState(10);
  const [quotations, setQuotations] = useState([
    {
      id: 1,
      client: "Juan Pérez",
      createdBy: "Leonardo Morales",
      createdAt: "2023-08-01",
    },
    {
      id: 2,
      client: "María Rodríguez",
      createdBy: "Leonardo Morales",
      createdAt: "2023-07-15",
    },
    {
      id: 3,
      client: "Carlos García",
      createdBy: "Leonardo Morales",
      createdAt: "2023-07-10",
    },
    {
      id: 4,
      client: "Ana Martínez",
      createdBy: "Leonardo Morales",
      createdAt: "2023-06-25",
    },
    {
      id: 5,
      client: "Luisa López",
      createdBy: "Leonardo Morales",
      createdAt: "2023-06-18",
    },
    {
      id: 6,
      client: "Javier Sánchez",
      createdBy: "Leonardo Morales",
      createdAt: "2023-06-10",
    },
    {
      id: 7,
      client: "Laura Fernández",
      createdBy: "Leonardo Morales",
      createdAt: "2023-06-05",
    },
    {
      id: 8,
      client: "Manuel Torres",
      createdBy: "Leonardo Morales",
      createdAt: "2023-05-28",
    },
    {
      id: 9,
      client: "Patricia Ramírez",
      createdBy: "Leonardo Morales",
      createdAt: "2023-05-20",
    },
    {
      id: 10,
      client: "Miguel Vargas",
      createdBy: "Leonardo Morales",
      createdAt: "2023-05-15",
    },
    {
      id: 11,
      client: "Alicia Gómez",
      createdBy: "Leonardo Morales",
      createdAt: "2023-05-10",
    },
    {
      id: 12,
      client: "Pedro Morales",
      createdBy: "Leonardo Morales",
      createdAt: "2023-05-05",
    },
    {
      id: 13,
      client: "Isabel Núñez",
      createdBy: "Leonardo Morales",
      createdAt: "2023-04-28",
    },
    {
      id: 14,
      client: "Fernando Delgado",
      createdBy: "Leonardo Morales",
      createdAt: "2023-04-20",
    },
    {
      id: 15,
      client: "Carmen Ortega",
      createdBy: "Leonardo Morales",
      createdAt: "2023-04-15",
    },
  ]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(true);
  const [isCheckCreatedBy, setIsCheckCreatedBy] = useState(true);
  const [isCheckCreatedAt, setIsCheckCreatedAt] = useState(true);
  const filterRef = useRef(null);
  const filterOptionsRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleEntriesChange = (e) => {
    setEntries(e.target.value);
  };

  const filteredQuotations = quotations.filter((quotation) => {
    const searchTerm = search.toLowerCase();

    // Verificar si se debe incluir la cotización en el filtro
    /* const includeClient = isCheckAll || isCheckClient; */
    const includeCreatedBy = isCheckAll || isCheckCreatedBy;
    const includeCreatedAt = isCheckAll || isCheckCreatedAt;

    const matchesClient = quotation.client.toLowerCase().includes(searchTerm);
    const matchesCreatedBy = quotation.createdBy.toLowerCase().includes(searchTerm);
    const matchesCreatedAt = quotation.createdAt.includes(searchTerm);

    return (
      /* (includeClient && matchesClient) || */
      (includeCreatedBy && matchesCreatedBy) ||
      (includeCreatedAt && matchesCreatedAt)
    );
  });


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        filterOptionsRef.current &&
        !filterOptionsRef.current.contains(e.target) &&
        filterRef.current !== e.target
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isCheckCreatedBy && isCheckCreatedAt) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
  }, [isCheckCreatedBy, isCheckCreatedAt]);

  const handleAllChange = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheckCreatedBy(!isCheckAll);
    setIsCheckCreatedAt(!isCheckAll);
  };

  const handleCreatedByChange = () => {
    setIsCheckCreatedBy(!isCheckCreatedBy);
    if (!isCheckCreatedBy && isCheckCreatedAt) {
      setIsCheckAll(false);
    }
  };

  const handleCreatedAtChange = () => {
    setIsCheckCreatedAt(!isCheckCreatedAt);
    if (isCheckCreatedBy && !isCheckCreatedAt) {
      setIsCheckAll(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Cotizaciones</h1>
        <Link to="/nueva-cotizacion" className={styles.default}>
          Nueva Cotización <FontAwesomeIcon icon={faPlus} />
        </Link>
      </header>
      <div className={styles.content}>
        <div className={styles.toolbar}>
          <div className={styles.search}>
            <label htmlFor="search">Search:</label>
            <input id="search" value={search} onChange={handleSearchChange} />
          </div>

          <div className={styles.filter}>
            <button onClick={() => setOpen(!open)} ref={filterRef}>
              Filter:
            </button>

            {open && (
              <div className={styles.filterOptions} ref={filterOptionsRef}>
                <input
                  type="checkbox"
                  id="all"
                  name="all"
                  value="all"
                  checked={isCheckAll}
                  onChange={handleAllChange}
                />
                <label htmlFor="all">All</label>

                <input
                  type="checkbox"
                  id="createdBy"
                  name="createdBy"
                  value="createdBy"
                  checked={isCheckCreatedBy}
                  onChange={handleCreatedByChange}
                />
                <label htmlFor="createdBy">Created By</label>

                <input
                  type="checkbox"
                  id="createdAt"
                  name="createdAt"
                  value="createdAt"
                  checked={isCheckCreatedAt}
                  onChange={handleCreatedAtChange}
                />
                <label htmlFor="createdAt">Created At</label>
              </div>
            )}
          </div>

          <div className={styles.entries}>
            <label htmlFor="entries">Show:</label>
            <select value={entries} onChange={handleEntriesChange} id="entries">
              <option value="10">10</option>
              {filteredQuotations.length > 10 &&
                filteredQuotations.length < 25 && (
                  <option value="20">25</option>
                )}
              {filteredQuotations.length >= 25 &&
                filteredQuotations.length < 50 && (
                  <option value="20">50</option>
                )}
              {filteredQuotations.length >= 50 && (
                <option value="all">Todo</option>
              )}
            </select>
          </div>

          <div className={styles.view}>
            <label htmlFor="view">Display:</label>
            <select id="display">
              <option value="folio">Folio</option>
              <option value="client">Client</option>
              <option value="createdby">Created By</option>
              <option value="createdat">Created At</option>
            </select>
          </div>
        </div>
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
            {entries === "all"
              ? filteredQuotations.map((quotation) => (
                <tr key={quotation.id}>
                  <td>{quotation.id}</td>
                  <td>{quotation.client}</td>
                  <td>{quotation.createdBy}</td>
                  <td>{quotation.createdAt}</td>
                  <td>
                    Acciones
                    {/* <Link to={`/cotizaciones/${item.id}`} className={styles.default}>Ver</Link>
                    <Link to={`/cotizaciones/${item.id}/editar`} className={styles.default}>Editar</Link>
                    <Link to={`/cotizaciones/${item.id}/pdf`} className={styles.default}>PDF</Link> */}
                  </td>
                </tr>
              ))
              : filteredQuotations.slice(0, entries).map((quotation) => (
                <tr key={quotation.id}>
                  <td>{quotation.id}</td>
                  <td>{quotation.client}</td>
                  <td>{quotation.createdBy}</td>
                  <td>{quotation.createdAt}</td>
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

          {/* {
              entries === filteredQuotations.length ? null : (
                <tr>
                  <td colSpan="5">Mostrando {entries} de {filteredQuotations.length} entradas</td>
                </tr>
              )
            } */}
        </table>
      </div>
    </div>
  );
}

export default Quotation;
