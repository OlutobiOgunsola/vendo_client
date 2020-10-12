import React from 'react';
import styled from 'styled-components';

const NotificationIcon = styled.svg`
  fill: ${(props) =>
    props.notif
      ? props.theme.colors.yellow
      : props.theme.colors.saturated_contrast};
  transition: all 0.2s ease-in-out;
  &:hover {
    fill: ${(props) =>
      props.notif
        ? props.theme.colors.yellow
        : props.theme.colors.saturated_contrast};
    cursor: pointer;
  }
`;

const NotificationSVG = (props) => {
  return (
    <NotificationIcon viewBox="0 0 15 15" notif={props.notif}>
      <path d="M8 19.5c1.1 0 2-.9 2-2H6a2 2 0 002 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V1.5C9.5.67 8.83 0 8 0S6.5.67 6.5 1.5v.68C3.63 2.86 2 5.42 2 8.5v5l-2 2v1h16v-1l-2-2z" />
    </NotificationIcon>
  );
};

export default NotificationSVG;
