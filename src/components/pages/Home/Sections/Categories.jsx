import React, { useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

import SectionTitle from '@/components/UI/interface/home/SectionTitle';

import categoriesArray from '@/assets/fixtures/categories';

const ParentContainer = styled.div`
  width: 100%;
  height: 328px;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.light_background};
  @media (min-width: 1280px) {
    padding: 0px 200px;
    height: 360px;
  }
  @media (min-width: 880px) and (max-width: 1279px) {
    padding: 0px 100px;
    height: 360px;
  }
  @media (min-width: 533px) and (max-width: 879px) {
    padding: 0px 50px;
    height: 320px;
  }
  @media (max-width: 532px) {
    padding: 0px 20px;
    height: 320px;
  }
  @media (max-width: 480px) {
    height: 556px;
  }
  @media (max-width: 360px) {
    height: 456px;
  }
`;

const Container = styled.div`
  width: 880px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  height: 216px;
  margin: 0 auto;

  @media (max-width: 1180px) {
    width: 720px;
    height: 180px;
  }

  @media (max-width: 780px) {
    width: 550px;
    height: 150px;
  }

  @media (max-width: 680px) {
    width: 500px;
    height: 150px;
  }
  @media (max-width: 580px) {
    width: 400px;
    height: 150px;
  }

  @media (max-width: 480px) {
    height: 416px;
    width: 90%;
  }
  @media (max-width: 380px) {
    height: 316px;
  }
`;
const Category = styled.div`
  width: 22.72%;
  border-radius: 8px;
  height: 200px;
  background: ${(props) => props.theme.colors.dark_background};
  text-align: center;
  @media (max-width: 1180px) {
    height: 180px;
  }
  @media (max-width: 680px) {
    height: 150px;
  }

  @media (max-width: 480px) {
    width: 49%;
    height: 200px;
  }
  @media (max-width: 380px) {
    height: 150px;
  }
`;

const SvgContainer = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 980px) {
    height: 90px;
  }
  @media (max-width: 680px) {
    height: 80px;
  }
  @media (max-width: 480px) {
    height: 120px;
  }
  @media (max-width: 380px) {
    height: 90px;
  }
`;

const Svg = styled.img`
  height: 50px;
  width: 50px;
  fill: ${(props) => props.theme.colors.light_background_20};
`;

const Title = styled.h5`
  font-size: 16px;
  font-family: 'Josefin Sans Light';
  color: ${(props) => props.theme.colors.saturated_contrast};
  @media (max-width: 880px) {
    font-size: 14px;
  }
  @media (max-width: 680px) {
    font-size: 12px;
  }
  @media (max-width: 480px) {
    font-size: 18px;
  }
  @media (max-width: 380px) {
    font-size: 14px;
  }
`;

const Categories = (props) => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
    AOS.refresh();
  }, []);
  return (
    <ParentContainer>
      <SectionTitle thin>Find the best Vendors in each category</SectionTitle>
      <Container>
        {categoriesArray.map((cat) => {
          return (
            <Category
              key={cat.title}
              data-aos="fade-up"
              data-aos-duration={cat.duration}
            >
              <SvgContainer>
                <Svg src={cat.svg}></Svg>
              </SvgContainer>
              <Title>{cat.title}</Title>
            </Category>
          );
        })}
      </Container>
    </ParentContainer>
  );
};

export default withTheme(Categories);
