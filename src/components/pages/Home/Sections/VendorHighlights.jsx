import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

import SectionTitle from '@/components/UI/interface/home/SectionTitle';

import Card from '@/components/UI/interface/home/HighlightCards';

const ParentContainer = styled.div`
  width: 100%;
  height: 604px;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.light_background};
  @media (min-width: 1280) {
    padding: 0px 200px;
  }
  @media (min-width: 816px) and (max-width: 1080px) {
    padding: 0px 100px;
    height: 550px;
  }
  @media (min-width: 533px) and (max-width: 815px) {
    padding: 0px 50px;
    height: 1050px;
  }
  @media (max-width: 532px) {
    padding: 0px 20px;
    height: 950px;
  }
`;

const Highlights = styled.div`
  height: 466px;
  width: 880px;
  display: flex;
  flex-flow: column wrap;
  margin: 0 auto;
  @media (min-width: 816px) and (max-width: 1080px) {
    flex-flow: row wrap;
    height: 422px;
    width: 616px;
  }

  @media (max-width: 815px) {
    flex-flow: row wrap;
    height: 868px;
    width: 432px;
  }
  @media (max-width: 532px) {
    height: 808px;
    width: 300px;
    margin: 0 auto;
  }
`;

const BigHighlights = styled.div`
  height: 300px;
  width: 100%;
  margin: 0px auto 16px auto;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 0;

  @media (min-width: 816px) and (max-width: 1080px) {
    flex-flow: column wrap;
    height: 280px;
    align-items: center;
  }

  @media (max-width: 815px) {
    height: 616px;
    margin-bottom: 0px;
    justify-content: center;
    align-items: flex-start;
  }
  @media (max-width: 532px) {
    height: 586px;
    width: 300px;
    margin: 0 auto;
  }
`;

const SmallHighlights = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  @media (min-width: 816px) and (max-width: 1080px) {
    flex-flow: row wrap;
    height: 126px;
    align-items: center;
    margin: 0 auto;
  }

  @media (max-width: 815px) {
    height: 316px;
    width: 426px;
    margin: 0 auto;
  }
  @media (max-width: 532px) {
    height: 238px;
    width: 290px;
    margin: 0 auto;
  }
`;

const VendorHighlights = (props) => {
  useEffect(() => {
    AOS.init({ duration: 500 });
    AOS.refresh();
  }, []);
  const big = [props.profiles[0], props.profiles[1]];
  const small = [
    props.profiles[2],
    props.profiles[3],
    props.profiles[4],
    props.profiles[5],
  ];
  return (
    <ParentContainer>
      <SectionTitle thin>Some Stores you will love!</SectionTitle>
      <Highlights>
        <div>
          <BigHighlights data-aos="fade-up">
            {/* {props.profiles.big.map((profile) => {
            return <Card big={true} profile={profile} />;
          })} */}
            {big.map((profile) => {
              return <Card big={true} profile={profile} key={profile.id} />;
            })}
          </BigHighlights>
        </div>
        <SmallHighlights data-aos="fade-up">
          {/* {props.profiles.small.map((profile) => {
            return <Card big={false} profile={profile} />;
          })} */}
          {small.map((profile) => {
            return <Card big={false} profile={profile} key={profile.id} />;
          })}
        </SmallHighlights>
      </Highlights>
    </ParentContainer>
  );
};

export default VendorHighlights;
