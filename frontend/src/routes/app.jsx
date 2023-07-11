import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogIn from '../pages/LogIn';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter
