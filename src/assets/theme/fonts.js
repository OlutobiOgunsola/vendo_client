import { createGlobalStyle } from 'styled-components';

import DancingScript from '@/assets/fonts/Dancing_Script/DancingScript-VariableFont_wght.ttf';
import OxygenBold from '@/assets/fonts/Oxygen/Oxygen-Bold.ttf';
import OxygenRegular from '@/assets/fonts/Oxygen/Oxygen-Regular.ttf';
import JosefinSansLight from '@/assets/fonts/Josefin_Sans/static/JosefinSans-Light.ttf';
import JosefinSansRegular from '@/assets/fonts/Josefin_Sans/static/JosefinSans-Regular.ttf';
import JosefinSansLightItalic from '@/assets/fonts/Josefin_Sans/static/JosefinSans-LightItalic.ttf';
import JosefinSansMediumItalic from '@/assets/fonts/Josefin_Sans/static/JosefinSans-MediumItalic.ttf';
import NotoSansRegular from '@/assets/fonts/Noto_Sans/NotoSans-Regular.ttf';
import NotoSansBold from '@/assets/fonts/Noto_Sans/NotoSans-Bold.ttf';
import Mali from '@/assets/fonts/Mali/Mali-Regular.ttf';

const GlobalStyle = createGlobalStyle`
    @font-face{
        font-family: 'Dancing Script';
        src: url(${DancingScript}) format('truetype');
    }
    @font-face{
        font-family: 'Oxygen Bold';
        src: url(${OxygenBold}) format('truetype');
    }
    @font-face{
        font-family: 'Oxygen Regular';
        src: url(${OxygenRegular}) format('truetype');
    }
    @font-face{
        font-family: 'Josefin Sans Light';
        src: url(${JosefinSansLight}) format('truetype');
    }
    @font-face{
        font-family: 'Josefin Sans Regular';
        src: url(${JosefinSansRegular}) format('truetype');
    }
    @font-face{
        font-family: 'Josefin Sans Light Italic';
        src: url(${JosefinSansLightItalic}) format('truetype');
    }
    @font-face{
        font-family: 'Josefin Sans Medium Italic';
        src: url(${JosefinSansMediumItalic}) format('truetype');
    }
    @font-face{
        font-family: 'Mali';
        src: url(${Mali}) format('truetype');
    }
    @font-face{
        font-family: 'Noto Sans Regular';
        src: url(${NotoSansRegular}) format('truetype');
    }
    @font-face{
        font-family: 'Noto Sans Bold';
        src: url(${NotoSansBold}) format('truetype');
    }
`;

export default GlobalStyle;
