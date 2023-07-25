import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import LogIn from '../pages/LogIn';
import PDFPage from '../pages/PDFPage';
import Quotation from '../pages/Quotation';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/" element={<Layout />} >
          <Route path="nueva-cotizacion" element={<ProtectedRoute> <Quotation /> </ProtectedRoute>} />
          <Route path="pdf-page" element={<ProtectedRoute> <PDFPage /> </ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter
