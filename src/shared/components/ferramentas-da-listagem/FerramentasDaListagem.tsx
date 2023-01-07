import {
  Box,
  Button,
  Icon,
  Paper,
  TextField,
  useTheme,
  ButtonGroup,
  Popper,
  MenuItem,
  MenuList,
  Grow,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRef, useState } from "react";
import { Environment } from '../../environment';

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoExcluir?: boolean;
  mostrarBotaoEditar?: boolean;
  idRow: number | string;
  mostrarBotaoDetalhes?: boolean;
  aoClicarEmNovo?: () => void;
  aoClicarEmEditar?: () => void;
  aoClicarEmExcluir?: () => void;
  aoClicarEmDetalhes?: () => void;
}


const options = [
  "Editar",
  "Excluir",
  "Detalhes",
];

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = '',
  aoMudarTextoDeBusca,
  mostrarInputBusca = false,
  aoClicarEmNovo,
  aoClicarEmDetalhes,
  aoClicarEmEditar,
  aoClicarEmExcluir,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  mostrarBotaoEditar = true,
  mostrarBotaoExcluir = true,
  mostrarBotaoDetalhes = true,
  idRow
}) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };


  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {mostrarInputBusca && (
        <TextField
          size="small"
          value={textoDaBusca}
          placeholder={Environment.INPUT_DE_BUSCA}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        <ButtonGroup
          variant="contained"
          ariel-label="outlined primary button group"
          component={Paper}
          elevation={24}
        >
          {!mdDown && (
            <>
              {mostrarBotaoNovo && (
                <Button
                  color="success"
                  disableElevation
                  variant="contained"
                  onClick={aoClicarEmNovo}
                  startIcon={<Icon>add</Icon>}
                >
                  {textoBotaoNovo}
                </Button>
              )}
              {mostrarBotaoEditar && (
                <Button
                  color="primary"
                  disableElevation
                  variant="contained"
                  onClick={aoClicarEmEditar}
                  startIcon={<Icon>edit</Icon>}
                >
                  Editar
                </Button>
              )}
              {mostrarBotaoExcluir && (
                <Button
                  color="error"
                  disableElevation
                  variant="contained"
                  onClick={aoClicarEmExcluir}
                  startIcon={<Icon>delete_forever</Icon>}
                >
                  Excluir
                </Button>
              )}
              {mostrarBotaoDetalhes && (
                <Button
                  color="secondary"
                  disableElevation
                  variant="contained"
                  onClick={aoClicarEmDetalhes}
                  startIcon={<Icon>info</Icon>}
                >
                  Detalhes
                </Button>
              )}
            </>
          )}

          {mdDown && (
            <>
              <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="split button"
              >
                <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                <Button
                  size="small"
                  aria-controls={open ? "split-button-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={handleToggle}
                >
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Popper
                sx={{
                  zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" autoFocusItem>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              selected={index === selectedIndex}
                              onClick={(event) =>
                                handleMenuItemClick(event, index)
                              }
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          )}
        </ButtonGroup>
      </Box>
    </Box>
  );
};