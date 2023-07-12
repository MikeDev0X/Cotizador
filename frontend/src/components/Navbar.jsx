import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarContainer}>
        <li className={styles.navbarItem}>
          <Link to="/"> <img src={logo} alt="Logo" /> </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
