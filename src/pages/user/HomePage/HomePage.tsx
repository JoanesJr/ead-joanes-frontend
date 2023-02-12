import { Divider, Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { CardCourse } from "../../../shared/components";
import { Environment } from "../../../shared/environment";
import { UserService } from "../../../shared/services/api";
import { LocalStorage } from "../../../shared/services/localStorage";



export const HomePage = () => {
    const theme = useTheme();
    const [courses, setCourses] = useState([]);
    const [userId, setUserId] = useState<any>(null);


    useEffect( () => {


      const getUserId = () => {
        const username = LocalStorage.getItem("JSF_U_N_I");
        const obj = {
          email: username,
        };
        UserService.getByEmail(obj)
          .then((data) => {
            setUserId(data.id);
          })
          .catch((err) => {
            // console.log("deu ruim email")
          });
      }

        const getCourses = () => {

          if(userId) {
             UserService.getById(userId)
               .then((data) => {
                let controll = [];
                for (let c of data.courses) {
                  if(c.active) {
                    controll.push(c);
                  }
                }

                 setCourses(controll);
               })
               .catch((err) => {
                //  console.log(err);
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
            <Typography variant="h4" sx={{color: 'secondary.main'}}>Cursos</Typography>
            <Divider color="text.main" />
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
          {courses.length > 0 && courses.map((course) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={course.id}>
              <CardCourse
                title={course.title}
                description={course.description}
                file={course.file}
                id={course.id}
              />
            </Grid>
          ))}
          {courses.length == 0 && (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} sx={{
              display:  'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '50vh',
              ml: -8
            }}>
              <Typography sx={{
                wordWrap: 'break-word'
              }} variant="h4">Você não possui cursos atribuidos</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
}