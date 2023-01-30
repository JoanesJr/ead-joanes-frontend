import { Divider, Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { CardCourse } from "../../../shared/components";
import { UserService } from "../../../shared/services/api";



export const HomePage = () => {
    const theme = useTheme();
    const [courses, setCourses] = useState([]);

    const objData = {
      username: "joanesdejesusjr@gmail.com",
      password: "def75315901",
    };

    const userService = new UserService(objData);

    useEffect( () => {
        const getCourses = () => {

            userService.getById('6').then( data => {
                setCourses(data.courses);
            }).catch(err => {
                console.log(err);
            })
        }

        getCourses();
    }, [courses]);

    return (
      <Grid container spacing={2} margin={5}>
        <Grid container item>
          <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
            <Typography variant="h5">Cursos</Typography>
            <Divider color={theme.palette.primary.light} />
          </Grid>
        </Grid>

        <Grid
          container
          item
          marginTop={5}
          display="flex"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          {courses.map((course) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={course.id}>
              <CardCourse
                title={course.title}
                description={course.description}
                file={course.file}
                id={course.id}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
}