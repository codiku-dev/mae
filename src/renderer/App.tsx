import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import { ROUTES } from '../routes';

import { AppLoader } from './pages/app-loader';
import { AiChatPage } from './pages/ai-chat.page';
import { SettingsPage } from './pages/settings.page';
import { TutorialPage } from './pages/tutorial.page';
import { IdlePage } from './pages/idle.page';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const displayTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}:${seconds}`;
      console.log(timeString);
    };
    displayTime();

  }, [])
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.root} Component={AppLoader}>
          <Route path={ROUTES.idle} Component={IdlePage} />
          <Route path={ROUTES.aiChat} Component={AiChatPage} />
          <Route path={ROUTES.tutorial} Component={TutorialPage} />
          <Route path={ROUTES.settings} Component={SettingsPage} />
        </Route>
      </Routes>
    </Router>
  );
}
