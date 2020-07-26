import React, { useEffect } from 'react';
import styled from 'styled-components';

import LandingScreen from './Sections/LandingScreen';
import ValueProposition from './Sections/ValueProposition';
import VendorHighlights from './Sections/VendorHighlights';
import Categories from './Sections/Categories';
import Benefits from './Sections/Benefits';
import Sandbox from './Sections/Sandbox';
import Numbers from './Sections/Numbers';
import Testimonials from './Sections/Testimonials';
import Footer from '@/components/UI/Footer';
// import Loading from '@/components/UI/interface/Loading';

import Users from '@/assets/fixtures/users';
import withUser from '@/components/higher-order/withUser';
import { withRouter } from 'react-router-dom';

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden !important;
  @media (max-width: 400px) {
    overflow-x: hidden !important;
  }
`;

const Home = (props) => {
  useEffect(() => {
    if (props.user.loggedIn) {
      return props.history.push('/account');
    }
  });
  return (
    <HomeContainer>
      <LandingScreen />
      <ValueProposition />
      <VendorHighlights profiles={Users} />
      <Categories />
      <Benefits />
      <Sandbox />
      <Numbers />
      <Testimonials />
      <Footer />
    </HomeContainer>
  );
};

export default withRouter(withUser(Home));
