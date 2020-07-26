import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyles from '@/assets/theme/fonts.js';
import './App.css';
import '@/assets/theme/fontawesome';

import Loading from '@/components/UI/interface/Loading';

function App() {
  const Home = React.lazy(() => import('./components/pages/Home/Home'));
  const Auth = React.lazy(() => import('./components/pages/Auth/Auth'));
  const Account = React.lazy(() =>
    import('./components/pages/Account/Account'),
  );
  return (
    <div>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          </Route>
          <Route path="/auth">
            <Suspense fallback={<Loading />}>
              <Auth />
            </Suspense>
          </Route>
          <Route path="/account">
            <Suspense fallback={<Loading />}>
              <Account />
            </Suspense>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
