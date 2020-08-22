import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

const ParentContainer = styled.div`
  width: 252px;
  height: 306px;
  background: ${(props) => props.theme.colors.light_background_20};
  border-radius: 8px;
  display: flex;
  flex-flow: row wrap;
  padding: 10px;
  box-sizing: border-box;
  align-items: start;
  opacity: ${(props) => (props.open ? '1' : '0')};
  transition: all 0.5s ease-in-out;
`;

const Picture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0px auto;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.yellow};
  box-shadow: 0px 2px 4px ${(props) => props.theme.colors.dark_background_20};
  opacity: ${(props) => (props.open ? '1' : '0')};
  transition: all 0.1s ease-in-out;
`;

const NameBar = styled.h5`
  font-size: 18px;
  font-family: 'Oxygen Regular';
  font-weight: 500;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  display: inline-block;
  margin: 0 auto;
  color: white;
  transition: all 0.5s ease-in-out;
  opacity: ${(props) => (props.open ? '1' : '0')};
`;
const Dots = styled.span`
  display: flex;
  height: 5px;
  width: 19px;
  margin: 0 auto;
  justify-content: space-between;
`;

const Circle = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.yellow};
`;

const Copy = styled.p`
  width: 100%;
  font-family: 'Josefin Sans Light';
  font-size: 16px;
  color: ${(props) => props.theme.colors.saturated_contrast};
  text-align: center;
  height: 93px;
  margin: 0 auto;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  opacity: ${(props) => (props.open ? '1' : '0')};
  transition: all 0.9s ease-in-out;
`;
const Card = (props) => {
  return (
    <ParentContainer open={props.open}>
      <Picture
        src={props.testimonial.profile}
        alt={`An image of ${props.testimonial.f_name}`}
        open={props.open}
      />
      <NameBar open={props.open}>
        {props.testimonial.f_name}{' '}
        <b
          className="no-margin"
          style={{ color: `${props.theme.colors.yellow}`, fontWeight: '700' }}
        >
          {props.testimonial.l_name}
        </b>
      </NameBar>
      <Dots>
        <Circle />
        <Circle />
        <Circle />
      </Dots>
      <Copy open={props.open}>{props.testimonial.copy}</Copy>
    </ParentContainer>
  );
};

Card.propTypes = {
  testimonial: PropTypes.object,
};

export default withTheme(Card);
