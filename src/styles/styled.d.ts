import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      gray: string;
      text: string;
    };
    font: {
      family: string;
    };
  }
}
