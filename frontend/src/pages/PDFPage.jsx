import { PDFViewer } from '@react-pdf/renderer';
import PDF from '../components/PDFComponent';

function PDFPage() {
    return (
        <PDFViewer style={{ width: "100%", height: "100vh", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "100" }}>
            <PDF />
        </PDFViewer>
    );
}

export default PDFPage;
