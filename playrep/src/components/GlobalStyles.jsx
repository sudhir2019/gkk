import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'FontAwesome';
    src: url('../assets/fonts/fonts/fontawesome-webfont78ce.eot?v=4.2.0');
    src: url('../assets/fonts/fonts/fontawesome-webfontd41d.eot?#iefix&v=4.2.0') format('embedded-opentype'),
         url('../assets/fonts/fontawesome-webfont78ce.woff?v=4.2.0') format('woff'),
         url('../assets/fonts/fontawesome-webfont78ce.ttf?v=4.2.0') format('truetype'),
         url('../assets/fonts/fontawesome-webfont78ce.svg?v=4.2.0#fontawesomeregular') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'FontAwesome', sans-serif;
  }
`;

export default GlobalStyles;