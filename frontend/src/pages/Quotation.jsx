import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { urlLocal } from '../../constants';
import Logo from '../assets/logo.png';
import Button from "../components/Buttons";
import ModalPDF from "../components/ModalPDF";
import ModalProduct from '../components/ModalProduct';
import PDFComponent from '../components/PDFComponent';
import useTabTitle from '../hooks/useTabTitle';
import buttonStyles from '../styles/Buttons.module.css';
import styles from '../styles/Quotation.module.css';

function Quotation() {
  useTabTitle('Nueva cotización');
  const [name, setName] = useState(''); // client's name

  const [idQuotation, setIdQuotation] = useState(0); // last's quotation ID
  const [quantity, setQuantity] = useState(1); // initial registered product quantity
  const [description, setDescription] = useState(''); // selected product description
  const [price, setPrice] = useState(0); //selected product single price
  const [selectedWarranty, setSelectedWarranty] = useState(''); //selected product current warranty

  const [hasTransducer, setHasTransducer] = useState(false); //const to know if a product has a list of transducers associated
  const [decoyTransducerState, setDecoyTransducerState] = useState(false); //

  const [transducers, setTransducers] = useState({}); //list of transducers associated
  const [selectedTransducer, setSelectedTransducer] = useState(''); //selected transducer

  const [products, setProducts] = useState({}); // products list
  const [current, setCurrent] = useState({}); //product's current object
  const [warranties, setWarranties] = useState({}); //warranties list according to each product
  const [conceptsList, setConceptsList] = useState([]); //list of concepts

  /** @note Billing info */
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [validity, setValidity] = useState();
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [observations, setObservations] = useState('');

  /* const [verPDF, setverPDF] = useState(false);

  const handleVerPDF = () => {
    setverPDF(!verPDF);
  } */

  /* const [modalProductOpen, setModalProductOpen] = useState(false); */
  const [modalOpen, setModalPDFOpen] = useState(false);
  const dialog = useRef(null);

  const openModalProduct = () => {
    dialog.current.showModal();
  }

  const closeModalProduct = (e) => {
    dialog.current.close();
  }

  /* const closeModalProduct = () => {
    setModalProductOpen(false);
  } */

  const openModalPDF = () => {
    setModalPDFOpen(true);
  }

  const closeModalPDF = () => {
    setModalPDFOpen(false);
    /** @note refresh page */
    window.location.reload(false);
  }

  useEffect(() => {
    fetch(urlLocal + 'getProducts/', {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {

        if (data) {
          setProducts(data);
        }
      })
  }, [])

  const handleSave = (e) => {
    if (e.target.value !== '---') {
      const found = products.find(element => element.name === e.target.value);
      setCurrent(found);

      if (found.hasTransducer) {
        //fetch data if transducers associated

        fetch(urlLocal + 'getHasTransducer/' + found.idProduct, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {

            if (data) {
              if (data[0].hasTransducer === 'YES')
                setHasTransducer(true);

              else {
                setHasTransducer(false);
              }
            }
          })


      }
      else {
        setHasTransducer(false);
      }

      setDescription(found.description);
      setPrice(found.singlePrice);

    }
    else {
      setCurrent({});
      setDescription('');
      setPrice(0);
      setQuantity(1);
      setHasTransducer(false);
    }


    setDecoyTransducerState(!decoyTransducerState);
  }

  const handleSaveTransducer = (e) => {
    setSelectedTransducer(e.target.value);
  }

  useEffect(() => {
    fetch(urlLocal + 'getTransducersFrom/' + current.idProduct, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {

        if (data) {
          setTransducers(data);
        }
      })

  }, [decoyTransducerState])


  const saveName = (e) => {
    setName(e.target.value);
  }

  const handleSaveWarranty = (e) => {
    setSelectedWarranty(e.target.value);
  }

  const handleSaveQuantity = (e) => {
    setQuantity(e.target.value);
  }


  const saveDeliveryCost = (e) => {
    setDeliveryCost(e.target.value);
  }

  const saveValidity = (e) => {
    setValidity(e.target.value);
  }

  const saveDeliveryTime = (e) => {
    setDeliveryTime(e.target.value);
  }

  const saveObservations = (e) => {
    setDeliveryTime(e.target.value);
  }

  useEffect(() => {

    console.log(current !== undefined);

    if (current !== undefined) {
      fetch(urlLocal + 'getWarranties/' + current.idProduct, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {

          if (data) {
            setWarranties(data);
          }
        })

      fetch(urlLocal + 'getLastQuotation', {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {

          if (data) {
            setIdQuotation(data[0].MAX); //retrieves last idquotation to simulate next one
          }
        })
    }


  }, [current])

  const handleAddConcept = () => { // adds concept to state variable until quotation is done

    var newConcept = {};
    var currentWarranty = '';

    if (selectedWarranty === '')
      currentWarranty = 'Sin garantía';
    else
      currentWarranty = selectedWarranty;


    console.log(currentWarranty);

    if (selectedWarranty !== '') {
      fetch(urlLocal + 'getIdWarranty/' + current.idProduct + '/' + currentWarranty, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {

          if (data) {
            let currentIdTransducer = -1;

            console.log(transducers);
            if (hasTransducer) {// if product has transducers available, search index
              const found = transducers.find(element => element.name === selectedTransducer);
              currentIdTransducer = found.idTransducer;
            }
            else { //since it doesn't have compatible transducers, selected transducer will be empty, so we search 'NONE' / 'Ninguno' directly
              const found = transducers.find(element => element.name === 'NONE');
              currentIdTransducer = found.idTransducer;
            }

            console.log(transducers);

            newConcept = { 'idProduct': current.idProduct, 'idQuotation': 0, 'idWarranty': data[0].idWarranty, 'idTransducer': currentIdTransducer, 'quantity': parseInt(quantity) }
            console.log(newConcept);
            const tempList = conceptsList;
            tempList.push(newConcept);
            setConceptsList(tempList);

            /* setCurrent({});
            setDescription('');
            setPrice(0);
            setQuantity(1); */
          }
        })

      setSelectedWarranty('')
    }
  }



  const handleVerPDF = () => {
    const pdfWindow = window.open('', '_blank');
    pdfWindow.document.write('<html><head><title>PDF Document</title></head><body>');
    pdfWindow.document.write('<div id="root"></div>');
    pdfWindow.document.write('</body></html>');
    pdfWindow.document.close();
    console.log(conceptsList);

  }

  /* const refreshPage = () => {
    window.location.reload(false);
  } */

  return (
    <div className={styles.container}>
      <div className={styles.divider}>
        <header>
          <h1>Nueva cotización</h1>
        </header>
        <Link to="/" className={styles.link}>&larr; Volver</Link>

        <dialog ref={dialog}>
          <ModalProduct close={closeModalProduct} />
        </dialog>

        <form className={styles.form}>
          <fieldset className={styles.formGroup}>
            <legend className={styles.legend}>Cliente</legend>
            <label htmlFor="name" className={styles.label}>Nombre</label>
            <input type="text" className={styles.input} id="name" name="name" placeholder="Leonardo Morales" value={name} onChange={saveName} required autoFocus />
          </fieldset>

          <fieldset className={styles.formGroup}>
            <div className={styles.legendButtonContainer}>
              <legend className={styles.legend}>Productos registrados</legend>
              <button type="button" className={`${styles.button} ${styles.default}`} onClick={() => openModalProduct()}>Registrar nuevo producto<FontAwesomeIcon icon={faPlus} /></button>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="products" className={styles.label}>Producto</label>
              <select name="products" id="products" className={styles.select} onChange={handleSave}>
                <option selected default>---</option>
                {(products.length !== undefined) && products.map((element) =>
                  <option key={element.key} value={element.value}>{element.name}</option>
                )}
              </select>
            </div>

            {hasTransducer &&
              <div className={styles.inputGroup}>
                <label htmlFor="transducers" className={styles.label}>Transductores</label>
                <select name="transducers" id="transducers" className={styles.select} onChange={handleSaveTransducer}>
                  <option selected default>---</option>
                  {(transducers.length !== undefined) && transducers.map((element) =>
                    <option key={element.key} value={element.value}>{element.name}</option>
                  )}
                </select>
              </div>
            }

            <div className={styles.inputGroup}>
              <label htmlFor="quantity" className={styles.label}>Cantidad</label>
              <input type="number" className={styles.input} id="quantity" name="quantity" value={quantity} onChange={handleSaveQuantity} required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="description" className={styles.label}>Descripción</label>
              <textarea name="description" className={styles.textarea} id="description" /* cols="30" rows="3" */ placeholder={description} title='Contenido no editable' readOnly></textarea>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="price" className={styles.label}>Precio unitario</label>
              <input type="number" className={styles.input} id="price" name="price" placeholder={'$ ' + price + ' MXN'} readOnly required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="warranty" className={styles.label}>Garantía</label>
              <select name="warranty" id="warranty" className={styles.select} onChange={handleSaveWarranty}>
                <option selected /* value="-1" */>---</option>
                {(warranties.length !== undefined) && warranties.map((element) =>
                  <option key={element.key} value={element.value}>{element.name}</option>
                )}
              </select>
            </div>
          </fieldset>

          <button type="button" className={buttonStyles.default} onClick={() => handleAddConcept()}>{'Agregar'}</button>
        </form>

        <form className={styles.form}>
          <fieldset className={styles.formGroup}>
            <legend className={styles.legend}>Facturación</legend>

            <div className={styles.inputGroup}>
              <label htmlFor="shippingCost" className={styles.label}>Costo de envío</label>
              <input type="number" className={styles.input} id="shippingCost" name="shippingCost" placeholder="$1000 MXN" onChange={saveDeliveryCost} required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="validity" className={styles.label}>Validez</label>
              <input type="date" className={styles.input} id="validity" name="validity" onChange={saveValidity} required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="deliveryTime" className={styles.label}>Tiempo de entrega</label>
              <input type="number" className={styles.input} id="deliveryTime" name="deliveryTime" placeholder="15 días" onChange={saveDeliveryTime} required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="observations" className={styles.label}>Observaciones</label>
              <input type="text" className={styles.input} id="observations" name="observations" placeholder="" onChange={saveObservations} required />
            </div>
          </fieldset>

          {/* disabled button until fields are filled */}
          <Button type="submit" text="Continuar" variant="default" />
        </form>
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
            <span>Dr. Ariana Alejandra Rivera Cruz</span>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>CANTIDAD</th>
                  <th>PRODUCTO</th>
                  <th>PRECIO UNITARIO</th>
                  <th>PRECIO TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Producto 1</td>
                  <td>$100,000 MX</td>
                  <td>$100,000 MX</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Producto 2</td>
                  <td>$100,000 MX</td>
                  <td>$100,000 MX</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Producto 3</td>
                  <td>$100,000 MX</td>
                  <td>$100,000 MX</td>
                </tr>
              </tbody>
            </table>
          </div>

          <footer className={styles.footer}>
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

          {/* <Button type="button" text="Confirmar" variant="default" /> */}

          <button type="button" className={buttonStyles.default} onClick={openModalPDF}>Confirmar</button>
          <ModalPDF title="Cotización creada exitosamente" open={modalOpen} onClose={closeModalPDF}>
            <p>La cotización ha sido creada y guardada exitosamente.</p>
            <footer className={styles.footer}>
              {/* <button className={buttonStyles.default} onClick={closeModalPDF}>Ver cotizaciones</button> */}
              <Link to="/cotizaciones" className={buttonStyles.default}>Ver cotizaciones</Link>
              <button className={buttonStyles.default} onClick={handleVerPDF}>Ver PDF</button>
              <PDFDownloadLink document={<PDFComponent />} fileName="cotizacion.pdf">
                <button className={buttonStyles.default}>Descargar PDF</button>
              </PDFDownloadLink>
            </footer>

          </ModalPDF>
        </div>
      </div>
    </div>
  );
}

export default Quotation;
