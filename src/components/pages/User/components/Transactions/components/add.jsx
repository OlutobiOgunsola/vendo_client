import React from 'react';
import styled from 'styled-components';

const ParentContainer = styled.div`
  width: 100%;
  height: 100%;
  background: red;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Add = (props) => {
  return (
    <ParentContainer>
      <Container></Container>
    </ParentContainer>
  );
};

export default Add;
