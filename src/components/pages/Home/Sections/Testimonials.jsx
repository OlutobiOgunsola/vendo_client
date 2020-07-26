import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SectionTitle from '@/components/UI/interface/SectionTitle';
import Ellipsis from '@/components/UI/interface/Ellipsis.jsx';
import TestimonialCard from '@/components/UI/interface/TestimonialCard.jsx';
import t_array from '@/assets/fixtures/testimonials';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ParentContainer = styled.div`
  background: ${(props) => props.theme.colors.light_background};
  position: relative;
  @media (min-width: 1280px) {
    padding: 0px 200px;
    height: 500px;
  }
  @media (min-width: 781px) and (max-width: 1279px) {
    padding: 0px 100px;
    height: 500px;
  }
  @media (min-width: 533px) and (max-width: 780px) {
    padding: 0px 50px;
    height: 500px;
  }
  @media (max-width: 532px) {
    padding: 0px 20px;
    height: 500px;
  }
`;

const Span1 = styled.span`
  width: 285px;
  height: 285px;
  display: inline-block;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.primary_4_60};
  position: absolute;
  left: 100px;
  top: 40px;
  z-index: 1;
  @media (max-width: 600px) {
    width: 150px;
    height: 150px;
    margin: 0;
    left: -50px;
    top: 150px;
  }
`;

const Span2 = styled.span`
  width: 365px;
  height: 365px;
  display: inline-block;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.yellow_60};
  position: absolute;
  right: 100px;
  bottom: 40px;
  z-index: 1;
  @media (max-width: 600px) {
    width: 250px;
    height: 250px;
    margin: 0;
    right: 0px;
    bottom: 40px;
  }
  @media (max-width: 480px) {
    right: 0px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 880px;
  height: 330px;
  margin: 0 auto;
  background: ${(props) => props.theme.colors.black_background};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  @media (max-width: 600px) {
    width: 400px;
  }
  @media (max-width: 480px) {
    width: 300px;
  }
`;

const Testimonials = (props) => {
  const [selected, setSelected] = useState({});
  const [open, setOpen] = useState(true);
  let [count, setCount] = useState(0);

  //dirty hack gives the user a flash of "undefined" upon immediate load. Check
  const setActive = (id) => {
    setOpen(false);
    setTimeout(() => {
      const index = id;
      const select = t_array[index];
      const name = select.l_name;
      select.l_name = name.toUpperCase();
      setSelected(select);
      setOpen(true);
    }, 500);
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
    AOS.refresh();

    setActive(0);

    const slider = setInterval(() => {
      if (count === 3) {
        setCount((count -= 3));
      } else {
        setCount(count++);
      }
      return setActive(count);
    }, 5000);

    return () => clearInterval(slider);
  }, []);

  return (
    <ParentContainer>
      <SectionTitle fat centered aos="zoom-in">
        What users are saying
      </SectionTitle>
      <Span1 data-aos="fade-up-right" />
      <Span2 data-aos="fade-up-left" data-aos-duration="4000" />
      <Container data-aos="fade-up-right">
        <TestimonialCard open={open} testimonial={selected} />
        <Ellipsis setId={setActive} />
      </Container>
    </ParentContainer>
  );
};
export default Testimonials;
