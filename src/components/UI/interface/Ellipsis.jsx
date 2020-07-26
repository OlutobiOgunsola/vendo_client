import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 40px;
  height: 5px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 90%;
  left: 90%;
  @media (max-width: 600px) {
    top: 90%;
    left: 85%;
  }
  @media (max-width: 480px) {
    top: 30px;
    left: 75%;
  }

  .active {
    background: ${(props) => props.theme.colors.yellow};
  }
`;

const Circle = styled.span`
  transition: all 0.5s ease-in-out;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  display: inline-block;
  margin: 1px auto;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.yellow_40};
  &:hover {
    cursor: pointer;
  }
`;

export default function Ellipsis(props) {
  const children = document.querySelectorAll('.circles');

  //NOT THE BEST SOLUTION. REFACTOR WHEN YOU CAN
  const setCircle = (e) => {
    // props.setActive(e.target.dataset.id);
    // check which childs id matches active and remove 'active' class from child
    children.forEach((child) => {
      child.classList.remove('active');
    });
    e.target.classList.add('active');

    props.setId(e.target.dataset.id);
  };
  return (
    <Container>
      <Circle data-id="0" className="active circles" onClick={setCircle} />
      <Circle data-id="1" className="circles" onClick={setCircle} />
      <Circle data-id="2" className="circles" onClick={setCircle} />
      <Circle data-id="3" className="circles" onClick={setCircle} />
    </Container>
  );
}

Ellipsis.propTypes = {
  setActive: PropTypes.func,
};
