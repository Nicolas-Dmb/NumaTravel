import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';

export default function App() {
  return (
    <div id="global-wrapper" className={`h-screen w-screen flex flex-col`} >
      <Router>
        <div className="relative overflow-hidden flex-1">
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
