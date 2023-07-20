import { Link } from 'react-router-dom';
import { urlLocal } from '../../constants';
import Button from '../components/Buttons';
import styles from '../styles/Quotation.module.css';
import { useEffect, useState, useCallback } from 'react';
import buttonStyles from '../styles/Buttons.module.css';


function Quotation() {
  const [name, setName] = useState(''); // client's name

  const [idQuotation, setIdQuotation] = useState(0); // last's quotation ID
  const [quantity, setQuantity] = useState(1); // initial registered product quantity
  const [description, setDescription] = useState(''); // selected product description
  const [price, setPrice] = useState(0); //selected product single price
  const [selectedWarranty, setSelectedWarranty] = useState(''); //selected product current warranty
  const [hasTransducer, setHasTransducer] = useState(false);
  const [transducers, setTransducers] = useState({});

  const [products, setProducts] = useState({}); // products list
  const [current, setCurrent] = useState({}); //product's current object
  const [warranties, setWarranties] = useState({}); //warranties list according to each product
  const [conceptsList, setConceptsList] = useState([]); //list of concepts

  /* Billing info */
  const[deliveryTime, setDeliveryTime] = useState(0);
  const[validity, setValidity] = useState();
  const[deliveryCost, setDeliveryCost] = useState(0);
  const[observations, setObservations] = useState('');


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
    if(e.target.value !== '---'){
      const found = products.find(element => element.name === e.target.value);
      setCurrent(found);

      if(found.hasTransducer){
        //fetch data if transducers associated

        fetch(urlLocal + 'getTransducers/' + found.idProduct, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {

            if (data) {
              if(data[0].hasTransducer === 'YES')
                setHasTransducer(true);
              else
                setHasTransducer(false);

            }
          })


      }
      else{
        setHasTransducer(false);
      } 

      setDescription(found.description);
      setPrice(found.singlePrice);

    }
    else{
      setCurrent({});
      setDescription('');
      setPrice(0);
      setQuantity(1);
      setHasTransducer(false);
    }
    
  }

  const handleSaveWarranty = (e) =>{
    setSelectedWarranty(e.target.value);
  }

  const handleSaveQuantity = (e) =>{
    setQuantity(e.target.value);
  }


  const saveDeliveryCost = (e) =>{
    setDeliveryCost(e.target.value);
  }

  const saveValidity = (e) => {
    setValidity(e.target.value);
    console.log(e.target.value);
  }

  const saveDeliveryTime = (e) => {
    setDeliveryTime(e.target.value);
  }

  const saveObservations = (e) => {
    setDeliveryTime(e.target.value);
  }



  useEffect(() => {

    console.log(current!==undefined);

    if(current!==undefined){
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

  const handleAddConcept = () =>{ // adds concept to state variable until quotation is done

    var newConcept = {};

    if(selectedWarranty!==''){
      fetch(urlLocal + 'getIdWarranty/' + current.idProduct + '/' + selectedWarranty, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {

          if (data) {

            newConcept = { 'idProduct': current.idProduct, 'idQuotation': idQuotation + 1, 'idWarranty': data[0].idWarranty, 'quantity': parseInt(quantity) }
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
    }
    



  }

  console.log(conceptsList);



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
                <select name="transducers" id="transducers" className={styles.select} onChange={handleSave}>
                  <option selected default>---</option>
                  {(products.length !== undefined) && products.map((element) =>
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
              <input type="number" className={styles.input} id="price" name="price" placeholder={'$ '+price + ' MXN'} readOnly required />
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
