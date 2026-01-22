import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';

export default function App() {
  return (
    <div id="global-wrapper" className='h-screen w-screen' >
      <Router>
        <div className="relative flex-1">
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
