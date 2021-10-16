import { ThemeProvider } from "@mui/material";
import { AuthWrapper } from "../context/AuthContext";
import "../styles/globals.css";
import theme from "../styles/theme";
import SimpleReactLightbox from "simple-react-lightbox";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthWrapper>
      <ThemeProvider theme={theme}>
        <SimpleReactLightbox>
          <Component {...pageProps} />
        </SimpleReactLightbox>
      </ThemeProvider>
    </AuthWrapper>
  );
};

export default MyApp;
