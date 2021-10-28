import { CssBaseline, ScopedCssBaseline, ThemeProvider } from "@mui/material";
import { AuthWrapper } from "../context/AuthContext";
import "../styles/globals.css";
import theme from "../styles/theme";
import SimpleReactLightbox from "simple-react-lightbox";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthWrapper>
      <ThemeProvider theme={theme}>
        <SimpleReactLightbox>
          <CssBaseline />
          <Component {...pageProps} />
        </SimpleReactLightbox>
      </ThemeProvider>
    </AuthWrapper>
  );
};

export default MyApp;
