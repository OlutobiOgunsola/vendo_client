import React from 'react';
import styled from 'styled-components';
import { withTheme } from 'styled-components';
import ReactTooltip from 'react-tooltip';
import StarRatings from 'react-star-ratings';

import Twitter from '@/assets/images/logos/Twitter.svg';
import Instagram from '@/assets/images/logos/Instagram.svg';
import Facebook from '@/assets/images/logos/Facebook.svg';
import Quote from '@/assets/images/icons/Quotes.svg';

const ParentContainer = styled.div`
  width: ${(props) => (props.big ? '432px' : '209px')};
  height: ${(props) => (props.big ? '300px' : '150px')};
  background: url(${(props) => props.background});
  background-size: cover;
  flex-basis: auto;
  border-radius: 8px;
  overflow: hidden;
  margin: 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  @media (min-width: 816px) and (max-width: 1080px) {
    width: ${(props) => (props.big ? '300px' : '142px')};
    height: ${(props) => (props.big ? '280px' : '110px')};
  }
  @media (max-width: 532px) {
    width: ${(props) => (props.big ? '300px' : '142px')};
    height: ${(props) => (props.big ? '280px' : '110px')};
  }
`;

const Modal = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.94) 79.69%
  );
  border-radius: 8px;
  padding: ${(props) => (props.big ? '32px' : '16px')};
  box-sizing: border-box;

  @media (min-width: 816px) and (max-width: 1080px) {
    width: 100%;
    height: 100%;
    padding: ${(props) => (props.big ? '16px' : '8px')};
  }
  @media (max-width: 532px) {
    width: 100%;
    height: 100%;
    padding: ${(props) => (props.big ? '16px' : '8px')};
  }
`;

const PhotoContainer = styled.div`
  height: ${(props) => (props.big ? '100px' : '65px')};
  width: ${(props) => (props.big ? '100px' : '65px')};
  position: relative;
  margin: 0;
  @media (min-width: 816px) and (max-width: 1080px) {
    width: ${(props) => (props.big ? '60px' : '40px')};
    height: ${(props) => (props.big ? '60px' : '40px')};
  }
  @media (max-width: 532px) {
    width: ${(props) => (props.big ? '60px' : '40px')};
    height: ${(props) => (props.big ? '60px' : '40px')};
  }
`;

const Photo = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border: solid 3px;
  border-color: ${(props) => {
    switch (props.platform) {
      case 'facebook':
        return '#395185';
        break;
      case 'twitter':
        return '#55acee';
        break;
      case 'instagram':
        return '#d53f90';
        break;
      default:
        return '#fff';
    }
  }};
`;

const Logo = styled.img`
  position: absolute;
  width: ${(props) => {
    if (props.platform === 'twitter') {
      return props.big ? '35px' : '30px';
    }
    return props.big ? '20px' : '15px';
  }};
  height: ${(props) => {
    if (props.platform === 'twitter') {
      return props.big ? '35px' : '30px';
    }
    return props.big ? '20px' : '15px';
  }};
  top: ${(props) => {
    if (props.platform === 'twitter') {
      return props.big ? '70px' : '45px';
    }
    return props.big ? '-1px' : '-5px';
  }};
  left: ${(props) => {
    if (props.platform === 'twitter') {
      return props.big ? '75px' : '45px';
    }
    return props.big ? '0px' : '0px';
  }};

  @media (min-width: 816px) and (max-width: 1080px) {
    width: ${(props) => {
      if (props.platform === 'twitter') {
        return props.big ? '25px' : '20px';
      }
      return props.big ? '20px' : '15px';
    }};
    height: ${(props) => {
      if (props.platform === 'twitter') {
        return props.big ? '25px' : '20px';
      }
      return props.big ? '20px' : '15px';
    }};
    top: ${(props) => {
      if (props.platform === 'twitter') {
        return props.big ? '40px' : '25px';
      }
      return props.big ? '-5px' : '-3px';
    }};
    left: ${(props) => {
      if (props.platform === 'twitter') {
        return props.big ? '45px' : '30px';
      }
      return props.big ? '-4px' : '-4px';
    }};
  }
  @media (max-width: 532px) {
    width: ${(props) => {
      if (props.platform === 'twitter') {
        return props.big ? '25px' : '20px';
      }
      return props.big ? '20px' : '15px';
    }};
    height: ${(props) => {
      if (props.platform === 'twitter') {
        return props.big ? '25px' : '20px';
      }
      return props.big ? '20px' : '15px';
    }};
    top: ${(props) => {
      if (props.platform === 'twitter') {
        return props.big ? '40px' : '25px';
      }
      return props.big ? '-5px' : '-3px';
    }};
    left: ${(props) => {
      if (props.platform === 'twitter') {
        return props.big ? '45px' : '30px';
      }
      return props.big ? '-4px' : '-4px';
    }};
  }
`;

const DataPlate = styled.div`
  width: ${(props) => (props.big ? '256px' : '111px')};
  height: ${(props) => (props.big ? '111px' : '60px')};
  display: inline-block;
  margin: 0;
  // background: red;
  padding: ${(props) => (props.big ? '2px 16px' : '2px 12px')};
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  @media (min-width: 816px) and (max-width: 1080px) {
    width: ${(props) => (props.big ? '205px' : '80px')};
    height: ${(props) => (props.big ? '111px' : '50px')};
    padding: ${(props) => (props.big ? '2px 8px' : '2px 4px')};
    margin-left: 8px;
  }
  @media (max-width: 532px) {
    width: ${(props) => (props.big ? '205px' : '80px')};
    height: ${(props) => (props.big ? '111px' : '50px')};
    padding: ${(props) => (props.big ? '2px 8px' : '2px 4px')};
    margin-left: 8px;
  }
`;

const StoreName = styled.h5`
  font-family: 'Noto Sans Regular', 'Sans Serif';
  font-weight: 500;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${(props) => (props.big ? '225px' : '120px')};
  height: ${(props) => (props.big ? '28px' : '18px')};
  margin: ${(props) => (props.big ? ' 0px 0px 4px 0px' : ' 0px 0px 4px 0px')};
  color: ${(props) => props.theme.colors.white};
  &:hover {
  }
  font-size: ${(props) => (props.big ? '22px' : '14px')};

  @media (min-width: 816px) and (max-width: 1080px) {
    font-size: ${(props) => (props.big ? '15px' : '10px')};
    width: ${(props) => (props.big ? '205px' : '105px')};
    height: ${(props) => (props.big ? '19px' : '12px')};
    margin: ${(props) => (props.big ? ' 0px 0px 4px 0px' : ' 0px 0px 0px 0px')};
  }
  @media (max-width: 532px) {
    font-size: ${(props) => (props.big ? '15px' : '10px')};
    width: ${(props) => (props.big ? '205px' : '105px')};
    height: ${(props) => (props.big ? '19px' : '12px')};
    margin: ${(props) => (props.big ? ' 0px 0px 4px 0px' : ' 0px 0px 0px 0px')};
  }
`;

const H_and_R = styled.div`
  width: ${(props) => (props.big ? '245px' : '100px')};
  height: ${(props) => (props.big ? '15px' : '10px')};
  margin: ${(props) => (props.big ? ' 0px 0px 8px 0px' : ' 0px 0px 4px 0px')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 816px) and (max-width: 1080px) {
    font-size: ${(props) => (props.big ? '15px' : '10px')};
    width: ${(props) => (props.big ? '205px' : '105px')};
    height: ${(props) => (props.big ? '19px' : '8px')};
    margin: ${(props) => (props.big ? ' 0px 0px 8px 0px' : ' 0px 0px 0px 0px')};
  }
  @media (max-width: 532px) {
    font-size: ${(props) => (props.big ? '15px' : '10px')};
    width: ${(props) => (props.big ? '205px' : '105px')};
    height: ${(props) => (props.big ? '19px' : '8px')};
    margin: ${(props) => (props.big ? ' 0px 0px 8px 0px' : ' 0px 0px 0px 0px')};
  }
`;

