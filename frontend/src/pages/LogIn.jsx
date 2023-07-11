import logo from '../assets/logo.png'
import Button from '../components/Buttons'
import styles from './LogIn.module.css'

function LogIn() {
  return (
    <div className={styles.grid}>
      <header className={styles.header}>
        <img src={logo} alt="Logo" />
      </header>
      <div className={styles.logIn}>
        <h1>Inicio de sesión</h1>
        <form className={styles.form}>
          <fieldset className={styles.formGroup}>
            <label htmlFor="user">Usuario</label>
            <input type="text" id='user' name="user" placeholder="leomjs9774" required />
          </fieldset>

          <fieldset className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input type="password" id='password' name="password" placeholder="••••••••" required />
          </fieldset>

          <Button type="submit" text="Iniciar sesión" variant="default" />
        </form>
      </div>
      <footer>
        <span>Copyright© 2023 Company. Todos los derechos reservados.</span>
      </footer>
    </div>
  )
}

export default LogIn
