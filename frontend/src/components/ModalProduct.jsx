import { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { urlLocal } from "../../constants";

import styles from "../styles/Modal.module.css";

const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);

  // styles
  let bg = "white";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    width: "auto",
    backgroundColor: bg,
    color: "black",
    display: "flex ",
  };

  // prop assignment
  const props = {
    ...innerProps,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <input type="checkbox" checked={isSelected} />
      {children}
    </components.Option>
  );
};

const ModalProduct = ({ close }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [hasTransducer, setHasTransducer] = useState(false);

  const [transducersList, setTransducersList] = useState({});
  const [warrantiesList, setWarrantiesList] = useState({});
  const [otherWarranty, setOtherWarranty] = useState("");
  const [otherTransducer, setOtherTransducer] = useState("");

  const [selectedTransducers, setSelectedTransducers] = useState([]);
  const [selectedWarranties, setSelectedWarranties] = useState([]);

  const [createdIdProduct, setCreatedIdProduct] = useState(0);

  useEffect(() => {
    // gets a list of all warranties on first render
    fetch(urlLocal + "getAllWarranties/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const decoy = [];

          for (let x = 0; x < data.length; x++) {
            decoy.push({ value: data[x].name, label: data[x].name });
          }

          setWarrantiesList(decoy);
        }
      });
  }, []);

  const saveOtherWarranty = (e) => {
    setOtherWarranty(e.target.value);
  };

  const saveOtherTransducer = (e) => {
    setOtherTransducer(e.target.value);
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setPrice(0);

    //adds other warranty to selectedWarranties
    if (otherWarranty !== "") {
      const decWarranty = selectedWarranties;
      decWarranty.push(otherWarranty);
      setOtherWarranty("");
      setSelectedWarranties(decWarranty);
    }

    //adds other transducer to selectedTransducers

    if (otherTransducer !== "") {
      const decTransducer = selectedTransducers;
      decTransducer.push(otherTransducer);
      setOtherTransducer("");
      setSelectedTransducers(decTransducer);
    }

    //Create product and retrieve idProduct
    let word = 0;
    word =
      hasTransducer && selectedTransducers.length > 0
        ? (word = "YES")
        : (word = "NO");

    let formData = JSON.stringify({
      name: name,
      hasTransducer: word,
      description: description,
      singlePrice: price,
    });

    fetch(urlLocal + "addProduct/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setCreatedIdProduct(data);

          // construct objects and assign defaults
          // Warranties
          let finalWarranties = [];

          if (selectedWarranties.length > 0) {
            // push default warranty (Sin garantía), if not selected

            const found = selectedWarranties.find(
              (element) => element === "Sin garantía"
            );

            // if found === undefined, insert default warranty
            if (found === undefined)
              finalWarranties.push({ idProduct: data, name: "Sin garantía" });

            for (let x = 0; x < selectedWarranties.length; x++) {
              finalWarranties.push({
                idProduct: data,
                name: selectedWarranties[x],
              });
            }

            console.log(finalWarranties);
          } else {
            // open to update for alert modal
            console.log("tiene que seleccionar o escribir una garantía");
          }

          // Transducers

          let finalTransducers = [];

          if (hasTransducer) {
            if (selectedTransducers.length > 0) {
              for (let x = 0; x < selectedTransducers.length; x++) {
                finalTransducers.push({
                  idProduct: data,
                  name: selectedTransducers[x],
                });
              }
            } else {
              // open to update for alert modal
              console.log("tiene que seleccionar o escribir un transductor");
            }
          } else {
            // default transducer  =  NONE
            finalTransducers.push({ idProduct: data, name: "NONE" });
          }

          console.log(finalTransducers);

          // Insert finalTransducers and finalWarranties in DB

          let status = false;
          let values = {};
          values = finalWarranties;

          console.log(values);

          fetch(urlLocal + "addMultipleWarranties/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(finalWarranties),
          })
            .then((response) => response.json())
            .then((data1) => {
              if (data1) {
                // multiple warranties added correctly

                console.log("Garantías agregadas correctamente");

                fetch(urlLocal + "addMultipleTransducers/", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(finalTransducers),
                })
                  .then((response) => response.json())
                  .then((data2) => {
                    if (data2) {
                      // multiple transducers added correctly

                      console.log("Transductores agregados correctamente");

                      // reset selectedWarranties and selectedTransducers
                      setSelectedTransducers({});
                      setSelectedWarranties({});
                    } else {
                      console.log(
                        `Transducers weren't added correctly, try again later`
                      );
                    }
                  });
              } else {
                console.log(
                  `Warranties weren't added correctly, try again later`
                );
              }
            });
        }
      });

    close();
  };

  useEffect(() => {
    /* const areInputsEmpty = !name || !description || !price || !warranty;
    setIsButtonDisabled(areInputsEmpty); */
    if (
      name !== "" &&
      description !== "" &&
      price !== "" &&
      selectedWarranties.length !== 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, description, price, selectedTransducers, selectedWarranties]);

  const names = [
    { value: "option 1", label: "option 1" },
    { value: "option 2", label: "option 2" },
    { value: "option 3", label: "option 3" },
    { value: "option 4", label: "option 4" },
  ];

  useEffect(() => {
    if (hasTransducer) {
      fetch(urlLocal + "getAllTransducers/", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            const decoy = [];

            for (let x = 0; x < data.length; x++) {
              decoy.push({ value: data[x].name, label: data[x].name });
            }

            setTransducersList(decoy);
          }
        });
    }
  }, [hasTransducer]);

  return (
    <>
      <header style={{ padding: "1em", marginBottom: "1em" }}>
        <h1>Registar nuevo producto</h1>
      </header>
      <div className={styles.content}>
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
              Descripción
            </label>
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
              Precio unitario
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

          <div style={{ display: "flex" }}>
            <div style={{ width: "11em" }}>
              <Select
                defaultValue={[]}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onChange={(options) => {
                  if (Array.isArray(options)) {
                    setSelectedWarranties(options.map((opt) => opt.value));
                  }
                }}
                options={warrantiesList}
                components={{
                  Option: InputOption,
                }}
                placeholder="Garantías disponibles"
              />
            </div>

            <div
              style={{
                marginLeft: "1em",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
              }}
            >
              <label htmlFor="other" style={{ width: "3rem" }}>
                Otro
              </label>
              <input
                type="text"
                className={styles.other}
                id="otro"
                name="otro"
                placeholder="Nueva garantía"
                value={otherWarranty}
                onChange={saveOtherWarranty}
                required
              />
            </div>
          </div>

          <hr></hr>

          {hasTransducer && (
            <div style={{ display: "flex" }}>
              <div style={{ width: "11em" }}>
                <Select
                  defaultValue={[]}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  onChange={(options) => {
                    if (Array.isArray(options)) {
                      setSelectedTransducers(options.map((opt) => opt.value));
                    }
                  }}
                  options={transducersList}
                  components={{
                    Option: InputOption,
                  }}
                  placeholder="Transductores disponibles"
                />
              </div>

              <div
                style={{
                  marginLeft: "1em",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <label htmlFor="other" style={{ width: "3rem" }}>
                  Otro
                </label>
                <input
                  type="text"
                  className={styles.other}
                  id="otro"
                  name="otro"
                  placeholder="Nuevo transductor"
                  value={otherTransducer}
                  onChange={saveOtherTransducer}
                  required
                />
              </div>
            </div>
          )}

          <div className={styles.inputGroup}>
            <input
              type="checkbox"
              onChange={() => setHasTransducer(() => !hasTransducer)}
            />
            <span>{"El producto cuenta con transductores"}</span>
          </div>
        </fieldset>

        <footer>
          <button
            onClick={() => handleClose()}
            className={`${styles.button} ${styles.variant}`}
          >
            Cancelar
          </button>
          <button
            onClick={() => handleClose()}
            className={`${styles.button} ${styles.default}`}
            title={isButtonDisabled ? "Llena todos los campos" : undefined}
            disabled={isButtonDisabled}
          >
            Registrar
          </button>
        </footer>
      </div>
    </>
  );
};

export default ModalProduct;
