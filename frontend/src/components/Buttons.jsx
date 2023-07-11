import styles from '../styles/Buttons.module.css';

const Button = ({ type, text, variant }) => {
    return <button type={type} className={styles[variant]}>{text}</button>;
}

export default Button;
