import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";

const Navbar = (proos) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Typography variant="h6">Blockchain (Simulate)</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