const Handle = styled.p`
  width: ${(props) => (props.big ? '105px' : '40px')};
  line-height: ${(props) => (props.big ? '15px' : '10px')};
  font-size: ${(props) => (props.big ? '12px' : '7px')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  /* background: blue; */
  color: ${(props) => props.theme.colors.saturated_contrast};

  @media (min-width: 816px) and (max-width: 1080px) {
    font-size: ${(props) => (props.big ? '10px' : '7px')};
    width: ${(props) => (props.big ? '70px' : '35px')};
    height: ${(props) => (props.big ? '14px' : '10px')};
  }
  @media (max-width: 532px) {
    font-size: ${(props) => (props.big ? '10px' : '7px')};
    width: ${(props) => (props.big ? '70px' : '35px')};
    height: ${(props) => (props.big ? '14px' : '10px')};
  }
`;

const StarContainer = styled.div`
  width: auto;
  height: ${(props) => (props.big ? '15px' : '10px')};
  display: inline-block;
  margin: 0;
  position: relative;
  top: ${(props) => (props.big ? '-2px' : '-10px')};
  @media (min-width: 816px) and (max-width: 1080px) {
    top: ${(props) => (props.big ? '-4px' : '-4px')};
  }
  @media (max-width: 532px) {
    top: ${(props) => (props.big ? '-4px' : '-4px')};
  }
`;

const Bio = styled.p`
  width: ${(props) => (props.big ? '225px' : '100px')};
  /* background: red; */
  height: ${(props) => (props.big ? '24px' : '16px')};
  line-height: ${(props) => (props.big ? '12px' : '8px')};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: ${(props) => (props.big ? '10px' : '7px')};
  font-family: 'Josefin Sans Light Italic';
  color: ${(props) => props.theme.colors.saturated_contrast};
  margin: ${(props) => (props.big ? ' 0px 0px 4px 0px' : ' 0px 0px 2px 0px')};
  @media (min-width: 816px) and (max-width: 1080px) {
    width: ${(props) => (props.big ? '205px' : '85px')};
  }
  @media (max-width: 532px) {
    width: ${(props) => (props.big ? '205px' : '85px')};
  }
`;

const Tags = styled.div`
  height: ${(props) => (props.big ? '18px' : '15px')};
  width: ${(props) => (props.big ? '225px' : '90px')};
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;
  @media (min-width: 816px) and (max-width: 1080px) {
    width: ${(props) => (props.big ? '145px' : '65px')};
    display: ${(props) => (props.big ? '' : 'none')};
  }
  @media (max-width: 532px) {
    width: ${(props) => (props.big ? '145px' : '65px')};
    display: ${(props) => (props.big ? '' : 'none')};
  }
`;

const TagItem = styled.span`
  display: inline-block;
  max-width: 120px;
  height: ${(props) => (props.big ? '18px' : '15px')};
  font-size: ${(props) => (props.big ? '10px' : '7px')};
  font-family: 'Josefin Sans Light';
  border-radius: 2px;
  border: 0.5px solid;
  margin-right: 8px;
  box-sizing: border-box;
  padding: 4px;
  border-color: ${(props) => props.color};
  color: ${(props) => props.color};
`;

const Header = styled.div`
  width: ${(props) => (props.big ? '368px' : '176px')};
  height: ${(props) => (props.big ? '100px' : '65px')};
  display: flex;
  flex-flow: row no-wrap;
  flex: 0 0 auto;
  /* background: green; */
  margin-bottom: ${(props) => (props.big ? '16px' : '8px')};

  @media (min-width: 816px) and (max-width: 1080px) {
    width: ${(props) => (props.big ? '270px' : '125px')};
    height: ${(props) => (props.big ? '100px' : '45px')};
    margin-bottom: ${(props) => (props.big ? '8px' : '4px')};
  }
  @media (max-width: 532px) {
    width: ${(props) => (props.big ? '270px' : '125px')};
    height: ${(props) => (props.big ? '100px' : '45px')};
    margin-bottom: ${(props) => (props.big ? '8px' : '4px')};
  }
`;

