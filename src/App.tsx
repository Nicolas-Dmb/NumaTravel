import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Footer from './components/footer';
import { lazy, Suspense, useState } from "react";
import Header from './components/header';
import MetaContact from "./pages/metaForms";
import ScrollToAnchor from './utils/scrollToHash';
import Thanks from "./pages/Thanks";

const Home = lazy(() => import("./pages/home"));
const Contact = lazy(() => import("./pages/contact"));
const Explorer = lazy(() => import("./pages/explorer"));
const LegalNotice = lazy(() => import("./pages/legalNotice"));
const CGV = lazy(() => import("./pages/cgv"));

export default function App() {
  const [isMetaRoutes, setMetaRoutes] = useState(false);

  return (
    <div id="global-wrapper" className='h-screen w-screen select-none' >
      <Router>
        <Header isMetaRoutes={isMetaRoutes} />
        <div className="relative flex-1">
          <ScrollToAnchor />
          <Suspense fallback={<div className="p-6">Chargement...</div>}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/mentions-legales" element={<LegalNotice isMetaRoutes={isMetaRoutes}/>} />
            <Route path="/cgv" element={<CGV isMetaRoutes={isMetaRoutes}/>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/explorer" element={<Explorer />} />
            <Route path='/go' element={<Home />} />
            <Route path='/meta-contact' element={<MetaContact setMetaRoutes={setMetaRoutes} />} />
            <Route path='/meta-contact/success' element={<Thanks setMetaRoutes={setMetaRoutes}/>} />
          </Routes>
          </Suspense>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
