"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { GlobalStyle } from "../styles/GlobalStyle";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#23253b",
                color: "#eaeaf6",
                fontSize: "1.1rem",
                borderRadius: "1.1rem",
                boxShadow: "0 3px 22px #23253855",
              },
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
