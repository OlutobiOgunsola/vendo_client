import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ParentContainer = styled.span`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  font-size: 16px;
  margin-bottom: 0.75rem;

  @media (max-width: 800px) {
    flex-flow: row wrap;
  }
  @media (max-width: 800px) {
    margin-bottom: 0.5rem;
  }
`;

const Label = styled.label`
  width: 40%;
  display: inline-block;
  font-family: 'Noto Sans Light';
  margin-bottom: 0.75rem;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.saturated_contrast};
  @media (max-width: 800px) {
    width: 30%;
  }
  @media (max-width: 800px) {
    margin-bottom: 0.5rem;
  }
`;

const InputRow = (props) => {
  return (
    <ParentContainer>
      <Label htmlFor={props.for}>{props.label}</Label>
      {props.children}
    </ParentContainer>
  );
};

InputRow.propTypes = {
  label: PropTypes.string,
};

export default InputRow;
