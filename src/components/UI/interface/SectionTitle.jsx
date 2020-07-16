import React, { useEffect } from 'react';
import styled from 'styled-components';

import AOS from 'aos';
import 'aos/dist/aos.css';

const ParentContainer = styled.div`
  margin-bottom: 40px;
`;
const Container = styled.div`
  width: 880px;
  margin: 0 auto;
  box-sizing: border-box;
  @media (max-width: 980px) {
    width: 780px;
  }
  @media (max-width: 880px) {
    width: 680px;
  }
  @media (max-width: 680px) {
    width: 480px;
  }
  @media (max-width: 500px) {
    width: 100%;
    /* padding: 0px 20px; */
  }
  text-align: ${(props) => (props.centered ? 'center' : 'left')};
`;

const Copy = styled.h3`
  font-family: 'Noto Sans Regular', 'Arial';
  font-weight: 300;
  font-size: 20px;
  margin: 0px;
  color: ${(props) => props.theme.colors.font_high_contrast};
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

const FatLine = styled.span`
  display: inline-block;
  height: 5px;
  width: 32px;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.yellow};
  margin: ${(props) =>
    props.centered ? '4px auto 0px auto' : '4px 0px 0px 0px'};
`;

const ThinLine = styled.span`
  display: block;
  height: 1px;
  width: 32px;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.high_contrast};
  margin: ${(props) =>
    props.centered ? '4px auto 0px auto' : '4px 0px 0px 0px'};
`;

const SectionTitle = (props) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, []);
  return (
    <ParentContainer>
      <Container centered={props.centered} data-aos={props.aos}>
        <Copy>{props.children}</Copy>
        {props.fat && <FatLine centered={props.centered} />}
        {props.thin && <ThinLine centered={props.centered} />}
      </Container>
    </ParentContainer>
  );
};

export default SectionTitle;
