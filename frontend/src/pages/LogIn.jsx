import { useState } from 'react';
import { urlLocal } from '../../constants';
import logo from '../assets/logo.png';
import Button from '../components/Buttons';
import styles from './LogIn.module.css';

function LogIn() {

  const [admin, setAdmin] = useState('');
  const [password, setPassword] = useState('');

  const handleAdmin = (e) => {
    setAdmin(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    let formData = JSON.stringify({
      "name": admin,
      "password": password,
    });

    fetch(urlLocal + 'login/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {

        if (data) {

          console.log(data.mensaje);

          if (data.mensaje !== 'login failed') {
            localStorage.setItem('token', data.token);
          }
          else {
            // login failed modal
          }

        }
      })

  }

  return (
    <div className={styles.grid}>

      <header className={styles.header}>
        <img src={logo} alt="Logo" />
      </header>

      <div className={styles.logIn}>

        <h1>Inicio de sesión</h1>
        <form className={styles.form} onSubmit={handleSubmit}>

          <fieldset className={styles.formGroup}>
            <label htmlFor="user">Usuario</label>
            <input type="text" className={styles.input} id='user' name="user" placeholder="leomjs9774" onChange={handleAdmin} required />
          </fieldset>

          <fieldset className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input type="password" className={styles.input} id='password' name="password" placeholder="••••••••" onChange={handlePassword} required />
          </fieldset >

          <Button type="submit" text="Iniciar sesión" variant="default" />
        </form>
      </div>

      <footer className={styles.footer}>
        <span>Copyright© 2023 Hit Médica. Todos los derechos reservados.</span>
      </footer>

    </div>
  )
}

export default LogIn
