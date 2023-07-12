import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import LogIn from '../pages/LogIn';
import Quotation from '../pages/Quotation';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/" element={<Layout />} >
          <Route path="nueva-cotizacion" element={<Quotation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter
