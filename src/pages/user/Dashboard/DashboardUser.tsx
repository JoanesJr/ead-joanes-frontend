import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UserService } from "../../../shared/services/api";
import { CompletedClassService } from "../../../shared/services/api/completedClass/CompletedClass";


export const DashboardUser = () => {
    const [countActiveCourse, setCountActiveCourses] = useState(0);
    const [countCompletedCourse, setCompletedCourse] = useState(0);
    const [countStartedCourse, setStartedCourse] = useState(0);
    const [countNotStartedCourse, setNotStartedCourse] = useState(0);

    useEffect( () => {
        const email = localStorage.getItem("username");
        const obj = {
            email
        };
    
        UserService.getByEmail(obj).then(dt => {
            const activeCourse = dt.courses.filter(course => course.active);
            setCountActiveCourses(activeCourse.length); 

            const getStatus = async (courseId, userId) => {
                const objRes = {
                    completed: false,
                    started: false
                }
                const result = await CompletedClassService.findByUserCourse(courseId, userId);
                if (result.completed) {
                    objRes.completed = true;
                }

                if (!result.completed && result.started) {
                    objRes.started = true;
                }

                return objRes;
            }

            const getInformation = async (activeCourse, userId) => {
                let countCompletedCourseControll = 0
                let countStartedControll = 0;
                for (let course of activeCourse) {
                    let countStarted = 0;
                    const dataRes = await getStatus(course.id, userId);
                    if (dataRes.completed) {
                        countCompletedCourseControll++;
                    }

                    if (dataRes.started) {
                        countStartedControll++
                    }
                }

                const countNotStartedControll = countActiveCourse - (countCompletedCourse + countStartedControll);
                console.log(countNotStartedControll);

                setCompletedCourse(countCompletedCourseControll);
                setStartedCourse(countStartedControll);
                setNotStartedCourse(countNotStartedControll)
            }

            getInformation(activeCourse, dt.id);  
            
        })
    }, [countActiveCourse, countCompletedCourse, countStartedCourse, countNotStartedCourse]);

  return (
    <>
    <Grid container>
        <Grid item xs={12} sx={{display: "flex",
        alignContent: "center",
        justifyContent: "center"}}>
            <Typography variant="h4" color="text.main" sx={{pt: 5, fontWeight: 'bolder'}}>Informações sobre Cursos</Typography>
        </Grid>
    </Grid>

    <Grid
      container
      spacing={10}
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignContent: "center",
        justifyContent: "space-around",
        m: 1,
        mt: -10
      }}
      
    >
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
        <Card
          sx={{
            width: '75%',
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
            color="text.main"
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
            <Typography variant="h3" component="div" color="text.main">
              {countActiveCourse}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <Card
          sx={{
            width: '75%',
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
            color="text.main"
            gutterBottom
          >
            Cursos Concluídos
          </Typography>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" component="div" color="text.main">
              {countCompletedCourse}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <Card
          sx={{
            width: '75%',
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
            color="text.main"
            gutterBottom
          >
            Cursos Iniciados
          </Typography>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" component="div" color="text.main">
              {countStartedCourse}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <Card
          sx={{
            width: '75%',
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
            color="text.main"
            gutterBottom
          >
            Cursos Não Iniciados
          </Typography>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" component="div" color="text.main">
              {countNotStartedCourse}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </>
  );
  
};
