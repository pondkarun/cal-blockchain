import Navbar from "./shared/Navbar";
import { Container, createMuiTheme, ThemeProvider } from "@material-ui/core/";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Bai Jamjuree",
    fontSize: 16,
  },
});

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container fixed style={{ paddingTop: 25 }}>
          {children}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Layout;
