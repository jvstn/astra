import { Menu } from "@mui/icons-material";
import { Stack, Theme, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { ClassNameMap, createStyles, makeStyles } from "@mui/styles";
import * as React from "react";
import { Link } from "react-router-dom";
import logoPic from '../assets/rocket-logo.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => {
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
    },
    link: {
      textDecoration: "none",
      color: theme.palette.text.primary,
    },
  });
});

interface Props {
  children: React.ReactNode;
}

export default function Sidebar({ children }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes: ClassNameMap = useStyles();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Stack alignItems="center" direction="row">
          <Typography
            fontFamily={["Orbitron", "sans-serif"].join(",")}
            variant="h5"
          >
            Astrabot
          </Typography>
        <img src={logoPic} height={80} />
        </Stack>
      </Toolbar>
      <Divider />
      <List>
        {["Dashboard", "Watchlist", "Strategies"].map((text, index) => (
          <Link style={{textDecoration: "none", color: "inherit"}} to={"/" + text.toLowerCase()}>
            <ListItem button key={text}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: { sm: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        justifyItems="center"
        sx={{
          display: "flex",
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
