import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Dashboard } from 'pages/dashboard';
import { WalletConnect } from 'pages/wallet/connect';
import { WalletList } from 'pages/wallet/list';
import appRoutes from './routes';

function AppRoutes() {
  const { auth, dashboard, wallet } = appRoutes;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={dashboard} element={<Dashboard />} />
          <Route path={wallet.connect} element={<WalletConnect />} />
          <Route path={wallet.list} element={<WalletList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
