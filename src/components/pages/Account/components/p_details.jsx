// PERSONAL DETAILS

import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import Input from '@/components/UI/interface/Input';
import Button from '@/components/UI/buttons/Button';
import Edit from '@/assets/images/icons/account/Edit.svg';

const ParentContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;

  hr {
    width: 100%;
    height: 1px;
    margin: 12px auto;
    border: none;
    background: ${(props) => props.theme.colors.saturated_contrast};
  }
`;
// section headlines
const S_Head = styled.h3`
  display: inline;
  font-family: 'Noto Sans Regular';
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.dark_background_80};
  margin: 0;
`;

const InputRow = styled.span`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
`;

const InputLabel = styled.p`
  width: 40%;
  display: inline-block;
  font-family: 'Noto Sans Regular';
  font-size: 16px;
`;

const Form = styled.form`
  opacity: ${(props) => {
    return props.active ? 1 : 0.5;
  }};
  transition: all 0.5s ease-in-out;
`;

const Header = styled.span`
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
`;

const EditIcon = styled.img`
  display: inline-block;
  height: 20px;
  width: 20px;
  opacity: 0.2;
  transition: all 0.25s ease-in-out;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const P_Details = (props) => {
  const [f_name, setF_name] = useState('');
  const [l_name, setL_name] = useState('');
  const [bio, setBio] = useState('');
  const [formActive, setFormActive] = useState(false);

  const toggleActive = (active) => {
    return setFormActive(!formActive);
  };

  const handleF_Name = (fname) => {
    console.log(fname);
    return setF_name(fname);
  };

  const handleL_Name = (lname) => {
    return setL_name(lname);
  };

  const handleBio = (bio) => {
    return setBio(bio);
  };

  return (
    <ParentContainer>
      <Container>
        <Header>
          <S_Head>EDIT PERSONAL DETAILS</S_Head>
          <EditIcon src={Edit} onClick={toggleActive} />
        </Header>
        <hr />
        <Form active={formActive}>
          <InputRow>
            <InputLabel>First Name</InputLabel>
            <Input
              useLabelAnimation={true}
              inputType={'input'}
              left="14px"
              readOnly={!formActive}
              handleChange={handleF_Name}
              class={{
                name: 'f_name',
                type: 'text',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.dark_background_60}`,
                p_color: `${props.theme.colors.dark_background_20}`,
                padding: '8px',
                placeholder: 'First name',
                label: { display: 'none' },
              }}
            />
          </InputRow>
          <InputRow>
            <InputLabel>Last Name</InputLabel>
            <Input
              useLabelAnimation={true}
              inputType={'input'}
              left="14px"
              readOnly={!formActive}
              handleChange={handleL_Name}
              class={{
                name: 'l_name',
                type: 'text',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.dark_background_60}`,
                p_color: `${props.theme.colors.dark_background_20}`,
                padding: '8px',
                placeholder: 'Last name',
                label: { display: 'none' },
              }}
            />
          </InputRow>
          <InputRow>
            <InputLabel>Bio</InputLabel>
            <Input
              inputType={'textarea'}
              useLabelAnimation={true}
              left="14px"
              readOnly={!formActive}
              handleChange={handleBio}
              class={{
                name: 'bio',
                type: 'textarea',
                columns: '30',
                rows: '30',
                height: '100',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.dark_background_60}`,
                p_color: `${props.theme.colors.dark_background_20}`,
                padding: '8px',
                placeholder: 'Bio',
                label: { display: 'none' },
              }}
            />
          </InputRow>
          <InputRow>
            <Button
              to={'#'}
              height="40"
              width="100"
              fill={props.theme.colors.dark_background}
              transition_color={'white'}
              margin="16px 0 0 auto"
            >
              Done
            </Button>
          </InputRow>
        </Form>
      </Container>
    </ParentContainer>
  );
};

export default withTheme(P_Details);