const ReviewContainer = styled.div`
  height: ${(props) => (props.big ? '140px' : '52px')};
  width: ${(props) => (props.big ? '368px' : '176px')};
  margin: 0;
  /* background: red; */

  @media (min-width: 816px) and (max-width: 1080px) {
    width: ${(props) => (props.big ? '270px' : '125px')};
    height: ${(props) => (props.big ? '140px' : '35px')};
  }
  @media (max-width: 532px) {
    width: ${(props) => (props.big ? '270px' : '125px')};
    height: ${(props) => (props.big ? '140px' : '35px')};
  }
`;

const Title = styled.div`
  width: ${(props) => (props.big ? '245px' : '65px')};
  height: ${(props) => (props.big ? '16px' : '10px')};
`;

const Text = styled.h3`
  margin: 0;
  font-family: 'Noto Sans Regular';
  font-size: ${(props) => (props.big ? '14px' : '9px')};
  color: ${(props) => props.theme.colors.yellow};
  @media (min-width: 816px) and (max-width: 1080px) {
    font-size: ${(props) => (props.big ? '10px' : '7px')};
  }
  @media (max-width: 532px) {
    font-size: ${(props) => (props.big ? '10px' : '7px')};
  }
`;

const Line = styled.span`
  display: block;
  height: 1px;
  width: ${(props) => (props.big ? '24px' : '12px')};
  background: ${(props) => props.theme.colors.yellow};
  margin: ${(props) => (props.big ? '8px 0px' : '2px 0px')};
  @media (min-width: 816px) and (max-width: 1080px) {
    width: ${(props) => (props.big ? '24px' : '12px')};
    height: ${(props) => (props.big ? '1px' : '.5px')};
    margin: ${(props) => (props.big ? '4px 0px' : '0px')};
  }
  @media (max-width: 532px) {
    width: ${(props) => (props.big ? '24px' : '12px')};
    height: ${(props) => (props.big ? '1px' : '.5px')};
    margin: ${(props) => (props.big ? '4px 0px' : '0px')};
  }
`;

const ReviewCopy = styled.p`
  box-sizing: border-box;
  padding: ${(props) => (props.big ? '8px 0px' : '2px 0px')};
  height: ${(props) => (props.big ? '60px' : '19px')};
  width: ${(props) => (props.big ? '368px' : '176px')};
  font-size: ${(props) => (props.big ? '12px' : '8px')};
  color: ${(props) => props.theme.colors.saturated_contrast};
  line-height: ${(props) => (props.big ? '18px' : '8px')};
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.big ? '3' : '2')};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  /* background: blue; */
  margin: ${(props) => (props.big ? '8px 0px' : '4px 0px')};
  @media (min-width: 816px) and (max-width: 1080px) {
    padding: ${(props) => (props.big ? '4px 0px' : '2px 0px')};
    height: ${(props) => (props.big ? '62px' : '18px')};
    width: ${(props) => (props.big ? '270px' : '125px')};
    font-size: ${(props) => (props.big ? '10px' : '7px')};
    line-height: ${(props) => (props.big ? '14px' : '8px')};
    display: -webkit-box;
    -webkit-line-clamp: ${(props) => (props.big ? '4' : '2')};
    margin: ${(props) => (props.big ? '4px 0px' : '2px 0px')};
  }
  @media (max-width: 532px) {
    padding: ${(props) => (props.big ? '4px 0px' : '2px 0px')};
    height: ${(props) => (props.big ? '62px' : '18px')};
    width: ${(props) => (props.big ? '270px' : '125px')};
    font-size: ${(props) => (props.big ? '10px' : '7px')};
    line-height: ${(props) => (props.big ? '14px' : '8px')};
    display: -webkit-box;
    -webkit-line-clamp: ${(props) => (props.big ? '4' : '2')};
    margin: ${(props) => (props.big ? '4px 0px' : '2px 0px')};
  }
`;

