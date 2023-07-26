import useTabTitle from "../hooks/useTabTitle";
/* import styles from '../styles/Quotations.module.css'; */
function Quotation() {
    useTabTitle("Cotizaciones");
    return (
        <div>
            <header>
                <h1>Cotizaciones</h1>
                <button>Nueva Cotización</button>
            </header>
        </div>
    );
}

export default Quotation;
