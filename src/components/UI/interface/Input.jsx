import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';

const Label = styled.label`
  display: ${(props) => props.display};
  font-family: 'Josefin Sans Regular';
  font-size: 14px;
  color: ${(props) => props.theme.colors.saturated_contrast};
  width: ${(props) => props.width || '100px'};
  transition: all 0.25s ease-in-out;
  line-height: 20px;
`;

const InputGroup = styled.span`
  display: block;
  width: auto;
  height: auto;
  position: relative;
  margin: ${(props) => props.margins || '8px 0px'};
  padding: ${(props) => props.padding || '8px'};
  /* border: ${(props) => {
    if (props.useLabelAnimation) {
      return (
        props.parentBorder ||
        `solid 0.5px ${props.theme.colors.dark_background}`
      );
    } else {
      return 'none';
    }
  }}; */
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;
  .valid {
    border-color: '#4bb543';
  }
  .invalid {
    border-color: '#ff9494';
  }
  .fa-icon {
    transition: all 0.25s ease-in-out;

    position: absolute;
    transform: translate(10px, 12px);
    color: ${(props) => props.theme.colors.saturated_contrast};
  }
  .push-right {
    transition: all 0.25s ease-in-out;

    position: absolute;
    color: ${(props) => props.theme.colors.saturated_contrast};
    transform: translate(210px, 12px);
    &:hover {
      cursor: pointer;
    }
  }
`;

const Textarea = styled.textarea`
  width: ${(props) => (props.width ? `${props.width}px` : '295px')};
  height: ${(props) => `${props.height}px` || '40px'};
  z-index: 99;
  position: relative;
  background: ${(props) =>
    props.fill || props.theme.colors.alternate_light_background_10};
  border-radius: 4px;
  border: ${(props) => {
    if (!props.borders) {
      return `none`;
    } else {
      return props.valid ? 'none' : '1px solid #ff9494';
    }
  }};
  box-sizing: border-box;
  padding: ${(props) => props.padding || '8px 32px'};
  transition: all 0.25s ease-in-out;
  color: ${(props) => props.color || props.theme.colors.saturated_contrast};
  font-family: 'Oxygen Bold';
  font-size: 14px;
  font-weight: 500px;
  &::-webkit-input-placeholder {
    opacity: ${(props) => (props.useLabelAnimation ? 0 : 1)};
    color: ${(props) => props.p_color || props.theme.colors.font_primary};
  }
  &::placeholder {
    opacity: ${(props) => (props.useLabelAnimation ? 0 : 1)};
    color: ${(props) => props.p_color || props.theme.colors.font_primary};
  }

  &:focus {
    width: ${(props) => (props.width ? `${props.width}px` : '300px')};
    outline: none;
    border-radius: 8px;
    border: ${(props) => {
      const col = props.pwdCol;
      if (col) {
        return `2px solid ${col}`;
      } else {
        return `0.5px solid ${props.theme.colors.dark_background}`;
      }
    }};
    background: ${(props) => props.theme.colors.light_background_10};
    color: ${(props) => props.theme.colors.dark_background};
  }
`;

