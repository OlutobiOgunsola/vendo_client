import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ParentContainer = styled.span`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  @media (max-width: 800px) {
    flex-flow: row wrap;
  }
`;

const Label = styled.label`
  width: 40%;
  display: inline-block;
  font-family: 'Noto Sans Regular';
  font-size: 14px;
  color: ${(props) => props.theme.colors.saturated_contrast};
  @media (max-width: 800px) {
    width: 30%;
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