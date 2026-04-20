import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Campaigns } from './pages/Campaigns';
import { Automations } from './pages/Automations';
import { Analytics } from './pages/Analytics';
import { SettingsPage } from './pages/Settings';
import { Leads } from './pages/Leads';
import { Inbox } from './pages/Inbox';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "inbox", element: <Inbox /> },
      { path: "campaigns", element: <Campaigns /> },
      { path: "automations", element: <Automations /> },
      { path: "leads", element: <Leads /> },
      { path: "analytics", element: <Analytics /> },
      { path: "settings", element: <SettingsPage /> },
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
