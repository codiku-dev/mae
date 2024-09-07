import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import { ROUTES } from './libs/routes';
import { Home } from './pages/Home/Home';
import { SplashScreen } from './pages/SplashScreen/SplashScreen';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.splash} element={<SplashScreen />} />
        <Route path={ROUTES.home} element={<Home />} />
      </Routes>
    </Router>
  );
}
