import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Num_array from '@/assets/fixtures/numbers';
import Logo from '@/components/UI/interface/NumbersLogo';

const ParentContainer = styled.div`
  background: ${(props) => props.theme.colors.light_background};
  display: flex;
  align-items: center;
  @media (min-width: 1280px) {
    padding: 0px 200px;
    height: 372px;
  }
  @media (min-width: 880px) and (max-width: 1279px) {
    padding: 0px 100px;
    height: 372px;
  }
  @media (min-width: 533px) and (max-width: 879px) {
    padding: 0px 50px;
    height: 372px;
  }
  @media (max-width: 600px) {
    padding: 0px 20px;
    height: 800px;
  }
`;

const Container = styled.div`
  position: relative;
  width: 880px;
  height: 292px;
  margin: 0 auto;
  background: ${(props) => props.theme.colors.alternate_light_background_10};
  border-radius: 8px;
  box-sizing: border-box;
  padding: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  overflow: hidden;
  @media (max-width: 700px) {
    padding: 40px 10px;
  }
  @media (max-width: 600px) {
    width: 340px;
    height: 700px;
    flex-flow: row wrap;
    justify-content: center;
  }
`;

const NumContainer = styled.div`
  width: 170px;
  height: 212px;
`;

const Number = styled.div`
  width: 100px;
  height: 100px;
  border: 2px solid ${(props) => props.theme.colors.yellow};
  border-radius: 50%;
  text-align: center;
  margin: 0 auto;
  line-height: 100px;
  color: ${(props) => props.theme.colors.yellow};
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-family: 'Josefin Sans Regular';
`;

const Title = styled.div`
  width: 100%;
  height: 26px;
  padding: 0px 45px;
  box-sizing: border-box;
`;

const TitleCopy = styled.h5`
  margin: 8px auto 0px auto;
  font-size: 14px;
  font-family: 'Oxygen Bold', 'Arial';
  color: ${(props) => props.theme.colors.yellow};
`;

const Line = styled.span`
  margin: 4px 0px 16px 0px;
  width: 20px;
  height: 1px;
  display: block;
  background: ${(props) => props.theme.colors.yellow};
`;
const Copy = styled.p`
  margin: 8px 0px;
  width: 100%;
  color: ${(props) => props.theme.colors.font_high_contrast};
  font-size: 14px;
  font-family: 'Oxygen Regular';
  font-weight: 300;
  text-align: center;
`;

const LogoCon = styled.svg`
  position: absolute;
  left: 30%;
  top: 0;
  width: 325px;
  height: 325px;
  @media (max-width: 600px) {
    left: 7.5px;
    top: 185px;
  }
`;

const Numbers = (props) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, []);
  return (
    <ParentContainer>
      <Container data-aos="fade-up">
        <LogoCon>
          <Logo />
        </LogoCon>
        {Num_array.map((num) => {
          return (
            <NumContainer key={num.title}>
              <Number>{num.number}</Number>
              <Title>
                <TitleCopy>{num.title}</TitleCopy>
                <Line />
              </Title>
              <Copy>{num.copy}</Copy>
            </NumContainer>
          );
        })}
      </Container>
    </ParentContainer>
  );
};

export default Numbers;
