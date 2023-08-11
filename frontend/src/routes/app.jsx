import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import TestPage from '../components/TestPage.jsx';
import LogIn from '../pages/LogIn';
import PDFPage from '../pages/PDFPage';
import Quotation from '../pages/Quotation';
import Quotations from '../pages/Quotations';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/" element={<Layout />} >
          <Route path="test" element={<TestPage />} />
          <Route path="cotizaciones" element={<Quotations />} />
          <Route path="nueva-cotizacion" element={<Quotation />} />
          <Route path="pdf-page" element={<ProtectedRoute> <PDFPage /> </ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter
