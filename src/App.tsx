import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Footer from './components/footer';
import { lazy, Suspense, useState } from "react";
import Header from './components/header';
import MetaContact from "./pages/metaForms";
import ScrollToAnchor from './utils/scrollToHash';
import Thanks from "./pages/Thanks";
import useForms from "./features/meta/hooks/useForms";
import { CookiesBanner, CookiesPopup } from "./features/meta/components/cookies";
import { CookieConsent } from "./features/meta/model/formResponse";
import { ContactModal } from "./features/meta/components/contactModal";

const Home = lazy(() => import("./pages/home"));
const Contact = lazy(() => import("./pages/contact"));
const Explorer = lazy(() => import("./pages/explorer"));
const LegalNotice = lazy(() => import("./pages/legalNotice"));
const CGV = lazy(() => import("./pages/cgv"));

export default function App() {

  console.error("Test error tracking");

  return (
      <Router>
        <AppShell />
      </Router>
  );
}

function AppShell(){
  const [isMetaRoutes, setMetaRoutes] = useState(false); 
  const { error, handleSubmit, isLoading, displayModalCookies, handlePopupAccept, handlePopupRefuse, handleBannerAccept, handleBannerRefuse, showCookies, displayContactModal, setDisplayContactModal } = useForms();

  return (
    <div id="global-wrapper" className='h-screen w-screen select-none' >
      <Header isMetaRoutes={isMetaRoutes} />
        <div className="relative flex-1">
          <ScrollToAnchor />
          <Suspense fallback={<div className="p-6">Chargement...</div>}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/mentions-legales" element={<LegalNotice isMetaRoutes={isMetaRoutes}/>} />
            <Route path="/cgv" element={<CGV isMetaRoutes={isMetaRoutes}/>} />
            <Route path="/contact" element={<Contact error={error} handleSubmit={handleSubmit} isLoading={isLoading} setMetaRoutes={setMetaRoutes}/>} />
            <Route path="/explorer" element={<Explorer />} />
            <Route path='/go' element={<Home />} />
            <Route path='/meta-contact' element={<MetaContact setMetaRoutes={setMetaRoutes} error={error} handleSubmit={handleSubmit} isLoading={isLoading} />} />
            <Route path='/meta-contact/success' element={<Thanks setMetaRoutes={setMetaRoutes}/>} />
          </Routes>
          </Suspense>
        </div>
        <Footer />
        {displayModalCookies && <CookiesPopup handlePopupAccept={handlePopupAccept} handlePopupRefuse={handlePopupRefuse} />}
        {showCookies === CookieConsent.UNSET && !displayModalCookies && <CookiesBanner handleBannerAccept={handleBannerAccept} handleBannerRefuse={handleBannerRefuse} />}
        {displayContactModal && <ContactModal isOpen={displayContactModal} onClose={() => setDisplayContactModal(false)} />}
    </div>
  );
}