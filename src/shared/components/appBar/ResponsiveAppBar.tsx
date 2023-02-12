import { 
Box, 
Typography, 
Toolbar,
IconButton, 
Menu, 
Container, 
Avatar, 
Button, 
Tooltip, 
MenuItem,
AppBar, 
Grid}
from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";

import React, { useContext } from "react";
import { Environment } from "../../environment";
import { Context, useAppThemeContext } from "../../contexts";

const pages = ["Cursos", "Dashboard"];
const settings = ["Perfil", "Conta", "Trocar Tema", "Sair"];

interface IAppBar {
  children: React.ReactNode;
  navigate: any;
}

export const ResponsiveAppBar = ({children, navigate}: IAppBar) => {
  const context = useContext(Context);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
      null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
      null
    );

      const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
      };

      const {toggleTheme} = useAppThemeContext();

      const handleCloseNavMenu = (event) => {
        const menuOptionClicked = event.target.innerText.toLowerCase();
        switch (menuOptionClicked) {
          case "cursos":
            navigate(Environment.USER_HOMEPAGE);
            break;
          case "dashboard":
            navigate(Environment.USER_DASHBOARD);
            break;
          
        }
        setAnchorElNav(null);
      };

      const handleCloseUserMenu = (event) => {
        const settingOption = event.target.innerText.toLowerCase();
        switch (settingOption) {
          case "sair":
            context.loggout();
            break;
          case "trocar tema":
            toggleTheme();
            break;
        }
        setAnchorElUser(null);
      };


    return (
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
          overflowY: "scroll",
          // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
        }}
      >
        <Box>
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href={Environment.USER_HOMEPAGE}
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      height: 40,
                      width: 40,
                      maxHeight: { xs: 40, md: 40 },
                      maxWidth: { xs: 40, md: 40 },
                    }}
                    alt="The house from the offer."
                    src="logo192.png"
                  />
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href={Environment.USER_HOMEPAGE}
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      height: 40,
                      width: 40,
                      maxHeight: { xs: 40, md: 40 },
                      maxWidth: { xs: 40, md: 40 },
                    }}
                    alt="The house from the offer."
                    src="logo192.png"
                  />
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
                  <Box display="flex"> 
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      color="secondary"
                      sx={{ my: 2, display: "block", fontWeight: 'bolder' }}
                    >
                      {page}
                    </Button>
                  ))}
                  </Box>
                  
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" sx={{color: "secondary.main"}}>{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>

        <Box>{children}</Box>
      </Box>
    );
}