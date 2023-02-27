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
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRef, useState } from "react";
import { Environment } from "../../environment";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoExcluir?: boolean;
  mostrarBotaoEditar?: boolean;
  idRow: any;
  mostrarBotaoDetalhes?: boolean;
  mostrarBotaoSessoes?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoAula?: boolean;
  mostrarBotaoAddCourse?: boolean;
  mostrarBotaoRemoveCourse?: boolean;
  mostrarBotaoVinculo?: boolean;
  textoBotaoVinculo?: string;

  mostrarBotaoVoltarCarregando?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmEditar?: () => void;
  aoClicarEmExcluir?: () => void;
  aoClicarEmDetalhes?: () => void;
  aoClicaremSessoes?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmAula?: () => void;
  aoClicarEmAddCursos?: () => void;
  aoClicarEmARemoveCursos?: () => void;
  aoClicarEmVinculo?: () => void;
}

const options = ["Editar", "Excluir", "Detalhes"];

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = "",
  textoBotaoVinculo = "",
  aoMudarTextoDeBusca,
  mostrarInputBusca = false,
  aoClicarEmNovo,
  aoClicarEmDetalhes,
  aoClicarEmEditar,
  aoClicarEmExcluir,
  aoClicaremSessoes,
  aoClicarEmVoltar,
  aoClicarEmAula,
  aoClicarEmAddCursos,
  aoClicarEmARemoveCursos,
  aoClicarEmVinculo,

  textoBotaoNovo = "Novo",
  mostrarBotaoNovo = true,
  mostrarBotaoEditar = true,
  mostrarBotaoExcluir = true,
  mostrarBotaoDetalhes = true,
  mostrarBotaoSessoes = false,
  mostrarBotaoVoltar = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoAula = false,
  mostrarBotaoAddCourse = false,
  mostrarBotaoRemoveCourse = false,
  mostrarBotaoVinculo = false,
  idRow,
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
                  startIcon={<Icon sx={{ color: 'white' }}>add</Icon>}
                >
                  <Typography sx={{color: 'white'}}>{textoBotaoNovo}</Typography>
                </Button>
              )}
              {mostrarBotaoEditar && (
                <Button
                  color="warning"
                  disableElevation
                  variant="contained"
                  onClick={aoClicarEmEditar}
                  startIcon={<Icon sx={{ color: 'white' }}>edit</Icon>}
                >
                  <Typography  sx={{ color: 'white' }}>Editar</Typography>
                </Button>
              )}
              {mostrarBotaoExcluir && (
                <Button
                  color="error"
                  disableElevation
                  variant="contained"
                  onClick={aoClicarEmExcluir}
                  startIcon={<Icon sx={{ color: 'white' }}>delete_forever</Icon>}
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
                  startIcon={<Icon sx={{ color: 'white' }}>info</Icon>}
                >
                  Detalhes
                </Button>
              )}
              {mostrarBotaoSessoes && (
                <Button
                  color="success"
                  disableElevation
                  variant="contained"
                  onClick={aoClicaremSessoes}
                  startIcon={<Icon sx={{ color: 'white' }}>notes</Icon>}
                >
                  Sessões
                </Button>
              )}
              {mostrarBotaoAula && (
                <Button
                  color="success"
                  disableElevation
                  variant="contained"
                  onClick={aoClicarEmAula}
                  startIcon={<Icon sx={{ color: 'white' }}>notes</Icon>}
                >
                  <Typography sx={{ color: 'white' }}>Aulas</Typography>
                </Button>
              )}
              {mostrarBotaoAddCourse && (
                <Button
                  color="success"
                  disableElevation
                  variant="contained"
                  onClick={aoClicarEmAddCursos}
                  startIcon={<Icon sx={{ color: 'white' }}>addIcon </Icon>}
                >
                  <Typography sx={{ color: 'white' }}>Cursos</Typography>
                </Button>
              )}
              {mostrarBotaoRemoveCourse && (
                <Button
                  color="success"
                  disableElevation
                  variant="contained"
                  onClick={aoClicarEmARemoveCursos}
                  startIcon={<Icon sx={{ color: 'white' }}>removeCircleOutlineIcon </Icon>}
                >
                  <Typography sx={{ color: 'white' }}>Cursos</Typography>
                </Button>
              )}

              {mostrarBotaoVinculo && (
                <Button
                  color="success"
                  disableElevation
                  variant="contained"
                  onClick={aoClicarEmVinculo}
                  startIcon={<ChevronRightOutlinedIcon />}
                >
                  {textoBotaoVinculo}
                </Button>
              )}
            </>
          )}

          {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
            <Button
              color="primary"
              disableElevation
              variant="contained"
              onClick={aoClicarEmVoltar}
              startIcon={<Icon sx={{ color: 'white' }}>arrow_back</Icon>}
            >
              Voltar
            </Button>
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
                          <MenuItem>
                            {mostrarBotaoNovo && (
                              <Button
                                color="success"
                                disableElevation
                                variant="contained"
                                onClick={aoClicarEmNovo}
                                startIcon={<Icon sx={{ color: 'white' }}>add</Icon>}
                              >
                                {textoBotaoNovo}
                              </Button>
                            )}
                          </MenuItem>
                          <MenuItem>
                          {mostrarBotaoEditar && (
                              <Button
                                color="warning"
                                disableElevation
                                variant="contained"
                                onClick={aoClicarEmEditar}
                                startIcon={<Icon sx={{ color: 'white' }}>edit</Icon>}
                              >
                                Editar
                              </Button>
                            )}
                          </MenuItem>
                          <MenuItem>
                          {mostrarBotaoExcluir && (
                              <Button
                                color="error"
                                disableElevation
                                variant="contained"
                                onClick={aoClicarEmExcluir}
                                startIcon={<Icon sx={{ color: 'white' }}>delete_forever</Icon>}
                              >
                                Excluir
                              </Button>
                            )}
                          </MenuItem>
                          <MenuItem>
                          {mostrarBotaoDetalhes && (
                              <Button
                                color="secondary"
                                disableElevation
                                variant="contained"
                                onClick={aoClicarEmDetalhes}
                                startIcon={<Icon sx={{ color: 'white' }}>info</Icon>}
                              >
                                Detalhes
                              </Button>
                            )}
                          </MenuItem>
                          <MenuItem>
                          {mostrarBotaoSessoes && (
                            <Button
                              color="success"
                              disableElevation
                              variant="contained"
                              onClick={aoClicaremSessoes}
                              startIcon={<Icon sx={{ color: 'white' }}>notes</Icon>}
                            >
                              <Typography sx={{ color: 'white' }}>Sessões</Typography>
                            </Button>
                          )}
                          </MenuItem>
                          <MenuItem>
                          {mostrarBotaoAula && (
                              <Button
                                color="success"
                                disableElevation
                                variant="contained"
                                onClick={aoClicarEmAula}
                                startIcon={<Icon sx={{ color: 'white' }}>notes</Icon>}
                              >
                                Aulas
                              </Button>
                            )}
                          </MenuItem>
                          <MenuItem>
                          {mostrarBotaoAddCourse && (
                              <Button
                                color="success"
                                disableElevation
                                variant="contained"
                                onClick={aoClicarEmAddCursos}
                                startIcon={<Icon sx={{ color: 'white' }}>addIcon </Icon>}
                              >
                                <Typography sx={{ color: 'white' }}>Cursos</Typography>
                              </Button>
                            )}
                          </MenuItem>
                          <MenuItem>
                          {mostrarBotaoRemoveCourse && (
                              <Button
                                color="success"
                                disableElevation
                                variant="contained"
                                onClick={aoClicarEmARemoveCursos}
                                startIcon={<Icon sx={{ color: 'white' }}>removeCircleOutlineIcon </Icon>}
                              >
                                <Typography sx={{ color: 'white' }}>Cursos</Typography>
                              </Button>
                            )}
                          </MenuItem>
                          <MenuItem>
                          {mostrarBotaoVinculo && (
                            <Button
                              color="success"
                              disableElevation
                              variant="contained"
                              onClick={aoClicarEmVinculo}
                              startIcon={<ChevronRightOutlinedIcon />}
                            >
                              {textoBotaoVinculo}
                            </Button>
                          )}
                          </MenuItem>
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
