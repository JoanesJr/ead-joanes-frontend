import { Divider, Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { CardCourse } from "../../../shared/components";
import { Environment } from "../../../shared/environment";
import { UserService } from "../../../shared/services/api";



export const HomePage = () => {
    const theme = useTheme();
    const [courses, setCourses] = useState([]);
    const [userId, setUserId] = useState<any>(null);


    useEffect( () => {


      const getUserId = () => {
        const username = localStorage.getItem("username");
        const obj = {
          email: username,
        };
        UserService.getByEmail(obj)
          .then((data) => {
            setUserId(data.id);
          })
          .catch((err) => {
            console.log("deu ruim email")
          });
      }

        const getCourses = () => {

          if(userId) {
             UserService.getById(userId)
               .then((data) => {
                 setCourses(data.courses);
               })
               .catch((err) => {
                 console.log(err);
               });
          }
           
        }

        getUserId();
        getCourses();
    }, [courses, userId]);

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