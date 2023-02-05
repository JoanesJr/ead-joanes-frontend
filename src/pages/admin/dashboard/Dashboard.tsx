import { useState, useEffect } from "react";
import { LayoutBaseDePagina } from '../../../shared/layouts';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid
} from "@mui/material";
import { CourseService, UserService } from "../../../shared/services/api";


 interface ILayoutBasePagina {
        title: string;
}

export const Dashboard = ({title}: ILayoutBasePagina) => {
  const [allCourses, setAllCourses] = useState();
  const [activeCourses, setActiveCourses] = useState();
  const [allUsers, setAllUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);


  useEffect( () => {
    CourseService.getAll("").then((data: any) => {
      setAllCourses(data.length);
    })

    CourseService.getAllActives().then((data: any) => {
      setActiveCourses(data.length)
    })

    UserService.getAll("").then((data: any) => {
      setAllUsers(data.length);
    })

    UserService.getAllActives().then((data: any) => {
      setActiveUsers(data.length);
    })


  }, [activeCourses, allCourses, allUsers, activeUsers])


  return (
    <LayoutBaseDePagina title={title}>
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid
          container
          item
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid
            item
            xs={6}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            sx={{ marginRight: 1, marginTop: 1 }}
          >
            <Card
              sx={{
                minWidth: "100%",
                height: "100%",
                padding: 2,
                borderRadius: 5,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                color="text.primary"
                gutterBottom
              >
                Total de Cursos
              </Typography>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h3" component="div" color="text.primary">
                  {allCourses}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            sx={{ marginRight: 1, marginTop: 1 }}
          >
            <Card
              sx={{
                minWidth: "100%",
                height: "100%",
                padding: 2,
                borderRadius: 5,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                color="text.primary"
                gutterBottom
              >
                Total de Usuários
              </Typography>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h3" component="div" color="text.primary">
                  {allUsers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            sx={{ marginRight: 1, marginTop: 1 }}
          >
            <Card
              sx={{
                minWidth: "100%",
                height: "100%",
                padding: 2,
                borderRadius: 5,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                color="text.primary"
                gutterBottom
              >
                Total de Cursos Ativos
              </Typography>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h3" component="div" color="text.primary">
                  {activeCourses}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={6}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            sx={{ marginRight: 1, marginTop: 1 }}
          >
            <Card
              sx={{
                minWidth: "100%",
                height: "100%",
                padding: 2,
                borderRadius: 5,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                color="text.primary"
                gutterBottom
              >
                Total de Usuário Ativos
              </Typography>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h3" component="div" color="text.primary">
                  {activeUsers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            sx={{ marginRight: 1, marginTop: 1 }}
          >
            <Card
              sx={{
                minWidth: "100%",
                height: "100%",
                padding: 2,
                borderRadius: 5,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                color="text.primary"
                gutterBottom
              >
                Total de Cursos Inativos
              </Typography>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h3" component="div" color="text.primary">
                  {Number(allCourses) - Number(activeCourses)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            sx={{ marginRight: 1, marginTop: 1 }}
          >
            <Card
              sx={{
                minWidth: "100%",
                height: "100%",
                padding: 2,
                borderRadius: 5,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                color="text.primary"
                gutterBottom
              >
                Total de Usuário Inativos
              </Typography>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h3" component="div" color="text.primary">
                  {allUsers - activeUsers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </LayoutBaseDePagina>
  );
};