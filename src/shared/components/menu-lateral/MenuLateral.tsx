import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

import { useAppThemeContext, useDrawerContext } from '../../contexts';

interface IMenuLateral {
    children: React.ReactNode;
}

interface ListItemLinkProps {
  label: string;
  icon: string;
  to: string;
  onClick:( () => void) | undefined;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({to, label, icon, onClick}) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({
    path: resolvedPath.pathname, end: false
  });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  }

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
}

export const MenuLateral: React.FC<IMenuLateral> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">

          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3vvVZ-pOGsyhaNEm9s-tm96lh7OGxJrpPQ&usqp=CAU"
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              <List component="nav">
              <ListItemLink label='Usuário' icon='person' to='/usuario' onClick={smDown ? toggleDrawerOpen: undefined} />
              <ListItemLink label='Cursos' icon='tv' to='/curso' onClick={smDown ? toggleDrawerOpen: undefined} />
            </List>
            </List>
          </Box>

          <Box>
            <List component="nav">
              <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                  <ListItemText primary="Alternar Tema" />
                </ListItemButton>
            </List>
            </List>
          </Box>

        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};