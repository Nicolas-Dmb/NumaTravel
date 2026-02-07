import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Footer from './components/footer';
import { lazy, Suspense } from "react";
import Header from './components/header';

const Home = lazy(() => import("./pages/home"));
const Contact = lazy(() => import("./pages/contact"));
const Explorer = lazy(() => import("./pages/explorer"));
const LegalNotice = lazy(() => import("./pages/legalNotice"));
const CGV = lazy(() => import("./pages/cgv"));

import ScrollToAnchor from './utils/scrollToHash';

export default function App() {
  return (
    <div id="global-wrapper" className='h-screen w-screen select-none' >
      <Router>
        <Header />
        <div className="relative flex-1">
          <ScrollToAnchor />
          <Suspense fallback={<div className="p-6">Chargement...</div>}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/mentions-legales" element={<LegalNotice />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/explorer" element={<Explorer />} />
          </Routes>
          </Suspense>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
