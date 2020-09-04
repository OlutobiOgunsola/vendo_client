import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import GlobalStyles from '@/assets/theme/fonts.js';
import './App.css';
import '@/assets/theme/fontawesome';

import Loading from '@/components/UI/interface/home/Loading';
import Header from './components/UI/Header';

function App(props) {
  const Home = React.lazy(() => import('./components/pages/Home/Home'));
  const Auth = React.lazy(() => import('./components/pages/Auth/Auth'));
  const Account = React.lazy(() =>
    import('./components/pages/Account/Account'),
  );
  const User = React.lazy(() =>
    import('./components/pages/User/Users'),
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
          <Route path="/users/:user_id">
            <Suspense fallback={<Loading />}>
              <User />
            </Suspense>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
  };
};

export default connect(mapStateToProps)(App);
