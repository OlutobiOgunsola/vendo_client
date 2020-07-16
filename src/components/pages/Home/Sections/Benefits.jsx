import React, { useEffect } from 'react';
import styled from 'styled-components';
import SectionTitle from '@/components/UI/interface/SectionTitle';
import AOS from 'aos';
import 'aos/dist/aos.css';

import backgroundHorImgDark from '@/assets/images/backgrounds/benefitsLinksHorDark.png';
import backgroundHorImgLight from '@/assets/images/backgrounds/benefitsLinksHorLight.png';
// import backgroundVerImg from '@/assets/images/backgrounds/benefitsLinksVer.png';

import BenefitsList from '@/assets/fixtures/benefits';

const ParentContainer = styled.div`
  width: 100%;
  height: 400px;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.light_background};
  background-image: ${(props) =>
    props.theme.scheme === 'light'
      ? `url(${backgroundHorImgLight})`
      : `url(${backgroundHorImgDark})`};
  background-size: cover;
  @media (min-width: 1280px) {
    padding: 0px 200px;
  }
  @media (min-width: 880px) and (max-width: 1280px) {
    padding: 0px 100px;
    height: 400px;
  }
  @media (min-width: 533px) and (max-width: 879px) {
    padding: 0px 50px;
    height: 400px;
  }
  @media (max-width: 532px) {
    padding: 0px 20px;
    height: 700px;
  }
  @media (max-width: 380px) {
    height: 700px;
  }
`;

const Container = styled.div`
  width: 880px;
  height: 240px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0 auto;
  @media (max-width: 1000px) {
    width: 720px;
  }
  @media (max-width: 780px) {
    width: 600px;
  }

  @media (max-width: 680px) {
    width: 500px;
  }

  @media (max-width: 580px) {
    width: 400px;
    height: 300px;
  }
  @media (max-width: 480px) {
    width: 260px;
    height: 568px;
    flex-flow: column wrap;
    align-items: center;
  }
`;

const BenefitContainer = styled.div`
  width: 27.272727%;
  height: 240px;
  @media (max-width: 480px) {
    width: 240px;
    height: 184px;
  }
`;

const BenefitSvg = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const Background = styled.span`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.dark_background};
`;
const Svg = styled.img`
  height: 30px;
  width: 30px;
  padding: 10px;
`;

const Title = styled.h5`
  width: 100%;
  height: 24px;
  font-family: 'Josefin Sans Light', 'Sans Serif';
  font-size: 24px;
  color: ${(props) => props.theme.colors.font_high_contrast};
  text-align: center;
  box-sizing: border-box;
  margin: 0px;
`;

const CopyContainer = styled.p`
  width: 100%;
  height: 146px;
  margin: 0px;
  font-size: 18px;
  box-sizing: border-box;
  padding: 10px 0px;
  font-family: 'Josefin Sans Light';
  text-align: center;
  color: ${(props) => props.theme.colors.font_high_contrast};
  @media (max-width: 780px) {
    font-size: 14px;
  }
`;
const Benefits = (props) => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
    AOS.refresh();
  }, []);
  return (
    <ParentContainer>
      <SectionTitle thin centered>
        Blueprint
      </SectionTitle>
      <Container>
        {BenefitsList.map((benefit) => {
          return (
            <BenefitContainer key={benefit.title} data-aos={benefit.aos}>
              <BenefitSvg>
                <Background>
                  <Svg src={benefit.icon} />
                </Background>
              </BenefitSvg>
              <Title>{benefit.title}</Title>
              <CopyContainer>{benefit.copy}</CopyContainer>
            </BenefitContainer>
          );
        })}
      </Container>
    </ParentContainer>
  );
};

export default Benefits;
