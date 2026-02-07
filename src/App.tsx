import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Footer from './components/footer';

import Home from './pages/home';
import LegalNotice from './pages/legalNotice';
import CGV from './pages/cgv';
import Header from './components/header';
import Contact from './pages/contact';
import Explorer from './pages/explorer';

import ScrollToAnchor from './utils/scrollToHash';

export default function App() {
  return (
    <div id="global-wrapper" className='h-screen w-screen select-none' >
      <Router>
        <Header />
        <div className="relative flex-1">
          <ScrollToAnchor />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/mentions-legales" element={<LegalNotice />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/explorer" element={<Explorer />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