const AuthorName = styled.p`
  color: ${(props) => props.theme.colors.yellow};
  font-size: ${(props) => (props.big ? '14px' : '10px')};
  height: ${(props) => (props.big ? '30px' : '30px')};
  width: ${(props) => (props.big ? '368px' : '176px')};
  line-height: ${(props) => (props.big ? '16px' : '10px')};
  font-family: 'Josefin Sans Light';
  margin: 0;
  display: inline-block;
  box-sizing: border-box;
  padding: ${(props) => (props.big ? '4px' : '2px')};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  /* background: green; */
  @media (min-width: 816px) and (max-width: 1080px) {
    width: ${(props) => (props.big ? '270px' : '125px')};
    height: ${(props) => (props.big ? '30px' : '20px')};
    font-size: ${(props) => (props.big ? '14px' : '9px')};
  }
  @media (max-width: 532px) {
    width: ${(props) => (props.big ? '270px' : '125px')};
    height: ${(props) => (props.big ? '30px' : '20px')};
    font-size: ${(props) => (props.big ? '14px' : '9px')};
  }
`;

const AuthorUnderline = styled.span`
  background: ${(props) => props.theme.colors.yellow_40};
  height: 0.5px;
  width: 368px;
  display: inline-block;
  margin: 0px;
`;
const HighlightCard = (props) => {
  const getLogo = () => {
    switch (props.profile.platform) {
      case 'facebook':
        return Facebook;
        break;
      case 'twitter':
        return Twitter;
        break;
      case 'instagram':
        return Instagram;
        break;
      default:
        return;
    }
  };

  const getColor = () => {
    const array = ['#56CCF2', '#D7B8F3', '#F2C94C', '#FFF', '#6FCF97'];
    const index = Math.floor(Math.random() * 5);
    return array[index];
  };

  const color = getColor();

  const truncated = (text) => {
    if (props.big && text.length > 16) {
      return true;
    } else if (!props.big && text.length > 13) {
      return true;
    }
    return false;
  };
  return (
    <ParentContainer big={props.big} background={props.profile.background}>
      <Modal big={props.big}>
        <ReactTooltip effect={'solid'} />
        <Header big={props.big}>
          <PhotoContainer big={props.big}>
            <Photo
              platform={props.profile.platform}
              src={props.profile.profilePhoto}
              alt={`Profile photo for ${props.profile.store}`}
            ></Photo>
            <Logo
              src={getLogo()}
              platform={props.profile.platform}
              big={props.big}
            ></Logo>
          </PhotoContainer>
          <DataPlate big={props.big}>
            {truncated(props.profile.store) ? (
              <StoreName big={props.big} data-tip={props.profile.store}>
                {props.profile.store}
              </StoreName>
            ) : (
              <StoreName big={props.big}>{props.profile.store}</StoreName>
            )}
            <H_and_R big={props.big}>
              <Handle big={props.big}>@{props.profile.handle}</Handle>
              <StarContainer big={props.big}>
                <StarRatings
                  starDimension={props.big ? '10px' : '5px'}
                  starSpacing={props.big ? '1px' : '.5px'}
                  rating={props.profile.rating}
                  starRatedColor={props.theme.colors.yellow}
                  starEmptyColor={props.theme.colors.dark_background}
                />
              </StarContainer>
            </H_and_R>
            <Bio big={props.big}>{props.profile.bio}</Bio>
            <Tags big={props.big}>
              {props.profile.tags.map((tag) => {
                return (
                  <TagItem big={props.big} color={color} key={tag}>
                    {tag.toUpperCase()}
                  </TagItem>
                );
              })}
            </Tags>
          </DataPlate>
        </Header>
        <ReviewContainer big={props.big}>
          <Title big={props.big}>
            <Text big={props.big}>Top Review</Text>
            <Line />
          </Title>
          <ReviewCopy big={props.big}>{props.profile.top_review}</ReviewCopy>
          <AuthorName big={props.big}>
            - {props.profile.review_author} <AuthorUnderline />
          </AuthorName>
        </ReviewContainer>
      </Modal>
    </ParentContainer>
  );
};

export default withTheme(HighlightCard);
