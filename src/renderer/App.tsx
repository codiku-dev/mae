import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
// import { AppLoader } from './libs/app-loader';
import { ROUTES } from '../routes';
// import { HomePage } from './pages/home.page';
// import { SettingsPage } from './pages/settings.page';
// import { Sandbox } from './components/features/sandbox';
import { AppLoader } from './pages/app-loader';
import { HomePage } from './pages/home.page';
import { SettingsPage } from './pages/settings.page';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path={"/"} Component={Sandbox}></Route> */}
        <Route path={ROUTES.root} Component={AppLoader}>
          <Route path={ROUTES.home} Component={HomePage} />
          <Route path={ROUTES.settings} Component={SettingsPage} />
        </Route>
      </Routes>
    </Router>
  );
}
