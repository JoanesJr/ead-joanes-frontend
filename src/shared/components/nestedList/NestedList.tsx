import * as React from "react";
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
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Environment } from "../../environment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CompletedClassService } from "../../services/api/completedClass/CompletedClass";
import { UserService } from "../../services/api";

interface INestedList {
  sections: any[];
  children: React.ReactNode;
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
        sectionId: idSection
      }
    });
  };

  const [completed, setCompleted] = React.useState(false);
  const [idUser, setIdUser] = React.useState("");

  React.useEffect( () => {
      const email = localStorage.getItem("username");
      const obj = {
        email
      };

      UserService.getByEmail(obj).then(data => {
        setIdUser(data.id);
          CompletedClassService.getToClass(data.id, id).then(data => {
            if (data) {
              setCompleted(true);
            } else {
              setCompleted(false);
            }
            
          }).catch( err => {
            // console.log(err);
            setCompleted(false);
          })
        
        
      })

     
  }, [completed]);

  const handleCompletedCourseAdd = () => {
    const obj = {
      id_user: Number(idUser),
      id_class: Number(id)
    }

      CompletedClassService.create(obj).then(data => {
        setCompleted(true)
      }).catch(err => {
        setCompleted(false);
      })
  }

  const handleCompletedCourseRemove = () => {
    const obj = {
      id_user: Number(idUser),
      id_class: Number(id)
    }

    CompletedClassService.delete(obj).then(data => {
      setCompleted(false)
    }).catch(err => {
      setCompleted(false);
    })

      
  }


  return (
    <List component="div" disablePadding onClick={handleClick}>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary={title} />
        {!completed && <CheckCircleOutlineIcon onClick={ handleCompletedCourseAdd} />}
        {completed && <CheckCircleIcon style={{ color: 'green' }} onClick={ handleCompletedCourseRemove} />}
      </ListItemButton>
    </List>
  );
};



const ListSection = ({ id, title, classes, idCourse }: IListSection) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ViewModuleIcon />
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
  const [file, setFile] = React.useState("");
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));
  let marginLeft = 50;

  marginLeft = xlDown ? 50 : marginLeft;
  marginLeft = lgDown ? 50 : marginLeft;
  marginLeft = mdDown ? 47 : marginLeft;
  marginLeft = smDown ? 40 : marginLeft;
  marginLeft = xsDown ? 200 : marginLeft;



  return (
    <Grid container display="flex" flexDirection="row">
      <Grid container item>
        <Grid item xs={4} sm={4} md={4} lg={3} xl={2}>
          <List
            sx={{
              width: "100%",
              maxWidth: 300,
              bgcolor: "background.paper",
              height: "100vh",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Módulos
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

        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          lg={9}
          xl={10}
          sx={{ padding: 5 }}
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Box>{children}</Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
