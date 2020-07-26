import React from 'react';
import styled, { withTheme } from 'styled-components';
import Header from '@/components/UI/Header';

import withUser from '@/components/higher-order/withUser';
import Footer from '@/components/UI/Footer';
import P_Details from './components/p_details';
import ProfileWidget from '@/components/widgets/UI/Profile';

const ParentContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.page_background};
  height: 1000px;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 880px;
  height: 500px;
  margin: 0 auto;
  display: inherit;
  flex-flow: column wrap;
  justify-content: space-between;
`;

const ActionContainer = styled.div`
  width: 633px;
  height: 500px;
  background: white;
  box-sizing: border-box;
  padding: 40px 32px;
  border-radius: 4px;
`;

const Account = (props) => {
  return (
    <ParentContainer>
      <Header useOwnBackground />
      <Container>
        <ProfileWidget />
        <ActionContainer>
          <P_Details />
        </ActionContainer>
      </Container>
      <Footer />
    </ParentContainer>
  );
};

export default withUser(withTheme(Account), true);
