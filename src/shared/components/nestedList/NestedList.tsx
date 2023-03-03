import { useState, useEffect, ReactNode } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import SchoolIcon from "@mui/icons-material/School";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Environment } from "../../environment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CompletedClassService } from "../../services/api/completedClass/CompletedClass";
import { UserService } from "../../services/api";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import Button from "@mui/material/Button";
import { LocalStorage } from "../../services/localStorage";

interface INestedList {
  sections: any[];
  children: ReactNode;
  idCourse: number | string;
}

interface IListSection {
  id: string | number;
  title: string;
  classes: [];
  idCourse: number | string;
}

interface IListSectionComponent {
  title: string;
  id: string | number;
  idCourse: number | string;
  idSection: number | string;
}

const ListSectionComponent = ({
  id,
  title,
  idCourse,
  idSection,
}: IListSectionComponent) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/cursos/${idCourse}/aula`, {
      state: {
        classId: id,
        sectionId: idSection,
      },
    });
  };

  const [completed, setCompleted] = useState(false);
  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    const email = LocalStorage.getItem("JSF_U_N_I");
    const obj = {
      email,
    };

    UserService.getByEmail(obj).then((data) => {
      setIdUser(data.id);
      CompletedClassService.getToClass(data.id, id)
        .then((data) => {
          if (data) {
            setCompleted(true);
          } else {
            setCompleted(false);
          }
        })
        .catch((err) => {
          // console.log(err);
          setCompleted(false);
        });
    });
  }, [completed]);

  const handleCompletedCourseAdd = () => {
    const obj = {
      id_user: Number(idUser),
      id_class: Number(id),
    };

    CompletedClassService.create(obj)
      .then((data) => {
        setCompleted(true);
      })
      .catch((err) => {
        setCompleted(false);
      });
  };

  const handleCompletedCourseRemove = () => {
    const obj = {
      id_user: Number(idUser),
      id_class: Number(id),
    };

    CompletedClassService.delete(obj)
      .then((data) => {
        setCompleted(false);
      })
      .catch((err) => {
        setCompleted(false);
      });
  };

  return (
    <List component="div" disablePadding onClick={handleClick}>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <SchoolIcon sx={{color: 'secondary.main'}} />
        </ListItemIcon>
        <ListItemText primary={title} />
        {!completed && (
          <CheckCircleOutlineIcon onClick={handleCompletedCourseAdd} />
        )}
        {completed && (
          <CheckCircleIcon
            style={{ color: "green" }}
            onClick={handleCompletedCourseRemove}
          />
        )}
      </ListItemButton>
    </List>
  );
};

const ListSection = ({ id, title, classes, idCourse }: IListSection) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ViewModuleIcon sx={{color: 'secondary.main'}} />
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {classes.map((classy: any) => (
          <ListSectionComponent
            key={`class_${classy.id}`}
            title={classy.title}
            id={classy.id}
            idCourse={idCourse}
            idSection={id}
          />
        ))}
      </Collapse>
    </>
  );
};

export const NestedList = ({ sections, children, idCourse }: INestedList) => {
  const theme = useTheme();
  const [listOpen, setListOpen] = useState(true);
  const [file, setFile] = useState("");
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClickList = () => {
    if (lgDown) {
      setListOpen(false);
    }
  }

  useEffect(() => {
    setListOpen(!lgDown);
  }, [lgDown]);

  return (
    <Grid container display="flex" flexDirection="row">
      <Grid container item>
        {!listOpen && (
          <Box sx={{width: 2, height: 50}}>
            <Button sx={{width: '100%', height: '100%'}} onClick={() => setListOpen(!listOpen)}>
              <KeyboardDoubleArrowRightOutlinedIcon sx={{width: '100%', height: '100%'}} />
            </Button>
          </Box>
        )}
        {listOpen && (
          <Grid item xs={4} sm={4} md={4} lg={2} xl={2}>
            <List
              sx={{
                width: "100%",
                maxWidth: 300,
                bgcolor: "#F5F5F5",
                height: "100vh",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  {/* <Typography variant="body1" sx={{mt: 2}}>Módulos</Typography> */}
                </ListSubheader>
              }
            >
              {sections.map((section) => (
                <ListSection
                  key={`section_${section.id}`}
                  title={section.title}
                  id={section.id}
                  classes={section.class}
                  idCourse={idCourse}
                />
              ))}
            </List>
          </Grid>
        )}

        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          lg={10}
          xl={10}
          sx={{ padding: 5 }}
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          onClick={handleClickList}
        >
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', ml:-4}}>{children}</Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