const InputField = styled.input`
  width: ${(props) => (props.width ? `${props.width}px` : '295px')};
  height: ${(props) => `${props.height}px` || '40px'};
  z-index: 99;
  position: relative;
  background: ${(props) =>
    props.fill || props.theme.colors.alternate_light_background_10};
  border-radius: 4px;
  border: ${(props) => {
    if (!props.borders) {
      return `none`;
    } else {
      return props.valid ? 'none' : '1px solid #ff9494';
    }
  }};
  box-sizing: border-box;
  padding: ${(props) => props.padding || '8px 32px'};
  transition: all 0.25s ease-in-out;
  color: ${(props) => props.color || props.theme.colors.saturated_contrast};
  font-family: 'Oxygen Bold';
  font-size: 14px;
  font-weight: 500px;
  &::-webkit-input-placeholder {
    opacity: ${(props) => (props.useLabelAnimation ? 0 : 1)};
    color: ${(props) => props.p_color || props.theme.colors.font_primary};
  }
  &::placeholder {
    opacity: ${(props) => (props.useLabelAnimation ? 0 : 1)};
    color: ${(props) => props.p_color || props.theme.colors.font_primary};
  }

  &:focus {
    width: ${(props) => (props.width ? `${props.width}px` : '300px')};
    outline: none;
    border-radius: 8px;
    border: ${(props) => {
      const col = props.pwdCol;
      if (col) {
        return `2px solid ${col}`;
      } else {
        return `0.5px solid ${props.theme.colors.dark_background}`;
      }
    }};
    background: ${(props) => props.theme.colors.light_background_10};
    color: ${(props) => props.theme.colors.dark_background};
  }
`;

const Placeholder = styled.p`
  color: ${(props) => props.theme.colors.dark_background};
  position: absolute;
  top: 16px;
  left: ${(props) => props.labelLeft};
  font-size: 14px;
  text-align: center;
  margin: 0;
  opacity: 0.5;
  text-align: center;
  padding: 0px 4px;
  z-index: 9;
  transition: all 0.5s ease-in-out;
`;

const Spacer = styled.span`
  display: block;
  position: absolute;
  top: -14px;
  width: 0%;
  height: 10px;
  background: '#fff';
  z-index: 100;
`;

const Input = (props) => {
  const [value, setValue] = useState('');
  // grab placeholder element
  const p_holder = document.getElementById(`${props.class.name}`);

  // grab inputgroup element
  const i_group = document.getElementById(`${props.class.name}-group`);

  // grab input element
  const i_put = document.getElementById(`${props.class.name}-input`);

  // grab spacer element
  const space = document.getElementById(`${props.class.name}-spacer`);

  // function to animate
  const slideUp = () => {
    p_holder.style.opacity = '0';
    setTimeout(() => {
      p_holder.style.top = '-8px';
      p_holder.style.fontSize = '8px';
      return setTimeout(() => {
        p_holder.style.opacity = '1';
      }, 300);
    }, 300);
    return;
  };

  const slideDown = () => {
    if (!value) {
      p_holder.style.opacity = '0';
      setTimeout(() => {
        p_holder.style.top = '16px';
        p_holder.style.fontSize = '14px';
        return setTimeout(() => {
          p_holder.style.opacity = '0.5';
        }, 300);
      }, 300);
    }
    return;
  };

  // onchange
  const onChange = (e) => {
    if (value.length === 0 || p_holder.style.top === '16px') {
      slideUp();
    }
    setValue(e.target.value);
    props.handleChange(value);
    return;
  };

  return (
    <InputGroup
      useLabelAnimation={props.useLabelAnimation}
      id={`${props.class.name}-group`}
    >
      <Label
        htmlFor={props.class.name || ''}
        display={props.class.label.display || 'none '}
      />

      {/* mock placeholder margin with props.left */}
      <Placeholder id={props.class.name} labelLeft={props.left}>
        {props.class.placeholder}
        <Spacer id={`${props.class.name}-spacer`} />
      </Placeholder>

      {/* Give spaceholder space */}
      {props.inputType === 'input' && (
        <InputField
          readOnly={props.readOnly}
          useLabelAnimation={props.useLabelAnimation}
          id={`${props.class.name}-input`}
          {...props.class}
          onBlur={slideDown}
          onChange={onChange}
          value={value}
        />
      )}
      {props.inputType === 'textarea' && (
        <Textarea
          readOnly={props.readOnly}
          useLabelAnimation={props.useLabelAnimation}
          id={`${props.class.name}-input`}
          {...props.class}
          onBlur={slideDown}
          onChange={onChange}
          value={value}
        />
      )}
    </InputGroup>
  );
};
export default withTheme(Input);
