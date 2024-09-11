import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import { AppLoader } from './libs/app-loader';
import { ROUTES } from './libs/routes';
import { HomePage } from './pages/home.page';
import { SettingsPage } from './pages/settings.page';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.root} Component={AppLoader}>
          <Route path={ROUTES.home} Component={HomePage} />
          <Route path={ROUTES.settings} Component={SettingsPage} />
        </Route>
      </Routes>
    </Router>
  );
}
