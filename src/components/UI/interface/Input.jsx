import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
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
    if (props.valid === false) {
      return '1px solid #ff9494';
    }
    if (!props.borders) {
      return `none`;
    } else {
      return props.borders;
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
    width: ${(props) => {
      if (!props.readOnly) {
        return props.width ? `${props.width}px` : '300px';
      }
    }};
    outline: none;
    border-radius: ${(props) => (props.readOnly ? '' : '8px')};
    border: ${(props) => {
      if (!props.readOnly) {
        const col = props.pwdCol;
        if (col) {
          return `2px solid ${col}`;
        } else {
          return `0.5px solid ${props.theme.colors.dark_background}`;
        }
      }
    }};
    background: ${(props) =>
      props.readOnly ? '' : props.theme.colors.light_background_10};
    color: ${(props) =>
      props.readOnly ? '' : props.theme.colors.dark_background};
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
    if (props.valid === false) {
      return '1px solid #ff9494';
    }
    if (!props.borders) {
      return `none`;
    } else {
      return props.borders;
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
    width: ${(props) => {
      if (!props.readOnly) {
        return props.width ? `${props.width}px` : '300px';
      }
    }};
    outline: none;
    border-radius: ${(props) => (props.readOnly ? '' : '8px')};
    border: ${(props) => {
      if (!props.readOnly) {
        const col = props.pwdCol;
        if (col) {
          return `2px solid ${col}`;
        } else {
          return `0.5px solid ${props.theme.colors.dark_background}`;
        }
      }
    }};
    background: ${(props) =>
      props.readOnly ? '' : props.theme.colors.light_background_10};
    color: ${(props) =>
      props.readOnly ? '' : props.theme.colors.dark_background};
  }
`;

const ImagePicker = styled.input`
  position: absolute;
  color: transparent;
  ::-webkit-file-upload-button {
    visibility: hidden;
  }
  ::before {
    content: '+';
    display: inline-block;
    border: 3px dashed ${(props) => props.theme.colors.light_background_40};
    border-radius: 3px;
    box-sizing: border-box;
    height: 100px;
    width: 100px;
    text-align: center;
    line-height: 100px;
    color: ${(props) => props.theme.colors.light_background};
    opacity: ${(props) => props.opacity};
    outline: none;
  }
  ::after {
    content: ' ';
  }
  &:focus {
    outline: none;
  }
`;

const ProfilePhoto = styled.span`
  display: block;
  height: 100px;
  width: 100px;
  position: relative;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  position: absolute;
  border: none;
  border-radius: ${(props) => (props.currentPhoto ? '50%' : '0')};
  opacity: ${(props) => props.opacity};
  &:hover {
    cursor: pointer;
  }
`;
const ImageDelete = styled.span`
  width: 20px;
  height: 20px;
  display: block;
  position: absolute;
  left: 50px;
  top: 20px;
  background: red;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Noto Sans Bold';
  line-height: 20px;
  text-align: center;
  color: white;
  border-radius: 50%;
  border: none;
  opacity: 0;
  transition: all 0.25s ease-in-out;
`;

const Placeholder = styled.p`
  color: ${(props) => props.theme.colors.dark_background};
  position: absolute;
  top: ${(props) => (props.value ? '-8px' : '16px')};
  left: ${(props) => props.labelLeft};
  font-size: ${(props) => (props.value ? '8px' : '14px')};
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
  const p_holderRef = useRef(null);
  const i_putRef = useRef(null);
  const spaceRef = useRef(null);

  // set state for profile uploaded image data
  const [profileImage, setProfile] = useState('');
  const [opacity, setOpacity] = useState(1);
  //delete button opacity
  const [del_Btn_Op, set_Del_Btn_Op] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(0);

  //initialize filereader
  const reader = new FileReader();

  // set initial values
  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
    if (props.currentPhoto) {
      setProfile(props.currentPhoto);
      setOpacity(0);
      setImageOpacity(1);
      setValue('true');
    }
  }, [props.value, props.currentPhoto]);
  // grab placeholder element
  const p_holder = document.getElementById(`${props.class.name}`);

  // grab delete btn
  const delBtnElem = document.getElementById(
    `${props.class.name}-image-delete`,
  );

  // grab inputgroup element
  const i_group = document.getElementById(`${props.class.name}-group`);

  // grab input element
  const i_put = document.getElementById(`${props.class.name}-input`);

  // grab spacer element
  const space = document.getElementById(`${props.class.name}-spacer`);

  //use Effect to slide up on render if there is a value
  useLayoutEffect(() => {
    if (value) {
      slideUp();
    }
  }, []);

  useEffect(() => {
    if (props.inputType !== 'imagepicker') {
      props.handleChange(value);
    }
  }, [value]);

  // function to animate
  const slideUp = () => {
    if (p_holder) {
      p_holder.style.opacity = '0';
      setTimeout(() => {
        p_holder.style.top = '-8px';
        p_holder.style.fontSize = '8px';
        return setTimeout(() => {
          p_holder.style.opacity = '1';
        }, 300);
      }, 300);
      return;
    }
    return;
  };

  const slideDown = () => {
    if (p_holder) {
      if (value.length === 0 || p_holder.style.top === '16px') {
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
    }
  };

  // onchange
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (value.length === 0 || p_holder.style.top === '16px') {
      slideUp();
    }
    return setValue(newValue);
  };

  const uploadImage = (e) => {
    // prevent default
    e.preventDefault();

    // destructure files element from the input
    const { files } = document.querySelector('#p_photo-image-input');
    if (files.length !== 0) {
      if (files[0].size > 100000) {
        return props.setAlert(
          props.updater,
          'error',
          'File is too large. Please select file below 50kb',
        );
      } else if (
        files[0].type !== 'image/jpeg' &&
        files[0].type !== 'image/png' &&
        files[0].type !== 'image/jpg'
      ) {
        return props.setAlert(
          props.updater,
          'error',
          'File is not a valid image. Please select a .jpg or .png image',
        );
      }
      console.log('files are valid');
    }
    if (files.length !== 0) {
      reader.readAsDataURL(files[0]);

      reader.onloadend = () => {
        const readerResult = reader.result;
        const index = reader.result.indexOf(',');
        props.setImage(files[0]);

        setProfile(URL.createObjectURL(files[0]));
        setOpacity(0);
        setImageOpacity(1);
      };
    }

    // lift updated state up
    setValue('true');
  };

  const verify = () => {
    if (props.verify) {
      return props.verify(value);
    }
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
      <Placeholder
        ref={p_holderRef}
        id={props.class.name}
        labelLeft={props.left}
        value={value}
      >
        {props.class.placeholder}
        <Spacer ref={spaceRef} id={`${props.class.name}-spacer`} />
      </Placeholder>

      {/* Give spaceholder space */}
      {props.inputType === 'input' && (
        <InputField
          readOnly={props.readOnly}
          useLabelAnimation={props.useLabelAnimation}
          id={`${props.class.name}-input`}
          {...props.class}
          onBlur={slideDown}
          onChange={handleChange}
          value={value}
          ref={i_putRef}
          type={props.class.type || 'text'}
          valid={props.valid}
          onBlur={verify}
        />
      )}
      {props.inputType === 'textarea' && (
        <Textarea
          readOnly={props.readOnly}
          useLabelAnimation={props.useLabelAnimation}
          id={`${props.class.name}-input`}
          {...props.class}
          onBlur={slideDown}
          onChange={handleChange}
          value={value}
          ref={i_putRef}
          valid={props.valid}
          onBlur={verify}
        />
      )}
      {props.inputType === 'imagepicker' && (
        <ProfilePhoto>
          <ImageDelete id={`${props.class.name}-image-delete`}>x</ImageDelete>
          <Image
            currentPhoto={props.currentPhoto}
            opacity={imageOpacity}
            src={profileImage}
          />
          <ImagePicker
            id={`${props.class.name}-image-input`}
            {...props.class}
            onChange={uploadImage}
            type="file"
            title="Select a profile photo"
            opacity={opacity}
            disabled={props.readOnly}
            name={props.class.name}
          />
        </ProfilePhoto>
      )}
    </InputGroup>
  );
};
export default withTheme(Input);
