import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import GlobalStyles from '@/assets/theme/fonts.js';
import './App.css';
import '@/assets/theme/fontawesome';

import Loading from '@/components/UI/interface/home/Loading';

function App(props) {
  const Home = React.lazy(() => import('./components/pages/Home/Home.jsx'));
  const Auth = React.lazy(() => import('./components/pages/Auth/Auth.jsx'));
  const Account = React.lazy(() =>
    import('./components/pages/Account/Index.jsx'),
  );
  const User = React.lazy(() => import('./components/pages/User/Index.jsx'));
  const Search = React.lazy(() =>
    import('./components/pages/Search/Index.jsx'),
  );
  const Store = React.lazy(() => import('./components/pages/Stores/Index.jsx'));
  const Page404 = React.lazy(() => import('./components/pages/404/Index.jsx'));

  return (
    <div>
      <GlobalStyles />
      {/* <Router> */}
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
        <Route path="/users/:user_name">
          <Suspense fallback={<Loading />}>
            <User />
          </Suspense>
        </Route>
        <Route path="/search">
          <Suspense fallback={<Loading />}>
            <Search />
          </Suspense>
        </Route>
        <Route path="/stores/:store_name">
          <Suspense fallback={<Loading />}>
            <Store />
          </Suspense>
        </Route>
        <Route path="/">
          <Suspense fallback={<Loading />}>
            <Page404 />
          </Suspense>
        </Route>
      </Switch>
      {/* </Router> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
  };
};

export default connect(mapStateToProps)(App);
