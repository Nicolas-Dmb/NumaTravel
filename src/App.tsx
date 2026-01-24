import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Footer from './components/footer';
import LegalNotice from './pages/legalNotice';
import CGV from './pages/cgv';

export default function App() {
  return (
    <div id="global-wrapper" className='h-screen w-screen' >
      <Router>
        <div className="relative flex-1">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/mentions-legales" element={<LegalNotice />} />
            <Route path="/cgv" element={<CGV />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
